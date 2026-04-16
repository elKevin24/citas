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
    @Mapping(target = "status", constant = "PENDING")
    @Mapping(target = "version", ignore = true)
    @Mapping(source = "organizationId", target = "organizationId")
    Appointment toDomain(CreateAppointmentRequest request, UUID organizationId);

    // Mapeos de ida y vuelta a la persistencia (Adaptador Salida)
    AppointmentEntity toEntity(Appointment domain);
    Appointment toDomain(AppointmentEntity entity);

    // Mapeo hacia la salida HTTP (Adaptador Entrada)
    AppointmentResponse toResponse(Appointment domain);
}
