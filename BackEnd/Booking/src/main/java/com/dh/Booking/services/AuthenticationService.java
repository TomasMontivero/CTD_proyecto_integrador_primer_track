package com.dh.Booking.services;

import com.dh.Booking.models.Role;
import com.dh.Booking.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class AuthenticationService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<com.dh.Booking.models.User> user = userRepository.getUserByEmail(email);

        Set<GrantedAuthority> authorizations = new HashSet<>();
        GrantedAuthority authorization = null;
        /*
            for (Role role : user.get().getRole()) {
            authorization = new SimpleGrantedAuthority(role.getName());
            authorizations.add(authorization);
            // este código sirve en caso de que un usuario pueda tener muchos roles
        }*/
        authorization = new SimpleGrantedAuthority(user.get().getRole().toString());
        authorizations.add(authorization);
        User userDetail = new User(user.get().getEmail(),user.get().getPassword(),true, true, true,true,authorizations);
        return userDetail;
    }

}