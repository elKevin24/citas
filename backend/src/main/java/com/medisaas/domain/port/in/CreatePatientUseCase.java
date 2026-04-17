package com.medisaas.domain.port.in;

import com.medisaas.domain.model.Patient;
import java.util.UUID;

public interface CreatePatientUseCase {
    Patient createPatient(Patient patient, UUID organizationId);
}
