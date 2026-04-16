package com.medisaas.domain.model;

import java.time.ZonedDateTime;
import java.util.UUID;

public record AppointmentCreatedEvent(
        UUID appointmentId,
        UUID organizationId,
        UUID doctorId,
        UUID patientId,
        ZonedDateTime startTime,
        ZonedDateTime endTime
) {}
