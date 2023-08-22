package com.dh.Booking.repositories;

import com.dh.Booking.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {


    @Query("from User u where u.email =:email")
    Optional<User> getUserByEmail(@Param("email") String name);

    Boolean existsByEmail(String email); // Info: https://www.baeldung.com/spring-data-exists-query

}
