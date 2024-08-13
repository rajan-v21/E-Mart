package com.example.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class CartMaster {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cartId;
    
    private int productId;
    private int userId;
    private int quantity;
    private double price;
    
    // Additional fields, getters, and setters
}
