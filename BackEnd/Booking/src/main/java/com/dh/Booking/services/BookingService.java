package com.dh.Booking.services;

import com.dh.Booking.dtos.BookingDTO;
import com.dh.Booking.dtos.ProductDTO;
import com.dh.Booking.mappers.BookingMapper;
import com.dh.Booking.models.Booking;
import com.dh.Booking.repositories.BookingRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class BookingService {

    // ---------------------------------------
    // ATRIBUTOS
    // ---------------------------------------

    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    ObjectMapper mapper;

    @Autowired
    ProductService productService;


    Logger logger = Logger.getLogger(BookingService.class);

    // ---------------------------------------
    // METODOS
    // ---------------------------------------

    BookingService() {
        File log4jProperties = new File("src/log4j.properties");
        PropertyConfigurator.configure(log4jProperties.getAbsolutePath());
        logger = Logger.getLogger(BookingService.class);
    }


    public Booking createBooking(BookingDTO bookingDTO) {
        Booking createdBooking;
        Booking booking;
        booking = mapper.convertValue(bookingDTO, Booking.class);
        createdBooking = bookingRepository.save(booking);
        logger.info("---- Reserva creada: ID: " + createdBooking.getId());
        return createdBooking;
    }

    public BookingDTO findBookingById(Long id) {
        Optional<Booking> optionalBooking = bookingRepository.findById(id);
        BookingDTO bookingDTO = null;
        if (optionalBooking.isPresent()) {
            Booking booking = optionalBooking.get();
            bookingDTO = BookingMapper.INSTANCE.bookingTobookingDTO(booking);
            logger.info("---- Reserva encontrada: ID: " + bookingDTO.getId());
        } else  {
            logger.error("---- Falló la búsqueda de la reserva ID: " + id);
        }
        return bookingDTO;
    }

    public Collection<BookingDTO> findBookingsByProductId(Long id) {
        Collection<BookingDTO> bookingList = listBookings();
        ProductDTO productDTO = productService.findProductById(id);
        Collection<BookingDTO> filteredBookingList = bookingList.stream()
                .filter(booking -> mapper.convertValue(booking.getProduct(), ProductDTO.class).getId() == productDTO.getId())
                .collect(Collectors.toList());
        logger.info("---- Lista de reservas generada, filtrada por Producto ID: " + id);
        return filteredBookingList;
    }

    public Collection<BookingDTO> listBookings() {
        List<Booking> bookingsList = bookingRepository.findAll();
        Set<BookingDTO> bookingsDTO = new HashSet<>();
        for (Booking booking: bookingsList) {
            BookingDTO bookingDTO = null;
            bookingDTO = BookingMapper.INSTANCE.bookingTobookingDTO(booking);
            bookingsDTO.add(bookingDTO);
        }
        logger.info("---- Lista de reservas generada");
        return bookingsDTO;
    }

}