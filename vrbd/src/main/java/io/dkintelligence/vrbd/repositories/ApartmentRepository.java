package io.dkintelligence.vrbd.repositories;

import io.dkintelligence.vrbd.model.Apartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApartmentRepository extends JpaRepository<Apartment, Long> {

    Iterable<Apartment> findAllByHostUsername(String username);

}
