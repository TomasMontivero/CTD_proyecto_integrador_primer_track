package com.dh.Booking.controllers;


import com.dh.Booking.models.Image;
import com.dh.Booking.dtos.ImageDTO;
import com.dh.Booking.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/images")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @PostMapping()
    public ResponseEntity<Image> createImage(@RequestBody ImageDTO imageDTO) {
        return ResponseEntity.ok(imageService.createImage(imageDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ImageDTO> findImageById(@PathVariable Long id) {
        ImageDTO imageDTO = imageService.findImageById(id);
        return ResponseEntity.ok(imageDTO);
    }

    @GetMapping
    public ResponseEntity<Collection<ImageDTO>> listImages() {
        ResponseEntity<Collection<ImageDTO>> response;
        response = ResponseEntity.ok(imageService.listImages());
        return response;
    }

    @PutMapping
    public ResponseEntity<Image> updateImage(@RequestBody ImageDTO imageDTO) {
        ResponseEntity<Image> response = null;
        if(imageDTO.getId() != null && imageService.findImageById(imageDTO.getId()) != null) {
            response = ResponseEntity.ok(imageService.updateImage(imageDTO));
        } else {
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return response;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteImage(@PathVariable Long id) {
        ResponseEntity<String> response = null;
        if(imageService.findImageById(id) != null) {
            imageService.deleteImage(id);
            response = ResponseEntity.status(HttpStatus.NO_CONTENT).body("Imagen eliminada");
        } else {
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return response;
    }

}