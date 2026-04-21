package com.medisaas.infrastructure.adapter.in.web;

import com.medisaas.application.mapper.PatientMapper;
import com.medisaas.domain.model.Patient;
import com.medisaas.domain.port.in.CreatePatientUseCase;
import com.medisaas.domain.port.in.GetPatientUseCase;
import com.medisaas.infrastructure.adapter.in.web.dto.CreatePatientRequest;
import com.medisaas.infrastructure.adapter.in.web.dto.PatientResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/organizations/{organizationId}/patients")
@RequiredArgsConstructor
public class PatientController {

    private final CreatePatientUseCase createPatientUseCase;
    private final GetPatientUseCase getPatientUseCase;
    private final com.medisaas.domain.port.in.SearchPatientUseCase searchPatientUseCase;
    private final PatientMapper mapper;

    @PostMapping
    public ResponseEntity<PatientResponse> createPatient(
            @PathVariable UUID organizationId,
            @Valid @RequestBody CreatePatientRequest request) {

        java.util.Objects.requireNonNull(organizationId, "Organization ID cannot be null");
        Patient domain = mapper.toDomain(request, organizationId);
        Patient saved = createPatientUseCase.createPatient(domain, organizationId);
        PatientResponse response = mapper.toResponse(saved);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<PatientResponse>> listPatients(@PathVariable UUID organizationId) {
        List<PatientResponse> responses = getPatientUseCase.getPatientsByOrganization(organizationId).stream()
                .map(mapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PatientResponse> getPatient(
            @PathVariable UUID organizationId,
            @PathVariable UUID id) {
        Patient patient = getPatientUseCase.getPatientById(id, organizationId);
        return ResponseEntity.ok(mapper.toResponse(patient));
    }

    @GetMapping("/search")
    public ResponseEntity<List<PatientResponse>> searchPatients(
            @PathVariable UUID organizationId,
            @RequestParam String query) {
        List<PatientResponse> responses = searchPatientUseCase.searchPatients(query, organizationId).stream()
                .map(mapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }
}
