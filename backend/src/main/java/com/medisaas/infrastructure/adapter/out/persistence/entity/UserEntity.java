package com.medisaas.infrastructure.adapter.out.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;
import java.time.ZonedDateTime;

@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "organization_id", nullable = false)
    private UUID organizationId;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(nullable = false)
    private String role; // 'ADMIN', 'MANAGER', 'DOCTOR', 'SECRETARY'

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "created_at", insertable = false, updatable = false)
    private ZonedDateTime createdAt;
}
