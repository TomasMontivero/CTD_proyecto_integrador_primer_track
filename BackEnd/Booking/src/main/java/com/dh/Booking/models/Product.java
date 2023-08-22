package com.dh.Booking.models;

import com.dh.Booking.services.ProductService;
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
public class Product {

    @Id
    @SequenceGenerator(name = "product_sequence", sequenceName = "product_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product_sequence")
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    private String title;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "city_id", nullable = false)
    private City city;

    private String productDescription;
    private String rating;

    @JsonIncludeProperties(value = {"id", "url"})
    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Image> images = new HashSet<>();

    @ManyToMany /*(mappedBy = "products", fetch = FetchType.LAZY, cascade = CascadeType.ALL)*/
    @JoinTable(
            name = "product_amenity",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "amenity_id"))
    Set<Amenity> amenities;

    @JsonIncludeProperties(value = {"id"})
    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Booking> bookings = new HashSet<>();

    @JsonIncludeProperties(value = {"id"})
    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Availability> availabilities = new HashSet<>();

    public Product(Long id, Category category, String title, City city, String productDescription, String rating, Set<Image> images, Set<Amenity> amenities, Set<Booking> bookings, Set<Availability> availabilities) {
        this.id = id;
        this.category = category;
        this.title = title;
        this.city = city;
        this.productDescription = productDescription;
        this.rating = rating;
        this.images = images;
        this.amenities = amenities;
        this.bookings = bookings;
        this.availabilities = availabilities;
    }

    public Product(Category category, String title, City city, String productDescription, String rating, Set<Image> images, Set<Amenity> amenities, Set<Booking> bookings, Set<Availability> availabilities) {
        this.category = category;
        this.title = title;
        this.city = city;
        this.productDescription = productDescription;
        this.rating = rating;
        this.images = images;
        this.amenities = amenities;
        this.bookings = bookings;
        this.availabilities = availabilities;
    }

    public Product(Long id) {
        this.id = id;
    }

    public Product() {
    }

    public static Product fromLong(Long productLong) {
        Product product = new Product(productLong);
        return product;
    }

    /*public Set<Long> getImageLong() {
        Set<Long> imageLong = new HashSet<>();
        images.forEach(imageFromSet -> imageLong.add(imageFromSet.getId()));
        return imageLong;
    }

    public Set<Long> getAmenityLong() {
        Set<Long> amenityLong = new HashSet<>();
        if (amenities != null) {
            amenities.forEach(amenityFromSet -> amenityLong.add(amenityFromSet.getId()));
        }
        //amenities.forEach(amenityFromSet -> amenityLong.add(amenityFromSet.getId()));
        return amenityLong;
    }

    public Set<Long> getBookingLong() {
        Set<Long> bookingLong = new HashSet<>();
        bookings.forEach(bookingFromSet -> bookingLong.add(bookingFromSet.getId()));
        return bookingLong;
    }

    public Set<Long> getAvailabilityLong() {
        Set<Long> availabilityLong = new HashSet<>();
        availabilities.forEach(availabilityFromSet -> availabilityLong.add(availabilityFromSet.getId()));
        return availabilityLong;
    }*/

}