package com.medisaas.application.service;

import com.medisaas.domain.model.Patient;
import com.medisaas.domain.port.in.CreatePatientUseCase;
import com.medisaas.domain.port.in.GetPatientUseCase;
import com.medisaas.domain.port.out.PatientPersistencePort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PatientService implements CreatePatientUseCase, GetPatientUseCase {

    private final PatientPersistencePort persistencePort;

    @Override
    public Patient createPatient(Patient patient, UUID organizationId) {
        patient.setOrganizationId(organizationId);
        return persistencePort.save(patient);
    }

    @Override
    public List<Patient> getPatientsByOrganization(UUID organizationId) {
        return persistencePort.findAllByOrganizationId(organizationId);
    }

    @Override
    public Patient getPatientById(UUID id, UUID organizationId) {
        return persistencePort.findByIdAndOrganizationId(id, organizationId)
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
    }
}
