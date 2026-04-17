package com.medisaas.infrastructure.adapter.out.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.util.Map;
import java.util.UUID;
import java.time.ZonedDateTime;

@Entity
@Table(name = "patients")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatientEntity {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "organization_id", nullable = false)
    private UUID organizationId;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    private String email;
    private String phone;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private Map<String, Object> metadata; // Alergias, historial, etc.

    @Column(name = "created_at", insertable = false, updatable = false)
    private ZonedDateTime createdAt;
}
