package com.stage.authenticationservice.service;


import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.stage.authenticationservice.model.CustomUser;
import com.stage.authenticationservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

//Service which interacts with the repository
@Service
public class JwtUserDetailsService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    //Fetching the user
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        //Interacting with the repository
        CustomUser customUser=null;
        //Getting the user data from the repository
        customUser= userRepository.findByUsername(username);
        //User retrieved from the database
        if (customUser != null) {
            ArrayList<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
            authorities.add(new SimpleGrantedAuthority(customUser.getUserRole()));
            return new User(customUser.getUsername(), customUser.getPassword(), authorities);
        } else {
            throw new UsernameNotFoundException("User con username: " + username + " non esiste.");
        }
    }

    //Custom configurations CRUD ops
    //Create a new User
    public ResponseEntity<String> registerUser(CustomUser user){
        userRepository.save(user);
        return ResponseEntity.ok("User " + user.getUsername() + " created");
    }
    //Update an user
    public ResponseEntity<String> updateUser(CustomUser user){

        userRepository.save(user);
        return ResponseEntity.ok("User" + user.getUsername() + " updated");
    }
    //Delete a user
    public ResponseEntity<String> deleteUser(String username){
        userRepository.deleteById(username);
        return ResponseEntity.ok("User " + username + " deleted");
    }

    public ResponseEntity<CustomUser> getUserByUsername(String username){
        return ResponseEntity.ok(userRepository.findByUsername(username));
    }

    public void refreshToken(HttpServletRequest httpServletRequest){

    }
}

