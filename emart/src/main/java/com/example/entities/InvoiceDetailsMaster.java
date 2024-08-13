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
public class InvoiceDetailsMaster {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int invoiceId;
    
    private int orderId;
    private int userId;
    private String billingDate;
    private double totalAmount;
    private int ePointsEarned;
    private int ePointsRedeemed;
    private double savings;
    
    // Additional fields, getters, and setters
}
