package com.medisaas.application.mapper;

import com.medisaas.domain.model.Appointment;
import com.medisaas.infrastructure.adapter.in.web.dto.AppointmentResponse;
import com.medisaas.infrastructure.adapter.in.web.dto.CreateAppointmentRequest;
import com.medisaas.infrastructure.adapter.out.persistence.entity.AppointmentEntity;
import java.time.ZonedDateTime;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-16T22:24:37-0600",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.46.0.v20260407-0427, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class AppointmentMapperImpl implements AppointmentMapper {

    @Override
    public Appointment toDomain(CreateAppointmentRequest request, UUID organizationId) {
        if ( request == null && organizationId == null ) {
            return null;
        }

        Appointment.AppointmentBuilder appointment = Appointment.builder();

        if ( request != null ) {
            appointment.branchId( request.branchId() );
            appointment.doctorId( request.doctorId() );
            appointment.patientId( request.patientId() );
            appointment.startTime( request.startTime() );
            appointment.endTime( request.endTime() );
            Map<String, Object> map = request.metadata();
            if ( map != null ) {
                appointment.metadata( new LinkedHashMap<String, Object>( map ) );
            }
        }
        appointment.organizationId( organizationId );
        appointment.status( Appointment.AppointmentStatus.PENDING );

        return appointment.build();
    }

    @Override
    public AppointmentEntity toEntity(Appointment domain) {
        if ( domain == null ) {
            return null;
        }

        AppointmentEntity.AppointmentEntityBuilder appointmentEntity = AppointmentEntity.builder();

        appointmentEntity.id( domain.getId() );
        appointmentEntity.organizationId( domain.getOrganizationId() );
        appointmentEntity.branchId( domain.getBranchId() );
        appointmentEntity.doctorId( domain.getDoctorId() );
        appointmentEntity.patientId( domain.getPatientId() );
        appointmentEntity.startTime( domain.getStartTime() );
        appointmentEntity.endTime( domain.getEndTime() );
        if ( domain.getStatus() != null ) {
            appointmentEntity.status( domain.getStatus().name() );
        }
        appointmentEntity.version( domain.getVersion() );
        Map<String, Object> map = domain.getMetadata();
        if ( map != null ) {
            appointmentEntity.metadata( new LinkedHashMap<String, Object>( map ) );
        }

        return appointmentEntity.build();
    }

    @Override
    public Appointment toDomain(AppointmentEntity entity) {
        if ( entity == null ) {
            return null;
        }

        Appointment.AppointmentBuilder appointment = Appointment.builder();

        appointment.id( entity.getId() );
        appointment.organizationId( entity.getOrganizationId() );
        appointment.branchId( entity.getBranchId() );
        appointment.doctorId( entity.getDoctorId() );
        appointment.patientId( entity.getPatientId() );
        appointment.startTime( entity.getStartTime() );
        appointment.endTime( entity.getEndTime() );
        if ( entity.getStatus() != null ) {
            appointment.status( Enum.valueOf( Appointment.AppointmentStatus.class, entity.getStatus() ) );
        }
        appointment.version( entity.getVersion() );
        Map<String, Object> map = entity.getMetadata();
        if ( map != null ) {
            appointment.metadata( new LinkedHashMap<String, Object>( map ) );
        }

        return appointment.build();
    }

    @Override
    public AppointmentResponse toResponse(Appointment domain) {
        if ( domain == null ) {
            return null;
        }

        UUID id = null;
        UUID doctorId = null;
        UUID patientId = null;
        UUID branchId = null;
        ZonedDateTime startTime = null;
        ZonedDateTime endTime = null;
        String status = null;

        id = domain.getId();
        doctorId = domain.getDoctorId();
        patientId = domain.getPatientId();
        branchId = domain.getBranchId();
        startTime = domain.getStartTime();
        endTime = domain.getEndTime();
        if ( domain.getStatus() != null ) {
            status = domain.getStatus().name();
        }

        AppointmentResponse appointmentResponse = new AppointmentResponse( id, doctorId, patientId, branchId, startTime, endTime, status );

        return appointmentResponse;
    }
}
