package com.dh.Booking.services;

import com.dh.Booking.models.City;
import com.dh.Booking.dtos.CityDTO;
import com.dh.Booking.repositories.CityRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.*;

@Service
public class CityService {

    // ---------------------------------------
    // ATRIBUTOS
    // ---------------------------------------

    @Autowired
    CityRepository cityRepository;

    @Autowired
    ObjectMapper mapper;

    Logger logger = Logger.getLogger(CityService.class);

    // ---------------------------------------
    // METODOS
    // ---------------------------------------

    CityService() {
        File log4jProperties = new File("src/log4j.properties");
        PropertyConfigurator.configure(log4jProperties.getAbsolutePath());
        logger = Logger.getLogger(CityService.class);
    }

    public City createCity(City city) {
        City createdCity;
        createdCity = cityRepository.save(city);
        logger.info("---- Ciudad creada: ID: " + createdCity.getId() + " - Nombre: " + createdCity.getName() + " - País: " + createdCity.getCountry());
        return createdCity;
    }

    public City updateCity(City city) {
        City updatedCity;
        updatedCity = cityRepository.saveAndFlush(city);
        logger.info("---- Ciudad actualizada: ID: " + updatedCity.getId() + " - Nombre: " + updatedCity.getName() + " - País: " + updatedCity.getCountry());
        return updatedCity;
    }

    public void deleteCity(Long id) {
        if(findCityById(id) != null) {
            cityRepository.deleteById(id);
            logger.info("---- Ciudad eliminada: ID: " + id);
        } else {
            logger.error("---- Falló la eliminación de la ciudad ID: " + id);
            //TODO: Ver si implementar las excepciones. Ej: throw new BadRequestException(HttpStatus.NOT_FOUND ,"Categoria no encontrada");
        }
    }

    public CityDTO findCityById(Long id) {
        Optional<City> optionalCity = cityRepository.findById(id);
        CityDTO cityDTO = null;
        if (optionalCity.isPresent()) {
            cityDTO = mapper.convertValue(optionalCity, CityDTO.class);
            logger.info("---- Ciudad encontrada: ID: " + cityDTO.getId() + " - Nombre: " + cityDTO.getName() + " - País: " + cityDTO.getCountry());
        } else {
            logger.error("---- Falló la búsqueda de la ciudad ID: " + id);
            //TODO: Ver si implementar las excepciones. Ej: throw new BadRequestException(HttpStatus.NOT_FOUND ,"Categoria no encontrada");
        }
        return cityDTO;
    }

    public Collection<CityDTO> listCities() {
        List<City> citiesList = cityRepository.findAll();
        Set<CityDTO> citiesDTO = new HashSet<>();
        for (City city: citiesList) {
            citiesDTO.add(mapper.convertValue(city, CityDTO.class));
        }
        logger.info("---- Lista de ciudades generada");
        return citiesDTO;

    }

}