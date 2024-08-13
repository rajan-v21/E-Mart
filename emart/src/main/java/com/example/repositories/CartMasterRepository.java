package com.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.entities.CartMaster;

public interface CartMasterRepository extends JpaRepository<CartMaster, Integer> {
}
