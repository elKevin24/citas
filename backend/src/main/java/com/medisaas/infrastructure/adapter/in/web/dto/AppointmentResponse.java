package com.medisaas.infrastructure.adapter.in.web.dto;

import java.time.ZonedDateTime;
import java.util.UUID;

public record AppointmentResponse(
        UUID id,
        UUID doctorId,
        UUID patientId,
        UUID branchId,
        ZonedDateTime startTime,
        ZonedDateTime endTime,
        String status
) {}
