package com.medisaas.infrastructure.adapter.out.persistence.repository;

import com.medisaas.infrastructure.adapter.out.persistence.entity.PatientEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PatientRepository extends JpaRepository<PatientEntity, UUID> {
    List<PatientEntity> findAllByOrganizationId(UUID organizationId);

    @org.springframework.data.jpa.repository.Query(value = """
        SELECT * FROM patients 
        WHERE organization_id = :organizationId 
        AND to_tsvector('spanish', coalesce(first_name, '') || ' ' || coalesce(last_name, '') || ' ' || coalesce(phone, '')) 
        @@ plainto_tsquery('spanish', :query)
    """, nativeQuery = true)
    List<PatientEntity> searchByQuery(UUID organizationId, String query);
}
