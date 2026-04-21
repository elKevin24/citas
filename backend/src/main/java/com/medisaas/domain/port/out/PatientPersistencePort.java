package com.medisaas.domain.port.out;

import com.medisaas.domain.model.Patient;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PatientPersistencePort {
    Patient save(Patient patient);
    Optional<Patient> findByIdAndOrganizationId(UUID id, UUID organizationId);
    List<Patient> findAllByOrganizationId(UUID organizationId);
    List<Patient> searchByQuery(String query, UUID organizationId);
}
