package com.dh.Booking.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter @Setter @Builder
@Table
public class Category {

    // TODO agregar anotaciones para conexión con BD? Ejemplo: @ID @JoinColumn

    @Id
    @SequenceGenerator(name = "category_sequence", sequenceName = "category_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "category_sequence")
    private Long id;
    private String title;
    private String description;
    private String urlImage;

    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Product> productos;

    private Long amount;

    public Category(Long id, String title, String description, String urlImage, List<Product> productos, Long amount) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.urlImage = urlImage;
        this.productos = productos;
        this.amount = amount;
    }

    public Category(String title, String description, String urlImage, List<Product> productos, Long amount) {
        this.title = title;
        this.description = description;
        this.urlImage = urlImage;
        this.productos = productos;
        this.amount = amount;
    }

    public Category() {
    }

    public Category(Long id) {
        this.id = id;
    }

    public static Category fromLong(Long categoryLong) {
        Category category = new Category(categoryLong);
        return category;
    }
}
