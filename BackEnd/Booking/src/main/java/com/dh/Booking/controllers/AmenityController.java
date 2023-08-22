package com.dh.Booking.controllers;

import com.dh.Booking.models.Amenity;
import com.dh.Booking.dtos.AmenityDTO;
import com.dh.Booking.services.AmenityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/amenities")
public class AmenityController {

    @Autowired
    private AmenityService amenityService;

    @PostMapping()
    public ResponseEntity<Amenity> createAmenity(@RequestBody Amenity amenity) {
        return ResponseEntity.ok(amenityService.createAmenity(amenity));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AmenityDTO> findAmenityById(@PathVariable Long id) {
        AmenityDTO amenityDTO = amenityService.findAmenityById(id);
        return ResponseEntity.ok(amenityDTO);
    }

    @GetMapping
    public ResponseEntity<Collection<AmenityDTO>> listAmenities() {
        ResponseEntity<Collection<AmenityDTO>> response;
        response = ResponseEntity.ok(amenityService.listAmenities());
        return response;
    }

    @PutMapping()
    public ResponseEntity<Amenity> updateAmenity(@RequestBody Amenity amenity) {
        ResponseEntity<Amenity> response = null;
        if (amenity.getId() != null && amenityService.findAmenityById(amenity.getId()) != null) {
            response = ResponseEntity.ok(amenityService.updateAmenity(amenity));
        } else {
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return response;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAmenity(@PathVariable Long id) {
        ResponseEntity<String> response = null;
        if (amenityService.findAmenityById(id) != null) {
            amenityService.deleteAmenity(id);
            response = ResponseEntity.status(HttpStatus.NO_CONTENT).body("Amenity eliminada");
        } else {
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return response;
    }

}