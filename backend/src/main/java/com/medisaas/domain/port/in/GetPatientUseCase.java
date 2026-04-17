package com.medisaas.domain.port.in;

import com.medisaas.domain.model.Patient;
import java.util.List;
import java.util.UUID;

public interface GetPatientUseCase {
    List<Patient> getPatientsByOrganization(UUID organizationId);
    Patient getPatientById(UUID id, UUID organizationId);
}
