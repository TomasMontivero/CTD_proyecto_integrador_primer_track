package com.dh.Booking.models;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter @Builder
@Table

public class Image {

    @Id
    @SequenceGenerator(name = "image_sequence", sequenceName = "image_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "image_sequence")
    private Long id;
    private String title;
    private String url;

    @JsonIncludeProperties(value = {"id"})
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    public Image(Long id, String title, String url, Product product) {
        this.id = id;
        this.title = title;
        this.url = url;
        this.product = product;
    }

    public Image(String title, String url, Product product) {
        this.title = title;
        this.url = url;
        this.product = product;
    }

    public Image() {
    }

    public Image(Long id) {
        this.id = id;
    }

    public static Image fromLong(Long imageLong) {
        Image image = new Image(imageLong);
        return image;
    }
}
