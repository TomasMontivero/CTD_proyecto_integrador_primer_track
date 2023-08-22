package com.dh.Booking.dtos;

import com.dh.Booking.models.Product;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CityDTO {

    private Long id;
    private String name;
    private String country;
    private List<Product> productos;

    public CityDTO(String name, String country, List<Product> productos) {
        this.name = name;
        this.country = country;
        this.productos = productos;
    }

}
