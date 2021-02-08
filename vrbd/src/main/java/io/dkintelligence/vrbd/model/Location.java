package io.dkintelligence.vrbd.model;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double latitude;
    private double longitude;
    @OneToOne(fetch = FetchType.LAZY)
    private Address address;
    @OneToMany(mappedBy="location", cascade=CascadeType.ALL, fetch=FetchType.LAZY)
    private List<Apartment> apartments = new ArrayList<>();

    public Location() {
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public double getLatitude() {
        return latitude;
    }
    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }
    public double getLongitude() {
        return longitude;
    }
    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }
    public Address getAddress() {
        return address;
    }
    public void setAddress(Address address) {
        this.address = address;
        if(!address.getLocation().equals(this)){
            address.setLocation(this);
        }
    }
    public List<Apartment> getApartments() {
        return apartments;
    }
    public void setApartments(List<Apartment> apartments) {
        this.apartments = apartments;
    }
    public void addApartment(Apartment apartment){
        if(apartment.getLocation() != this){
            apartment.setLocation(this);
        }
        apartments.add(apartment);
    }
}
