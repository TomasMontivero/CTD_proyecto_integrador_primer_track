package com.dh.Booking;

import com.dh.Booking.jwt.JwtRequestFilter;
import com.dh.Booking.mappers.BookingMapper;
//import com.dh.Booking.models.CustomAuthenticationProvider;
import com.dh.Booking.services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(authenticationService);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().authorizeRequests()
                .antMatchers("/bienvenido.html","/authenticate", "/login.html", "/styles/", "/assets/", "/scripts/**", "/signup.html", "/categories", "/categories/**", "/products", "/products/**", "/cities", "/users", "/user/**", "/login", "/register", "/**")
                .permitAll().anyRequest().authenticated()
                .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        /*http.csrf().disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/register", "/login", "/roles/**", "/users/**").permitAll()
                .antMatchers(HttpMethod.GET, "/register", "/login", "/roles/**", "/users/**").hasAnyRole("admin")
                .antMatchers(HttpMethod.GET, "/products/**", "/categories/**", "/cities/**", "/amenities/**", "/swagger-ui/**").permitAll()
                .antMatchers(HttpMethod.POST, "/products/**", "/categories/**", "/cities/**", "/amenities/**").hasAnyRole("admin")
                .antMatchers(HttpMethod.PUT, "/products/**", "/categories/**", "/cities/**", "/amenities/**").hasAnyRole("admin")
                .antMatchers(HttpMethod.DELETE, "/products/**", "/categories/**", "/cities/**", "/amenities/**").hasAnyRole("admin");*/
    }



    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }



}