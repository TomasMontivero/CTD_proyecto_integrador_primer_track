package com.dh.Booking.dtos;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.sql.Time;

@Getter
@Setter
@Builder
public class BookingDTO {

    private Long id;
    private Time startHour;
    private Date startDate;
    private Date endDate;
    private Long product;
    private Long user;

    public BookingDTO() {
    }

    public BookingDTO(Time startHour, Date startDate, Date endDate, Long product, Long user) {
        this.startHour = startHour;
        this.startDate = startDate;
        this.endDate = endDate;
        this.product = product;
        this.user = user;
    }

    public BookingDTO(Long id, Time startHour, Date startDate, Date endDate, Long product, Long user) {
        this.id = id;
        this.startHour = startHour;
        this.startDate = startDate;
        this.endDate = endDate;
        this.product = product;
        this.user = user;
    }
}
