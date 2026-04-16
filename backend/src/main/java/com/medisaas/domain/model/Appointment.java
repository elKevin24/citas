package com.medisaas.domain.model;

import java.time.ZonedDateTime;
import java.util.UUID;
import java.util.Map;

public class Appointment {
    private UUID id;
    private UUID organizationId;
    private UUID branchId;
    private UUID doctorId;
    private UUID patientId;
    
    private ZonedDateTime startTime;
    private ZonedDateTime endTime;
    private AppointmentStatus status;
    
    private int version;
    private Map<String, Object> metadata;

    // Constructors, Getters, y Setters omitidos por brevedad

    public enum AppointmentStatus {
        PENDING, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELED
    }
    
    public void confirm() {
        if (this.status != AppointmentStatus.PENDING) {
            throw new IllegalStateException("Solo citas pendientes pueden ser confirmadas.");
        }
        this.status = AppointmentStatus.CONFIRMED;
    }
    
    // Domain Logic: Control de Overbooking puede evaluarse a nivel dominio / puerto
}
