package com.dh.Booking.mappers;

import com.dh.Booking.dtos.ProductDTO;
import com.dh.Booking.models.*;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.HashSet;
import java.util.Set;

@Mapper(componentModel = "spring")
public interface ProductMapper {


    default ProductDTO productToProductDTO(Product product) {
        Set<Image> images = product.getImages();
        Set<Long> imageLong = new HashSet<>();
        images.forEach(imageFromSet -> imageLong.add(imageFromSet.getId()));

        Set<Amenity> amenities = product.getAmenities();
        Set<Long> amenityLong = new HashSet<>();
        if (amenities != null) {
            amenities.forEach(amenityFromSet -> amenityLong.add(amenityFromSet.getId()));
        }

        Set<Booking> bookings = product.getBookings();
        Set<Long> bookingLong = new HashSet<>();
        bookings.forEach(bookingFromSet -> bookingLong.add(bookingFromSet.getId()));

        Set<Availability> availabilities = product.getAvailabilities();
        Set<Long> availabilityLong = new HashSet<>();
        availabilities.forEach(availabilityFromSet -> availabilityLong.add(availabilityFromSet.getId()));

        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(product.getId());
        productDTO.setCategory(product.getCategory().getId());
        productDTO.setTitle(product.getTitle());
        productDTO.setCity(product.getCity().getId());
        productDTO.setProductDescription(product.getProductDescription());
        productDTO.setRating(product.getRating());
        productDTO.setImages(imageLong);
        productDTO.setAmenities(amenityLong);
        productDTO.setBookings(bookingLong);
        productDTO.setAvailabilities(availabilityLong);
        return productDTO;
    };

    ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

}