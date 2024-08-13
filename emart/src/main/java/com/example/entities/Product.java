package com.example.entities;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private int productId;
    
    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(name = "price", nullable = false)
    private double price;
    
    @Column(name = "subcategory_id", nullable = false)
    private int subcategoryId;
    
    @Column(name = "brand_id", nullable = false)
    private int brandId;
    
    @Column(name = "description", nullable = false)
    private String description;
    
    @Column(name = "stock_quantity", nullable = false)
    private int stockQuantity;
    
    @Column(name = "rating", nullable = false, columnDefinition = "INT DEFAULT 0")
    private int rating;
    
    @Column(name = "image_id", nullable = false)
    private int imageId;
    
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id")
    private List<ConfigDetailMaster> configDetailsList;
    
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id")
    private List<InvoiceDetailsMaster> invoiceDetailsList;
    
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id")
    private List<CartMaster> cartList;
    
    public int getProductId() {
        return productId;
    }

   

	public void setProductId(int id) {
		// TODO Auto-generated method stub
		
	}
}
