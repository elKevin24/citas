package com.medisaas.infrastructure.adapter.in.web;

import com.medisaas.domain.model.Appointment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;
import java.util.List;

@RestController
@RequestMapping("/api/v1/organizations/{organizationId}/branches/{branchId}/appointments")
public class AppointmentController {

    // En Hexagonal, inyectaríamos el puerto de entrada (UseCase)
    // private final ScheduleAppointmentUseCase scheduleAppointmentUseCase;

    @PostMapping
    public ResponseEntity<Appointment> scheduleAppointment(
            @PathVariable UUID organizationId,
            @PathVariable UUID branchId,
            @RequestBody Appointment appointmentRequest) {

        // Validaría request, mandaría al useCase
        // ej: scheduleAppointmentUseCase.execute(command);
        
        return ResponseEntity.accepted().body(appointmentRequest);
    }

    @GetMapping
    public ResponseEntity<List<Appointment>> listAppointments(
            @PathVariable UUID organizationId,
            @PathVariable UUID branchId) {
        
        // Retornaría lista de citas de la sucursal
        return ResponseEntity.ok(List.of());
    }

    // Patrón CQRS o Command-palette friendly para buscar rápido
    @GetMapping("/search")
    public ResponseEntity<List<Appointment>> searchAppointments(
            @PathVariable UUID organizationId,
            @RequestParam String query) {
        // ... Lógica de búsqueda global CMD+K ...
        return ResponseEntity.ok(List.of());
    }
}
