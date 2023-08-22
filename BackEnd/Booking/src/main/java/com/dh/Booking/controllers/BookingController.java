package com.dh.Booking.controllers;

import com.dh.Booking.dtos.BookingDTO;
import com.dh.Booking.models.Booking;
import com.dh.Booking.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/bookings")
public class BookingController {


    @Autowired
    private BookingService bookingService;


    @PostMapping()
    public ResponseEntity<Booking> createBooking(@RequestBody BookingDTO bookingDTO) {
        return ResponseEntity.ok(bookingService.createBooking(bookingDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingDTO> findBookingById(@PathVariable Long id) {
        BookingDTO bookingDTO = bookingService.findBookingById(id);
        return ResponseEntity.ok(bookingDTO);
    }

    @GetMapping
    public ResponseEntity<Collection<BookingDTO>> listBookings() {
        ResponseEntity<Collection<BookingDTO>> response;
        response = ResponseEntity.ok(bookingService.listBookings());
        return response;
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Collection<BookingDTO>> listBookingsByProductId(@PathVariable Long id) {
        ResponseEntity<Collection<BookingDTO>> response;
        response = ResponseEntity.ok(bookingService.findBookingsByProductId(id));
        return response;
    }

}