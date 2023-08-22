package com.dh.Booking.dtos;

import com.dh.Booking.models.Product;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AmenityDTO {

    private Long id;
    private String name;
    private String icon;
    Set<Product> products;



    public AmenityDTO(String name, String icon, Set<Product> products) {
        this.name = name;
        this.icon = icon;
        this.products = products;
    }

}
