package com.dh.Booking.dtos;

import com.dh.Booking.models.Product;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {

    private Long id;
    private String title;
    private String description;
    private String urlImage;
    private List<Product> productos;
    private Long amount;

    public CategoryDTO(String title, String description, String urlImage, List<Product> productos, Long amount) {
        this.title = title;
        this.description = description;
        this.urlImage = urlImage;
        this.productos = productos;
        this.amount = amount;
    }

}