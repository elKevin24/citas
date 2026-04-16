package com.medisaas.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.Map;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
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

    public enum AppointmentStatus {
        PENDING, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELED
    }
    
    public void confirm() {
        if (this.status != AppointmentStatus.PENDING) {
            throw new IllegalStateException("Solo citas pendientes pueden ser confirmadas.");
        }
        this.status = AppointmentStatus.CONFIRMED;
    }
    
    public void validate() {
        if (endTime.isBefore(startTime) || endTime.isEqual(startTime)) {
            throw new IllegalArgumentException("La hora de finalización debe ser estrictamente posterior a la hora de inicio.");
        }
    }
}
