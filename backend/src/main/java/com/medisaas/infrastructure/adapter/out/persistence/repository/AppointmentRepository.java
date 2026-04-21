package com.medisaas.infrastructure.adapter.out.persistence.repository;

import com.medisaas.infrastructure.adapter.out.persistence.entity.AppointmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

public interface AppointmentRepository extends JpaRepository<AppointmentEntity, UUID> {

    /**
     * Consulta para prevenir Double Booking (Overbooking).
     * Retorna citas que se cruzan con el rango solicitado para ese doctor, que no han sido canceladas.
     * También valida el scope de multitenancy (organizationId).
     */
    @Query("SELECT a FROM AppointmentEntity a WHERE " +
           "a.organizationId = :organizationId AND a.doctorId = :doctorId AND " +
           "a.status != 'CANCELED' AND " +
           "(a.startTime < :endTime AND a.endTime > :startTime)")
    List<AppointmentEntity> findOverlappingAppointments(
            @Param("organizationId") UUID organizationId,
            @Param("doctorId") UUID doctorId,
            @Param("startTime") ZonedDateTime startTime,
            @Param("endTime") ZonedDateTime endTime);

    List<AppointmentEntity> findAllByOrganizationIdAndBranchId(UUID organizationId, UUID branchId);
    
    @Query("SELECT a FROM AppointmentEntity a JOIN PatientEntity p ON a.patientId = p.id " +
           "WHERE a.organizationId = :organizationId AND " +
           "(LOWER(p.firstName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.lastName) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<AppointmentEntity> searchByPatientName(UUID organizationId, String query);
}
