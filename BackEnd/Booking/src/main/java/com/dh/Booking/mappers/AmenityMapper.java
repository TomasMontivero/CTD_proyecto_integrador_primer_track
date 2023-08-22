package com.dh.Booking.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface AmenityMapper {

    AmenityMapper INSTANCE = Mappers.getMapper(AmenityMapper.class);

    //@Mapping(source = "id",target = "id")
    //AmenityDTO amenityToAmenityDTO(Amenity amenity);
}
