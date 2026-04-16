package com.medisaas.infrastructure.adapter.in.web.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import java.time.ZonedDateTime;
import java.util.Map;
import java.util.UUID;

public record CreateAppointmentRequest(
        @NotNull(message = "El doctorId es obligatorio") UUID doctorId,
        @NotNull(message = "El patientId es obligatorio") UUID patientId,
        @NotNull(message = "El branchId es obligatorio") UUID branchId,
        @NotNull @Future(message = "La fecha de inicio debe ser futura") ZonedDateTime startTime,
        @NotNull @Future(message = "La fecha de fin debe ser futura") ZonedDateTime endTime,
        Map<String, Object> metadata
) {}
