package com.example.demo.controllers;

import com.example.demo.entities.Invoice;
import com.example.demo.servicesImpl.InvoiceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/invoice")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    // Get all invoices
    @GetMapping
    public ResponseEntity<List<Invoice>> getAllInvoices() {
        List<Invoice> invoices = invoiceService.getAllInvoices();
        return ResponseEntity.ok(invoices);
    }
    
    //get invoices by user id
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Invoice>> getInvoicesByUserId(@PathVariable int userId) {
        List<Invoice> invoices = invoiceService.getInvoicesByUserId(userId);
        if (invoices != null && !invoices.isEmpty()) {
            return ResponseEntity.ok(invoices);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Create new invoice
    @PostMapping
    public ResponseEntity<Invoice> createInvoice(@RequestBody Invoice invoice) {
        Invoice createdInvoice = invoiceService.saveInvoice(invoice);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdInvoice);
    }

    // Update an existing invoice
    @PutMapping("/{id}")
    public ResponseEntity<Invoice> updateInvoice(@PathVariable int id, @RequestBody Invoice invoiceDetails) {
        try {
            Invoice updatedInvoice = invoiceService.updateInvoice(id, invoiceDetails);
            return ResponseEntity.ok(updatedInvoice);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Delete an invoice
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInvoice(@PathVariable int id) {
        try {
            invoiceService.deleteInvoice(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
