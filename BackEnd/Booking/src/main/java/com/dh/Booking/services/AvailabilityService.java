package com.dh.Booking.services;

import com.dh.Booking.dtos.AvailabilityDTO;
import com.dh.Booking.dtos.ProductDTO;
import com.dh.Booking.mappers.AvailabilityMapper;
import com.dh.Booking.models.Availability;
import com.dh.Booking.repositories.AvailabilityRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AvailabilityService {

    // ---------------------------------------
    // ATRIBUTOS
    // ---------------------------------------

    @Autowired
    AvailabilityRepository availabilityRepository;

    @Autowired
    ObjectMapper mapper;

    @Autowired
    ProductService productService;


    Logger logger = Logger.getLogger(AvailabilityService.class);

    // ---------------------------------------
    // METODOS
    // ---------------------------------------

    AvailabilityService() {
        File log4jProperties = new File("src/log4j.properties");
        PropertyConfigurator.configure(log4jProperties.getAbsolutePath());
        logger = Logger.getLogger(AvailabilityService.class);
    }

    public Availability createAvailability(AvailabilityDTO availabilityDTO) {
        Availability createdAvailability;
        Availability availability;
        availability = mapper.convertValue(availabilityDTO, Availability.class);
        createdAvailability = availabilityRepository.save(availability);
        logger.info("---- Disponibilidad creada: ID: " + createdAvailability.getId());
        return createdAvailability;
    }

    public Collection<AvailabilityDTO> findAvailabilitiesByProductId(Long id) {
        Collection<AvailabilityDTO> availabilityList = listAvailabilities();
        ProductDTO productDTO = productService.findProductById(id);
        Collection<AvailabilityDTO> filteredAvailabilityList = availabilityList.stream()
                .filter(availability -> mapper.convertValue(availability.getProduct(), ProductDTO.class).getId() == productDTO.getId())
                .collect(Collectors.toList());
        logger.info("---- Lista de disponibilidades generada, filtrada por Producto ID: " + id);
        return filteredAvailabilityList;
    }

    public Collection<AvailabilityDTO> listAvailabilities() {
        List<Availability> availabilitiesList = availabilityRepository.findAll();
        Set<AvailabilityDTO> availabilitiesDTO = new HashSet<>();
        for (Availability availability: availabilitiesList) {
            AvailabilityDTO availabilityDTO = null;
            availabilityDTO = AvailabilityMapper.INSTANCE.availabilityToAvailabilityDTO(availability);
            availabilitiesDTO.add(availabilityDTO);
        }
        logger.info("---- Lista de disponibilidades generada");
        return availabilitiesDTO;
    }

}