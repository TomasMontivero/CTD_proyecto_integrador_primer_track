package com.dh.Booking.models;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter @Setter @Builder
@Table
public class Amenity {

    @Id
    @SequenceGenerator(name = "amenity_sequence", sequenceName = "amenity_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "amenity_sequence")
    private Long id;
    private String name;
    private String icon;

    @ManyToMany(mappedBy = "amenities", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    Set<Product> products;

    public Amenity(Long id, String name, String icon, Set<Product> products) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.products = products;
    }

    public Amenity(String name, String icon, Set<Product> products) {
        this.name = name;
        this.icon = icon;
        this.products = products;
    }

    public Amenity() {
    }

    public Amenity(Long id) {
        this.id = id;
    }

    public static Amenity fromLong(Long amenityLong) {
        Amenity amenity = new Amenity(amenityLong);
        return amenity;
    }
}
