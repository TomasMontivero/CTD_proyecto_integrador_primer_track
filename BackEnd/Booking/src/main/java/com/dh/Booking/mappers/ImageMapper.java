package com.dh.Booking.mappers;

import com.dh.Booking.dtos.ImageDTO;
import com.dh.Booking.models.*;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;


@Mapper(componentModel = "spring")
public interface ImageMapper {


    default ImageDTO imageToImageDTO(Image image) {

        ImageDTO imageDTO = new ImageDTO();
        imageDTO.setId(image.getId());
        imageDTO.setTitle(image.getTitle());
        imageDTO.setUrl(image.getUrl());
        imageDTO.setProduct(image.getProduct().getId());
        return imageDTO;
    };

    ImageMapper INSTANCE = Mappers.getMapper(ImageMapper.class);

}