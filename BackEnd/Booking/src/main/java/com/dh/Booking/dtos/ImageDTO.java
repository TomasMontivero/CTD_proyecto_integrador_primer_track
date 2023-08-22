package com.dh.Booking.dtos;

import com.dh.Booking.models.Product;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ImageDTO {

    private Long id;
    private String title;
    private String url;
    private Long product;

    public ImageDTO(String title, String url, Long product) {
        this.title = title;
        this.url = url;
        this.product = product;
    }

    public ImageDTO(Long id) {
        this.id = id;
    }
}
