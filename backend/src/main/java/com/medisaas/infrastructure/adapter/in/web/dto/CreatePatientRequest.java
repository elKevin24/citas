package com.medisaas.infrastructure.adapter.in.web.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.util.Map;

public record CreatePatientRequest(
        @NotBlank(message = "El nombre es obligatorio") String firstName,
        @NotBlank(message = "El apellido es obligatorio") String lastName,
        @Email(message = "Formato de email inválido") String email,
        String phone,
        Map<String, Object> metadata
) {}
