package com.medisaas.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Map;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Patient {
    private UUID id;
    private UUID organizationId;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private Map<String, Object> metadata;
}
