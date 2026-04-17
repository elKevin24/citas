package com.medisaas.infrastructure.adapter.out.persistence.repository;

import com.medisaas.infrastructure.adapter.out.persistence.entity.PatientEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PatientRepository extends JpaRepository<PatientEntity, UUID> {
    List<PatientEntity> findAllByOrganizationId(UUID organizationId);
}
