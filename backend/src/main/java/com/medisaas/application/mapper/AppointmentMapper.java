package com.medisaas.application.mapper;

import com.medisaas.domain.model.Appointment;
import com.medisaas.infrastructure.adapter.in.web.dto.AppointmentResponse;
import com.medisaas.infrastructure.adapter.in.web.dto.CreateAppointmentRequest;
import com.medisaas.infrastructure.adapter.out.persistence.entity.AppointmentEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import java.util.UUID;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface AppointmentMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "status", expression = "java(com.medisaas.domain.model.Appointment.AppointmentStatus.PENDING)")
    @Mapping(target = "version", ignore = true)
    @Mapping(source = "organizationId", target = "organizationId")
    @Mapping(target = "metadata", source = "request.metadata")
    Appointment toDomain(CreateAppointmentRequest request, UUID organizationId);

    // Mapeos de ida y vuelta a la persistencia
    @Mapping(target = "status", expression = "java(domain.getStatus() != null ? domain.getStatus().name() : null)")
    AppointmentEntity toEntity(Appointment domain);

    @Mapping(target = "status", expression = "java(entity.getStatus() != null ? com.medisaas.domain.model.Appointment.AppointmentStatus.valueOf(entity.getStatus()) : null)")
    Appointment toDomain(AppointmentEntity entity);

    // Mapeo hacia la salida HTTP
    @Mapping(target = "status", expression = "java(domain.getStatus() != null ? domain.getStatus().name() : null)")
    AppointmentResponse toResponse(Appointment domain);
}
