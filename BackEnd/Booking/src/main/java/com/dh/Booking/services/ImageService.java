package com.dh.Booking.services;

import com.dh.Booking.mappers.ImageMapper;
import com.dh.Booking.models.Image;
import com.dh.Booking.dtos.ImageDTO;
import com.dh.Booking.repositories.ImageRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.PropertyConfigurator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.apache.log4j.Logger;

import java.io.File;
import java.util.*;


@Service
public class ImageService {

    // ---------------------------------------
    // ATRIBUTOS
    // ---------------------------------------

    @Autowired
    ImageRepository imageRepository;

    @Autowired
    ObjectMapper mapper;

    Logger logger = Logger.getLogger(ImageService.class);

    // ---------------------------------------
    // METODOS
    // ---------------------------------------

    ImageService() {
        File log4jProperties = new File("src/log4j.properties");
        PropertyConfigurator.configure(log4jProperties.getAbsolutePath());
        logger = Logger.getLogger(ImageService.class);
    }

    public Image createImage(ImageDTO imageDTO) {
        Image createdImage;
        Image image;
        image = mapper.convertValue(imageDTO, Image.class);
        createdImage = imageRepository.save(image);
        logger.info("---- Imagen creada: ID: " + createdImage.getId());
        return createdImage;
    }

    public Image updateImage(ImageDTO imageDTO) {
        Image updatedImage;
        Image image;
        image = mapper.convertValue(imageDTO, Image.class);
        updatedImage = imageRepository.saveAndFlush(image);
        logger.info("---- Imagen actualizada: ID: " + updatedImage.getId());
        return updatedImage;
    }

    public void deleteImage(Long id) {
        if(findImageById(id) != null) {
            imageRepository.deleteById(id);
            logger.info("---- Imagen eliminada: ID: " + id);
        } else {
            logger.error("---- Falló la eliminacion de la imagen ID: " + id);
        }
    }

    public ImageDTO findImageById(Long id) {
        Optional<Image> optionalImage = imageRepository.findById(id);
        ImageDTO imageDTO = null;
        if(optionalImage.isPresent()) {
            Image image = optionalImage.get();
            imageDTO = ImageMapper.INSTANCE.imageToImageDTO(image);
            logger.info("---- Imagen encontrada: ID:" + imageDTO.getId());
        } else {
            logger.error("---- Falló la busqueda de la imagen ID: " + id);
        }
        return imageDTO;
    }

    public Collection<ImageDTO> listImages() {
        List<Image> imagesList = imageRepository.findAll();
        Set<ImageDTO> imagesDTO = new HashSet<>();
        for(Image image: imagesList) {
            ImageDTO imageDTO = null;
            imageDTO = ImageMapper.INSTANCE.imageToImageDTO(image);
            imagesDTO.add(imageDTO);
        }
        logger.info("---- Lista de imagenes generada");
        return imagesDTO;
    }

}
