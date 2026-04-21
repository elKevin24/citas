package com.medisaas.application.mapper;

import com.medisaas.domain.model.Patient;
import com.medisaas.infrastructure.adapter.in.web.dto.CreatePatientRequest;
import com.medisaas.infrastructure.adapter.in.web.dto.PatientResponse;
import com.medisaas.infrastructure.adapter.out.persistence.entity.PatientEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import java.util.UUID;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface PatientMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(source = "organizationId", target = "organizationId")
    @Mapping(target = "metadata", source = "request.metadata")
    Patient toDomain(CreatePatientRequest request, UUID organizationId);

    // Mapeos de persistencia
    PatientEntity toEntity(Patient domain);
    Patient toDomain(PatientEntity entity);

    // Mapeo salida
    PatientResponse toResponse(Patient domain);
}
