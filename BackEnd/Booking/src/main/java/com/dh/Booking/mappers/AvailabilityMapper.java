package com.dh.Booking.mappers;

import com.dh.Booking.dtos.AvailabilityDTO;
import com.dh.Booking.models.*;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;


@Mapper(componentModel = "spring")
public interface AvailabilityMapper {


    default AvailabilityDTO availabilityToAvailabilityDTO(Availability availability) {

        AvailabilityDTO availabilityDTO = new AvailabilityDTO();
        availabilityDTO.setId(availability.getId());
        availabilityDTO.setStartDate(availability.getStartDate());
        availabilityDTO.setEndDate(availability.getEndDate());
        availabilityDTO.setProduct(availability.getProduct().getId());
        return availabilityDTO;
    };

    AvailabilityMapper INSTANCE = Mappers.getMapper(AvailabilityMapper.class);

}