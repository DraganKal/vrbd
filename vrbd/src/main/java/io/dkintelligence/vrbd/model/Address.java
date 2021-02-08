package io.dkintelligence.vrbd.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Street is required")
    private String street;
    @NotBlank(message = "Number is required")
    private int number;
    @NotBlank(message = "Town is required")
    private String town;
    @NotBlank(message = "Zip code is required")
    private String zipCode;
    @OneToOne(mappedBy = "address", fetch = FetchType.EAGER)
    private Location location;

    public Address() {
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getStreet() {
        return street;
    }
    public void setStreet(String street) {
        this.street = street;
    }
    public int getNumber() {
        return number;
    }
    public void setNumber(int number) {
        this.number = number;
    }
    public String getTown() {
        return town;
    }
    public void setTown(String town) {
        this.town = town;
    }
    public String getZipCode() {
        return zipCode;
    }
    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }
    public Location getLocation() {
        return location;
    }
    public void setLocation(Location location) {
        this.location = location;
        if(!location.getAddress().equals(this)){
            location.setAddress(this);
        }
    }

    @Override
    public String toString() {
        return this.street + " " + this.number + ", " + this.town + " " + this.zipCode;
    }
}
