package com.dh.Booking.dtos;

import com.dh.Booking.models.Product;
import lombok.*;

import java.sql.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AvailabilityDTO {

    private Long id;
    private Date startDate;
    private Date endDate;
    private Long product;

    public AvailabilityDTO(Date startDate, Date endDate, Long product) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.product = product;
    }

    public AvailabilityDTO(Long id) {
        this.id = id;
    }
}
