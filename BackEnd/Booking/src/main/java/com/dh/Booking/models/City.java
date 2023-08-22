package com.dh.Booking.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter @Setter
@Table
public class City {

    @Id
    @SequenceGenerator(name = "city_sequence", sequenceName = "city_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "city_sequence")
    private Long id;
    private String name;
    private String country;

    @OneToMany(mappedBy = "city", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Product> productos;

    @OneToMany(mappedBy = "city", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private List<User> users;

    public City(Long id, String name, String country, List<Product> productos) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.productos = productos;
    }

    public City(String name, String country, List<Product> productos, List<User> users) {
        this.name = name;
        this.country = country;
        this.productos = productos;
        this.users = users;
    }

    public City() {
    }

    public City(Long id) {
        this.id = id;
    }

    public static City fromLong(Long cityLong) {
        City city = new City(cityLong);
        return city;
    }
}
