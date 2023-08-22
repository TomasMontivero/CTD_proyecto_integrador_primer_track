package com.dh.Booking.controllers;

import com.dh.Booking.jwt.JwtUtil;
import com.dh.Booking.models.*;
import com.dh.Booking.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    UserService userService;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private JwtUtil jwtUtil;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> register(/*@Valid*/ @RequestBody RegisterRequest registerRequest, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        if (userService.validateUserByEmail(registerRequest.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Este correo ya se encuentra registrado");
        }
        User user = new User(null,registerRequest.getName(),
                registerRequest.getSurname(),
                registerRequest.getEmail(),
                passwordEncoder.encode(registerRequest.getPassword()),
                new City(1L,"Rio de Janeiro","Brasil", null) ,
                new Role(2L, RoleName.customer, null),
                null);
        userService.createUser(user);

        final UserDetails userDetails = userDetailsService.loadUserByUsername(registerRequest.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);
        return ResponseEntity.ok(new AuthenticationResponse((jwt)));
    }


    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception{

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword()));
        }catch (BadCredentialsException e) {
            System.out.println("---- BadCredentialsException: " + e);
            throw new Exception("Incorrect", e);
        } catch (AuthenticationException e) {
            System.out.println("---- AuthenticationException: " + e);
        } catch (Exception e) {
            System.out.println("---- Exception: " + e);
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse((jwt)));
    }


}
