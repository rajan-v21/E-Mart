package com.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.entities.InvoiceDetailsMaster;

public interface InvoiceDetailsMasterRepository extends JpaRepository<InvoiceDetailsMaster, Integer> {
}
