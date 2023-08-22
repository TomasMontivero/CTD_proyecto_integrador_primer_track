package com.dh.Booking.dtos;

import com.dh.Booking.models.City;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Builder
public class UserDTO {

    private Long id;
    private String name;
    private String surname;
    private String email;
    private String password;
    private City city;
    /*private Role role;*/

    public UserDTO(String name, String surname, String email, String password, City city) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.city = city;
    }

    public UserDTO(Long id, String name, String surname, String email, String password, City city) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.city = city;
    }
}
