package io.dkintelligence.vrbd.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Email(message = "Username needs to be an email")
    @NotBlank(message = "username is required")
    @Column(unique = true)
    private String username;
    @NotBlank(message = "Password field is required")
    private String password;
    private String confirmPassword;
    @NotBlank(message = "Please enter your name")
    private String name;
    @NotBlank(message = "Please enter your surname")
    private String surname;
    @NotBlank(message = "Gender is required")
    private String gender;
    @NotBlank(message = "Role is required")
    private String role;
    private Date created_At;
    private Date updated_At;
//  If User is host
    @OneToMany(mappedBy="host", cascade=CascadeType.ALL, fetch=FetchType.LAZY)
    private List<Apartment> apartmentsForRent = new ArrayList<>();
//   If User is guest
    @ManyToMany(fetch = FetchType.LAZY,
        cascade = {
                CascadeType.PERSIST,
                CascadeType.MERGE
        },
        mappedBy = "guests")
    private List<Apartment> rentedApartments = new ArrayList<>();
//  If User is guest
    @OneToMany(mappedBy="guest", cascade=CascadeType.ALL, fetch=FetchType.LAZY)
    private List<Reservation> reservations = new ArrayList<>();
//  If User is guest
    @OneToMany(mappedBy="author", cascade=CascadeType.ALL, fetch=FetchType.LAZY)
    private List<Comment> comments = new ArrayList<>();

    public User() {
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    @Override
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    @Override
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getConfirmPassword() {
        return confirmPassword;
    }
    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getSurname() {
        return surname;
    }
    public void setSurname(String surname) {
        this.surname = surname;
    }
    public String getGender() {
        return gender;
    }
    public void setGender(String gender) {
        this.gender = gender;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public Date getCreated_At() {
        return created_At;
    }
    public void setCreated_At(Date created_At) {
        this.created_At = created_At;
    }
    public Date getUpdated_At() {
        return updated_At;
    }
    public void setUpdated_At(Date updated_At) {
        this.updated_At = updated_At;
    }
    public List<Apartment> getApartmentsForRent() {
        return apartmentsForRent;
    }
    public void setApartmentsForRent(List<Apartment> apartmentsForRent) {
        this.apartmentsForRent = apartmentsForRent;
    }
    public void addApartmentForRent(Apartment apartment){
        if(apartment.getHost() != this){
            apartment.setHost(this);
        }
        apartmentsForRent.add(apartment);
    }
    public List<Comment> getComments() {
        return comments;
    }
    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
    public void addComment(Comment comment){
        if(comment.getAuthor() != this){
            comment.setAuthor(this);
        }
        comments.add(comment);
    }
    public List<Reservation> getReservations() {
        return reservations;
    }
    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }
    public void addReservation(Reservation reservation){
        if(reservation.getGuest() != this){
            reservation.setGuest(this);
        }
        reservations.add(reservation);
    }
    public List<Apartment> getRentedApartments() {
        return rentedApartments;
    }
    public void setRentedApartments(List<Apartment> rentedApartments) {
        this.rentedApartments = rentedApartments;
    }
    public void addRentedApartment(Apartment apartment){
        if(!apartment.getGuests().contains(this)){
            apartment.getGuests().add(this);
        }
        rentedApartments.add(apartment);
    }

    @PrePersist
    protected void onCreate(){
        this.created_At = new Date();
    }
    @PreUpdate
    protected void onUpdate(){ this.updated_At = new Date(); }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(this.role));
        return authorities;
    }
    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    @Override
    public boolean isEnabled() {
        return true;
    }
}
