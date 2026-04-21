package com.medisaas.infrastructure.adapter.out.persistence;

import com.medisaas.application.mapper.PatientMapper;
import com.medisaas.domain.model.Patient;
import com.medisaas.domain.port.out.PatientPersistencePort;
import com.medisaas.infrastructure.adapter.out.persistence.entity.PatientEntity;
import com.medisaas.infrastructure.adapter.out.persistence.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class PatientPersistenceAdapter implements PatientPersistencePort {

    private final PatientRepository repository;
    private final PatientMapper mapper;

    @Override
    public Patient save(Patient patient) {
        PatientEntity entity = mapper.toEntity(patient);
        @SuppressWarnings("null")
        PatientEntity saved = Objects.requireNonNull(repository.save(entity), "Saved patient entity cannot be null");
        return mapper.toDomain(saved);
    }

    @Override
    public Optional<Patient> findByIdAndOrganizationId(UUID id, UUID organizationId) {
        Objects.requireNonNull(id, "Patient ID cannot be null");
        Objects.requireNonNull(organizationId, "Organization ID cannot be null");
        return repository.findById(id)
                .filter(entity -> entity.getOrganizationId().equals(organizationId))
                .map(mapper::toDomain);
    }

    @Override
    public List<Patient> findAllByOrganizationId(UUID organizationId) {
        Objects.requireNonNull(organizationId, "Organization ID cannot be null");
        return repository.findAllByOrganizationId(organizationId).stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public List<Patient> searchByQuery(String query, UUID organizationId) {
        Objects.requireNonNull(organizationId, "organizationId cannot be null");
        return repository.searchByQuery(organizationId, query).stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }
}
