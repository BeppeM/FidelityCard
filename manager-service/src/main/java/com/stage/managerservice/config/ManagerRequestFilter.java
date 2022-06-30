package com.stage.managerservice.config;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

@Component
public class ManagerRequestFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        //Field used to verify if the request is a registration
        if ( request.getHeader("Registration") == null) {
            //Retrieving data from the request header
            final String username = request.getHeader("username");
            final String password = request.getHeader("password");
            //Retrieving the role
            final String role = "ROLE_" + request.getHeader("role")
                    .substring(1, request.getHeader("role").length() - 1);
            //Creating the authorities
            ArrayList<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
            authorities.add(new SimpleGrantedAuthority(role));
            //Creating the User
            UserDetails userDetails = new User(username, password, authorities);
            //Creating Authentication method
            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities());
            usernamePasswordAuthenticationToken
                    .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            // After setting the Authentication in the context, we specify
            // that the current user is authenticated. So it passes the
            // Spring Security Configurations successfully.
            SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            //Debug
            System.out.println("Printing the header: ");
            System.out.println("Username: " + username + " Password: " + password + " Role: " + role);
        }
        else{
            System.out.println("L'utente si sta registrando....");
        }
        //Chain the filter
        filterChain.doFilter(request, response);
    }
}
