package com.dh.Booking.services;

import com.dh.Booking.models.Amenity;
import com.dh.Booking.dtos.AmenityDTO;
import com.dh.Booking.repositories.AmenityRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.*;


@Service
public class AmenityService {

    // ---------------------------------------
    // ATRIBUTOS
    // ---------------------------------------

    @Autowired
    AmenityRepository amenityRepository;

    @Autowired
    ObjectMapper mapper;

    Logger logger = Logger.getLogger(AmenityService.class);

    // ---------------------------------------
    // METODOS
    // ---------------------------------------

    AmenityService() {
        File log4jProperties = new File("src/log4j.properties");
        PropertyConfigurator.configure(log4jProperties.getAbsolutePath());
        logger = Logger.getLogger(AmenityService.class);
    }

    public Amenity createAmenity(Amenity amenity) {
        Amenity createdAmenity;
        createdAmenity = amenityRepository.save(amenity);
        logger.info("---- Amenity creada: ID: " + createdAmenity.getId() + " - Nombre: " + createdAmenity.getName() + " - Ícono: " + createdAmenity.getIcon());
        return createdAmenity;
    }

    public Amenity updateAmenity(Amenity amenity) {
        Amenity updatedAmenity;
        updatedAmenity = amenityRepository.saveAndFlush(amenity);
        logger.info("---- Amenity actualizada: ID: " + updatedAmenity.getId() + " - Nombre: " + updatedAmenity.getName() + " - Ícono: " + updatedAmenity.getIcon());
        return updatedAmenity;
    }

    public void deleteAmenity(Long id) {
        if(findAmenityById(id) != null) {
            amenityRepository.deleteById(id);
            logger.info("---- Amenity eliminada: ID: " + id);
        } else {
            logger.error("---- Falló la eliminación de la amenity ID: " + id);
            //TODO: Ver si implementar las excepciones. Ej: throw new BadRequestException(HttpStatus.NOT_FOUND ,"Categoria no encontrada");
        }
    }

    public AmenityDTO findAmenityById(Long id) {
        Optional<Amenity> optionalAmenity = amenityRepository.findById(id);
        AmenityDTO amenityDTO = null;
        if (optionalAmenity.isPresent()) {
            amenityDTO = mapper.convertValue(optionalAmenity, AmenityDTO.class);
            logger.info("---- Amenity encontrada: ID: " + amenityDTO.getId() + " - Nombre: " + amenityDTO.getName() + " - Ícono: " + amenityDTO.getIcon());
        } else {
            logger.error("---- Falló la busqueda de la amenity ID: " + id);
            //TODO: Ver si implementar las excepciones. Ej: throw new BadRequestException(HttpStatus.NOT_FOUND ,"Categoria no encontrada");
        }
        return amenityDTO;
    }

    public Collection<AmenityDTO> listAmenities() {
        List<Amenity> amenitiesList = amenityRepository.findAll();
        Set<AmenityDTO> amenitiesDTO = new HashSet<>();
        for (Amenity amenity: amenitiesList) {
            amenitiesDTO.add(mapper.convertValue(amenity, AmenityDTO.class));
        }
        logger.info("---- Lista de amenities generada");
        return amenitiesDTO;

    }
}