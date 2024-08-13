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
public class ConfigDetailMaster {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int configId;
    
    private String configName;
    private int configValue;
    
    // Additional fields, getters, and setters
}
