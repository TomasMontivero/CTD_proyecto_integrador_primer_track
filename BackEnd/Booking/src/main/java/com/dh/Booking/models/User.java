package com.dh.Booking.models;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter @Setter @Builder
@Table
public class User {

    @Id
    @SequenceGenerator(name = "user_sequence", sequenceName = "user_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
    private Long id;

    private String name;
    private String surname;
    private String email;
    private String password;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "city_id", nullable = false)
    private City city;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @JsonIncludeProperties(value = {"id"})
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Booking> bookings = new HashSet<>();

    public User(Long id, String name, String surname, String email, String password, City city, Role role, Set<Booking> bookings) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.city = city;
        this.role = role;
        this.bookings = bookings;
    }

    public User(String name, String surname, String email, String password, City city, Role role, Set<Booking> bookings) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.city = city;
        this.role = role;
        this.bookings = bookings;
    }

    public User(Long id) {
        this.id = id;
    }

    public User() {
    }

    public static User fromLong(Long userLong) {
        User user = new User(userLong);
        return user;
    }

}
