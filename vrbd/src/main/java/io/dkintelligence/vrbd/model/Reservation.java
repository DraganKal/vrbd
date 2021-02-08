package io.dkintelligence.vrbd.model;

import javax.persistence.*;

@Entity
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER)
    private Apartment apartment;
//  TO DO Start date of reservation
    private int overnightStays; // Guest can book available dates only if they are not interrupted
    private double totalPrice; // Calculate price of night * number of nights
    @ManyToOne(fetch = FetchType.EAGER)
    private User guest;
    private String status; // Created, Rejected, Canceled, Accepted, Finished

    public Reservation() {
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Apartment getApartment() {
        return apartment;
    }
    public void setApartment(Apartment apartment) {
        this.apartment = apartment;
        if(!apartment.getReservations().contains(this)){
            apartment.getReservations().add(this);
        }
    }
    public int getOvernightStays() {
        return overnightStays;
    }
    public void setOvernightStays(int overnightStays) {
        this.overnightStays = overnightStays;
    }
    public double getTotalPrice() {
        return totalPrice;
    }
    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }
    public User getGuest() {
        return guest;
    }
    public void setGuest(User guest) {
        this.guest = guest;
        if(!guest.getReservations().contains(this)){
            guest.getReservations().add(this);
        }
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }


}
