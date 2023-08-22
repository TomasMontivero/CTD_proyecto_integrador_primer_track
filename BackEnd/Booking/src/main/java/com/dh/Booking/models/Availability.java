package com.dh.Booking.models;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Getter @Setter @Builder
@Table
public class Availability {

    @Id
    @SequenceGenerator(name = "availability_sequence", sequenceName = "availability_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "availability_sequence")
    private Long id;
    private Date startDate;
    private Date endDate;

    @JsonIncludeProperties(value = {"id"})
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    public Availability(Long id, Date startDate, Date endDate, Product product) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.product = product;
    }

    public Availability(Date startDate, Date endDate, Product product) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.product = product;
    }

    public Availability() {
    }

    public Availability(Long id) {
        this.id = id;
    }

    public static Availability fromLong(Long availabilityLong) {
        Availability availability = new Availability(availabilityLong);
        return availability;
    }

}