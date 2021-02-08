package io.dkintelligence.vrbd.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Apartment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Type is required")
    private String type;   // apartment or room
    @NotBlank(message = "Number of rooms is required")
    private int numberOfRooms;
    @NotBlank(message = "Number of guests is required")
    private int numberOfGuests;
    @ManyToOne(fetch = FetchType.EAGER)
    private Location location;
//  TO DO Dates for renting
//  TO DO Available dates
    @ManyToOne(fetch=FetchType.EAGER)
    private User host;
    @OneToMany(mappedBy="apartment", cascade=CascadeType.ALL, fetch=FetchType.LAZY)
    private List<Comment> comments = new ArrayList<>();
//  TO DO Pictures
    @NotBlank(message = "Price per night is required")
    private double pricePerNight;
//  TO DO  check-in time
//  TO DO  check-out time
    private String status; // Active or inactive
    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(name = "apartment_amenities",
            joinColumns = { @JoinColumn(name = "apartment_id") },
            inverseJoinColumns = { @JoinColumn(name = "amenity_id") })
    private List<Amenity> amenities = new ArrayList<>();
    @OneToMany(mappedBy = "apartment", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Reservation> reservations = new ArrayList<>();
    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(name = "apartment_guests",
            joinColumns = { @JoinColumn(name = "apartment_id") },
            inverseJoinColumns = { @JoinColumn(name = "user_id") })
    private List<User> guests = new ArrayList<>();


    public Apartment() {
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public int getNumberOfRooms() {
        return numberOfRooms;
    }
    public void setNumberOfRooms(int numberOfRooms) {
        this.numberOfRooms = numberOfRooms;
    }
    public int getNumberOfGuests() {
        return numberOfGuests;
    }
    public void setNumberOfGuests(int numberOfGuests) {
        this.numberOfGuests = numberOfGuests;
    }
    public Location getLocation() {
        return location;
    }
    public void setLocation(Location location) {
        this.location = location;
        if(!location.getApartments().contains(this)){
            location.getApartments().add(this);
        }
    }
    public User getHost() {
        return host;
    }
    public void setHost(User host) {
        this.host = host;
        if(!host.getApartmentsForRent().contains(this)){
            host.getApartmentsForRent().add(this);
        }
    }
    public List<Comment> getComments() {
        return comments;
    }
    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
    public void addComment(Comment comment){
        if(comment.getApartment() != this){
            comment.setApartment(this);
        }
        comments.add(comment);
    }
    public double getPricePerNight() {
        return pricePerNight;
    }
    public void setPricePerNight(double pricePerNight) {
        this.pricePerNight = pricePerNight;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public List<Amenity> getAmenities() {
        return amenities;
    }
    public void setAmenities(List<Amenity> amenities) {
        this.amenities = amenities;
    }
    public void addAmenity(Amenity amenity){
        if(!amenity.getApartments().contains(this)){
            amenity.getApartments().add(this);
        }
        amenities.add(amenity);
    }
    public List<Reservation> getReservations() {
        return reservations;
    }
    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }
    public void addReservation(Reservation reservation){
        if(reservation.getApartment() != this){
            reservation.setApartment(this);
        }
        reservations.add(reservation);
    }
    public List<User> getGuests() {
        return guests;
    }
    public void setGuests(List<User> guests) {
        this.guests = guests;
    }
    public void addGuest(User guest){
        if(!guest.getRentedApartments().contains(this)){
            guest.getRentedApartments().add(this);
        }
        guests.add(guest);
    }
}
