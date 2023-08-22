package com.dh.Booking.controllers;

import com.dh.Booking.dtos.BookingDTO;
import com.dh.Booking.models.User;
import com.dh.Booking.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

    @Autowired
    UserService userService;


    /*@RequestMapping(value = "/users", method = RequestMethod.GET)
    public ResponseEntity<?> user() throws Exception{

        UserDetails userDatails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User user = new User();
        user.setName(userDatails.getUsername());

        return ResponseEntity.ok(user);
    }*/


    @RequestMapping(value = "/users/{id}", method = RequestMethod.GET)
    public ResponseEntity<User> findUserById(@PathVariable Long id) {
        User user = userService.findUserById(id);
        return ResponseEntity.ok(user);
    }

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public ResponseEntity<Collection<User>> listUsers() {
        ResponseEntity<Collection<User>> response;
        response = ResponseEntity.ok(userService.listUsers());
        return response;
    }




}
