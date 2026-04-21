package com.medisaas.domain.port.in;

import com.medisaas.domain.model.Patient;
import java.util.List;
import java.util.UUID;

public interface SearchPatientUseCase {
    List<Patient> searchPatients(String query, UUID organizationId);
}
