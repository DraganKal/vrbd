package io.dkintelligence.vrbd.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Amenity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Name is required")
    private String name;
    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            },
            mappedBy = "amenities")
    private List<Apartment> apartments = new ArrayList<>();

    public Amenity() {
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public List<Apartment> getApartments() {
        return apartments;
    }
    public void setApartments(List<Apartment> apartments) {
        this.apartments = apartments;
    }
    public void addApartment(Apartment apartment){
        if(!apartment.getAmenities().contains(this)){
            apartment.getAmenities().add(this);
        }
        apartments.add(apartment);
    }

}
