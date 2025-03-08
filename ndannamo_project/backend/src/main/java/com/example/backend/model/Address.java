package com.example.backend.model;


import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class Address {

    private String street;
    private String city;
    private String zipCode;

}