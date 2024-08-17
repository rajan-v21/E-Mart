package com.example.demo.repositories;

import com.example.demo.entities.Invoice;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {
    // Additional query methods can be defined here
	List<Invoice> findByUserid(int userId);
}
