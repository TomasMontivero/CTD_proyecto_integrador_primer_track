package com.dh.Booking.dtos;

import com.dh.Booking.models.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Builder
public class ProductDTO {

    private Long id;
    private Long category;
    private String title;
    private Long city;
    private String productDescription;
    private String rating;
    private Set<Long> images;
    private Set<Long> amenities;
    private Set<Long> bookings;
    private Set<Long> availabilities;

    public ProductDTO(Long id, Long category, String title, Long city, String productDescription, String rating, Set<Long> images, Set<Long> amenities, Set<Long> bookings, Set<Long> availabilities) {
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

    public ProductDTO(Long id) {
        this.id = id;
    }

    public ProductDTO() {
    }

    public ProductDTO(Long category, String title, Long city, String productDescription, String rating, Set<Long> images, Set<Long> amenities, Set<Long> bookings, Set<Long> availabilities) {
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

    /*public Set<Image> getImageObject() {
        Set<Image> imageObject = new HashSet<>();
        images.forEach(imageFromSet -> imageObject.add(Image.fromLong(imageFromSet)));
        return imageObject;
    }

    public Set<Amenity> getAmenityObject() {
        Set<Amenity> amenityObject = new HashSet<>();
        amenities.forEach(amenityFromSet -> amenityObject.add(Amenity.fromLong(amenityFromSet)));
        return amenityObject;
    }

    public Set<Booking> getBookingObject() {
        Set<Booking> bookingObject = new HashSet<>();
        bookings.forEach(bookingFromSet -> bookingObject.add(Booking.fromLong(bookingFromSet)));
        return bookingObject;
    }

    public Set<Availability> getAvailabilityObject() {
        Set<Availability> availabilityObject = new HashSet<>();
        availabilities.forEach(availabilityFromSet -> availabilityObject.add(Availability.fromLong(availabilityFromSet)));
        return availabilityObject;
    }*/

}
