package com.medisaas.application.mapper;

import com.medisaas.domain.model.Patient;
import com.medisaas.infrastructure.adapter.in.web.dto.CreatePatientRequest;
import com.medisaas.infrastructure.adapter.in.web.dto.PatientResponse;
import com.medisaas.infrastructure.adapter.out.persistence.entity.PatientEntity;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-16T22:25:02-0600",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.46.0.v20260407-0427, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class PatientMapperImpl implements PatientMapper {

    @Override
    public Patient toDomain(CreatePatientRequest request, UUID organizationId) {
        if ( request == null && organizationId == null ) {
            return null;
        }

        Patient.PatientBuilder patient = Patient.builder();

        if ( request != null ) {
            patient.firstName( request.firstName() );
            patient.lastName( request.lastName() );
            patient.email( request.email() );
            patient.phone( request.phone() );
            Map<String, Object> map = request.metadata();
            if ( map != null ) {
                patient.metadata( new LinkedHashMap<String, Object>( map ) );
            }
        }
        patient.organizationId( organizationId );

        return patient.build();
    }

    @Override
    public PatientEntity toEntity(Patient domain) {
        if ( domain == null ) {
            return null;
        }

        PatientEntity.PatientEntityBuilder patientEntity = PatientEntity.builder();

        patientEntity.id( domain.getId() );
        patientEntity.organizationId( domain.getOrganizationId() );
        patientEntity.firstName( domain.getFirstName() );
        patientEntity.lastName( domain.getLastName() );
        patientEntity.email( domain.getEmail() );
        patientEntity.phone( domain.getPhone() );
        Map<String, Object> map = domain.getMetadata();
        if ( map != null ) {
            patientEntity.metadata( new LinkedHashMap<String, Object>( map ) );
        }

        return patientEntity.build();
    }

    @Override
    public Patient toDomain(PatientEntity entity) {
        if ( entity == null ) {
            return null;
        }

        Patient.PatientBuilder patient = Patient.builder();

        patient.id( entity.getId() );
        patient.organizationId( entity.getOrganizationId() );
        patient.firstName( entity.getFirstName() );
        patient.lastName( entity.getLastName() );
        patient.email( entity.getEmail() );
        patient.phone( entity.getPhone() );
        Map<String, Object> map = entity.getMetadata();
        if ( map != null ) {
            patient.metadata( new LinkedHashMap<String, Object>( map ) );
        }

        return patient.build();
    }

    @Override
    public PatientResponse toResponse(Patient domain) {
        if ( domain == null ) {
            return null;
        }

        UUID id = null;
        UUID organizationId = null;
        String firstName = null;
        String lastName = null;
        String email = null;
        String phone = null;
        Map<String, Object> metadata = null;

        id = domain.getId();
        organizationId = domain.getOrganizationId();
        firstName = domain.getFirstName();
        lastName = domain.getLastName();
        email = domain.getEmail();
        phone = domain.getPhone();
        Map<String, Object> map = domain.getMetadata();
        if ( map != null ) {
            metadata = new LinkedHashMap<String, Object>( map );
        }

        PatientResponse patientResponse = new PatientResponse( id, organizationId, firstName, lastName, email, phone, metadata );

        return patientResponse;
    }
}
