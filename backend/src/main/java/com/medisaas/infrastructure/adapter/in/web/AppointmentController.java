package com.medisaas.infrastructure.adapter.in.web;

import com.medisaas.application.service.AppointmentService;
import com.medisaas.infrastructure.adapter.in.web.dto.AppointmentResponse;
import com.medisaas.infrastructure.adapter.in.web.dto.CreateAppointmentRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/organizations/{organizationId}/branches/{branchId}/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<AppointmentResponse> scheduleAppointment(
            @PathVariable UUID organizationId,
            @PathVariable UUID branchId,
            @Valid @RequestBody CreateAppointmentRequest request) {

        // Forzamos que el branchId del request concuerde con la URL param (Seguridad)
        // en Java 21 records podemos re-instanciar o hacer match, por ahora lo pasamos tal cual 
        // asumiendo validaciones cross-tenant en el servicio, o reensamblamos:
        CreateAppointmentRequest securedRequest = new CreateAppointmentRequest(
                request.doctorId(),
                request.patientId(),
                branchId,
                request.startTime(),
                request.endTime(),
                request.metadata()
        );

        AppointmentResponse response = appointmentService.createAppointment(organizationId, securedRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<AppointmentResponse>> listAppointments(
            @PathVariable UUID organizationId,
            @PathVariable UUID branchId) {
        return ResponseEntity.ok(appointmentService.listAppointments(organizationId, branchId));
    }

    @GetMapping("/search")
    public ResponseEntity<List<AppointmentResponse>> searchAppointments(
            @PathVariable UUID organizationId,
            @RequestParam String query) {
        return ResponseEntity.ok(appointmentService.searchAppointments(organizationId, query));
    }
}
