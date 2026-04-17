package com.medisaas.infrastructure.adapter.in.web.dto;

import java.util.Map;
import java.util.UUID;

public record PatientResponse(
        UUID id,
        UUID organizationId,
        String firstName,
        String lastName,
        String email,
        String phone,
        Map<String, Object> metadata
) {}
