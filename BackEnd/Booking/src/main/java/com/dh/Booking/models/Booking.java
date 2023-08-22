package com.dh.Booking.models;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;


@Entity
@Getter @Setter @Builder
@Table
public class Booking {

    @Id
    @SequenceGenerator(name = "booking_sequence", sequenceName = "booking_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "booking_sequence")
    private Long id;
    private Time startHour;
    private Date startDate;
    private Date endDate;

    @JsonIncludeProperties(value = {"id"})
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @JsonIncludeProperties(value = {"id"})
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Booking(Long id, Time startHour, Date startDate, Date endDate, Product product, User user) {
        this.id = id;
        this.startHour = startHour;
        this.startDate = startDate;
        this.endDate = endDate;
        this.product = product;
        this.user = user;
    }

    public Booking(Time startHour, Date startDate, Date endDate, Product product, User user) {
        this.startHour = startHour;
        this.startDate = startDate;
        this.endDate = endDate;
        this.product = product;
        this.user = user;
    }

    public Booking() {
    }

    public Booking(Long id) {
        this.id = id;
    }

    public static Booking fromLong(Long bookingLong) {
        Booking booking = new Booking(bookingLong);
        return booking;
    }
}
