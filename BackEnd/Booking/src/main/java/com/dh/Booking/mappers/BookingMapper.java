package com.dh.Booking.mappers;

import com.dh.Booking.dtos.BookingDTO;
import com.dh.Booking.models.Booking;
import com.dh.Booking.models.Product;
import com.dh.Booking.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface BookingMapper {


    default BookingDTO bookingTobookingDTO(Booking booking) {
        BookingDTO bookingDTO = new BookingDTO();
        bookingDTO.setId(booking.getId());
        bookingDTO.setStartHour(booking.getStartHour());
        bookingDTO.setStartDate(booking.getStartDate());
        bookingDTO.setEndDate(booking.getEndDate());
        bookingDTO.setProduct(booking.getProduct().getId());
        bookingDTO.setUser(booking.getUser().getId());
        return bookingDTO;
    };

    default Booking bookingDTOToBooking(BookingDTO bookingDTO) {
        Booking booking = null;
        if (bookingDTO.getId() != null) {
            booking.setId(bookingDTO.getId());
        }
        booking.setStartHour(bookingDTO.getStartHour());
        booking.setStartDate(bookingDTO.getStartDate());
        booking.setEndDate(bookingDTO.getEndDate());
        booking.setProduct(Product.fromLong(bookingDTO.getProduct()));
        booking.setUser(User.fromLong(bookingDTO.getProduct()));
        return booking;
    };

    BookingMapper INSTANCE = Mappers.getMapper(BookingMapper.class);

}
