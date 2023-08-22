package com.dh.Booking.services;

import com.dh.Booking.models.User;
import com.dh.Booking.repositories.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.*;

@Service
public class UserService {

    // ---------------------------------------
    // ATRIBUTOS
    // ---------------------------------------

    @Autowired
    UserRepository userRepository;

    @Autowired
    ObjectMapper mapper;

    Logger logger = Logger.getLogger(ProductService.class);

    // ---------------------------------------
    // METODOS
    // ---------------------------------------

    UserService() {
        File log4jProperties = new File("src/log4j.properties");
        PropertyConfigurator.configure(log4jProperties.getAbsolutePath());
        logger = Logger.getLogger(UserService.class);
    }

    public User createUser(User user) {
        User createdUser;
        createdUser = userRepository.save(user);
        logger.info("---- Usuario creado: ID: " + createdUser.getId() + " - Email: " + createdUser.getEmail());
        return createdUser;
    }

    public boolean validateUserByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public User findUserById(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        User user = null;
        if (optionalUser.isPresent()) {
            logger.info("---- Usuario encontrado: ID: " + optionalUser.get().getId() + " - Email: " + optionalUser.get().getEmail() + " - Password: " + optionalUser.get().getPassword());
            user = mapper.convertValue(optionalUser, User.class);
        } else  {
            logger.error("---- Falló la busqueda del usuario ID: " + id);
        }
        return user;
    }

    public Collection<User> listUsers() {
        List<User> usersList = userRepository.findAll();
        Set<User> users = new HashSet<>();
        for (User user: usersList) {
            users.add(user);
        }
        logger.info("---- Lista de usuarios generada");
        return users;
    }


}
