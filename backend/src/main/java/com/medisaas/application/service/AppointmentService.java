package com.medisaas.application.service;

import com.medisaas.application.mapper.AppointmentMapper;
import com.medisaas.domain.model.Appointment;
import com.medisaas.domain.model.AppointmentCreatedEvent;
import com.medisaas.infrastructure.adapter.in.web.dto.AppointmentResponse;
import com.medisaas.infrastructure.adapter.in.web.dto.CreateAppointmentRequest;
import com.medisaas.infrastructure.adapter.out.messaging.AppointmentEventPublisher;
import com.medisaas.infrastructure.adapter.out.persistence.entity.AppointmentEntity;
import com.medisaas.infrastructure.adapter.out.persistence.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final AppointmentMapper appointmentMapper;
    private final AppointmentEventPublisher eventPublisher;

    @Transactional
    public AppointmentResponse createAppointment(UUID organizationId, CreateAppointmentRequest request) {
        
        // 1. Instanciar y validar en la Capa Abstracta de Dominio Pura
        Appointment domainAppointment = appointmentMapper.toDomain(request, organizationId);
        try {
            domainAppointment.validate();
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage());
        }

        // 2. Validar con reglas dinámicas dependientes de estado externo (Concurrencia)
        List<AppointmentEntity> overlapping = appointmentRepository.findOverlappingAppointments(
                organizationId,
                domainAppointment.getDoctorId(),
                domainAppointment.getStartTime(),
                domainAppointment.getEndTime()
        );

        if (!overlapping.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El profesional médico ya cuenta con una cita en ese rango horario.");
        }

        // 3. Cruzar la frontera de infraestructura y persistir (Adaptador)
        AppointmentEntity entityToSave = java.util.Objects.requireNonNull(
                appointmentMapper.toEntity(domainAppointment), 
                "El mapeo hacia la Entidad originó un valor nulo inesperado"
        );
        AppointmentEntity savedEntity = appointmentRepository.save(entityToSave);
        
        // 4. Transformar la Entidad guardada de vuelta a Dominio
        Appointment savedDomain = appointmentMapper.toDomain(savedEntity);

        // 5. Publicar evento desde los atributos consolidados de dominio
        eventPublisher.publishAppointmentCreated(new AppointmentCreatedEvent(
                savedDomain.getId(),
                savedDomain.getOrganizationId(),
                savedDomain.getDoctorId(),
                savedDomain.getPatientId(),
                savedDomain.getStartTime(),
                savedDomain.getEndTime()
        ));

        // 6. Devolver el contrato cerrado al controlador Web
        return appointmentMapper.toResponse(savedDomain);
    }

    @Transactional(readOnly = true)
    public List<AppointmentResponse> listAppointments(UUID organizationId, UUID branchId) {
        return appointmentRepository.findAllByOrganizationIdAndBranchId(organizationId, branchId)
                .stream()
                .map(appointmentMapper::toDomain)
                .map(appointmentMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<AppointmentResponse> searchAppointments(UUID organizationId, String query) {
        return appointmentRepository.searchByPatientName(organizationId, query)
                .stream()
                .map(appointmentMapper::toDomain)
                .map(appointmentMapper::toResponse)
                .toList();
    }
}
