package io.dkintelligence.vrbd.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch=FetchType.EAGER)
    private User author;
    @ManyToOne(fetch=FetchType.EAGER)
    private Apartment apartment;
    @NotBlank(message = "Text is required")
    private String text;
    @NotBlank(message = "You need to rate apartment")
    private int rate;

    public Comment() {
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public User getAuthor() {
        return author;
    }
    public void setAuthor(User author) {
        this.author = author;
        if(!author.getComments().contains(this)){
            author.getComments().add(this);
        }
    }
    public Apartment getApartment() {
        return apartment;
    }
    public void setApartment(Apartment apartment) {
        this.apartment = apartment;
        if(!apartment.getComments().contains(this)){
            apartment.getComments().add(this);
        }
    }
    public String getText() {
        return text;
    }
    public void setText(String text) {
        this.text = text;
    }
    public int getRate() {
        return rate;
    }
    public void setRate(int rate) {
        this.rate = rate;
    }



}
