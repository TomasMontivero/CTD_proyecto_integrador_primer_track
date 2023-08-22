package com.dh.Booking.controllers;

import com.dh.Booking.models.City;
import com.dh.Booking.dtos.CityDTO;
import com.dh.Booking.services.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/cities")
public class CityController {

    @Autowired
    private CityService cityService;

    @PostMapping()
    public ResponseEntity<City> createCity(@RequestBody City city) {
        return ResponseEntity.ok(cityService.createCity(city));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CityDTO> findCityById(@PathVariable Long id) {
        CityDTO cityDTO = cityService.findCityById(id);
        return ResponseEntity.ok(cityDTO);
    }

    @GetMapping
    public ResponseEntity<Collection<CityDTO>> listCities() {
        ResponseEntity<Collection<CityDTO>> response;
        response = ResponseEntity.ok(cityService.listCities());
        return response;
    }

    @PutMapping()
    public ResponseEntity<City> updateCity(@RequestBody City city) {
        ResponseEntity<City> response = null;
        if (city.getId() != null && cityService.findCityById(city.getId()) != null) {
            response = ResponseEntity.ok(cityService.updateCity(city));
        } else {
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return response;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCity(@PathVariable Long id) {
        ResponseEntity<String> response = null;
        if (cityService.findCityById(id) != null) {
            cityService.deleteCity(id);
            response = ResponseEntity.status(HttpStatus.NO_CONTENT).body("Ciudad eliminada");
        } else {
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return response;
    }

    // TODO mover las validaciones (Ej: datos vacios, o si un campo de texto tiene numeros) al CategoryDTO para que el Controller no tenga que manejar logica.
    // TODO implementar mapstruct para el manejo de models y DTOs: https://mapstruct.org/#get-started

}