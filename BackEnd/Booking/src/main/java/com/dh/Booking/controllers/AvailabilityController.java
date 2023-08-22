package com.dh.Booking.controllers;

import com.dh.Booking.dtos.AvailabilityDTO;
import com.dh.Booking.models.Availability;
import com.dh.Booking.services.AvailabilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/availabilities")
public class AvailabilityController {

    @Autowired
    private AvailabilityService availabilityService;

    @PostMapping()
    public ResponseEntity<Availability> createAvailability(@RequestBody AvailabilityDTO availabilityDTO) {
        return ResponseEntity.ok(availabilityService.createAvailability(availabilityDTO));
    }

    @GetMapping
    public ResponseEntity<Collection<AvailabilityDTO>> listAvailabilities() {
        ResponseEntity<Collection<AvailabilityDTO>> response;
        response = ResponseEntity.ok(availabilityService.listAvailabilities());
        return response;
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Collection<AvailabilityDTO>> listAvailabilitiesByProductId(@PathVariable Long id) {
        ResponseEntity<Collection<AvailabilityDTO>> response;
        response = ResponseEntity.ok(availabilityService.findAvailabilitiesByProductId(id));
        return response;
    }

}