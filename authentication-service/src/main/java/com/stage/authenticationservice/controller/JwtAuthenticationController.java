package com.stage.authenticationservice.controller;

import com.stage.authenticationservice.model.CustomUser;
import com.stage.authenticationservice.util.JwtTokenUtil;
import com.stage.authenticationservice.model.JwtRequest;
import com.stage.authenticationservice.model.JwtResponse;
import com.stage.authenticationservice.service.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/auth")
public class JwtAuthenticationController {

    @Autowired
    private JwtUserDetailsService userDetailsService;
    //It's used to authenticate the user
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    //Endpoint that receives username and password to authenticate the user
    //Returns back a JWT token!!!
    @PostMapping(value = "/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        System.out.println("Sono entrato!!!");
        //Authenticate the user with username and password, using authenticationManager
        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
        //Retrieve userDetails from the repository
        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());
        System.out.println(userDetails.getPassword());
        //generating the access token
        final String access = jwtTokenUtil.generateToken(userDetails);
        //generating the refresh token
        final String refresh = jwtTokenUtil.generateRefreshToken(userDetails);
        System.out.println("Access token: " + access);
        System.out.println("Refresh token: " + refresh);
        //Return the response with the token generated
        return ResponseEntity.ok(new JwtResponse(access, refresh));
    }

    //Returns a new access token with the old refresh token
    @GetMapping(value = "/refresh")
    public ResponseEntity<?> refreshToken(HttpServletRequest request) {
        final String requestTokenHeader = request.getHeader("Authorization");
        String refreshToken = requestTokenHeader.substring(7);
        System.out.println("Il refresh token inviato: " + refreshToken);
        //Get username from the token
        String username = jwtTokenUtil.getUsernameFromToken(refreshToken);
        System.out.println("Username for the new access token: " + username);
        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(username);
        //generating the access token
        final String access = jwtTokenUtil.generateToken(userDetails);
        System.out.println("New Access token generated: " + access);
        //Returning the new access token and the old refresh token
        return ResponseEntity.ok(new JwtResponse(access, refreshToken));
    }

    //Authentication of the user
    private void authenticate(String username, String password) throws Exception {
        try {
            //Manager authenticate the user with username password method
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (BadCredentialsException e) {
            throw new Exception("Le credenziali sono sbagliate!", e);
        }
    }

    //Endpoint used for the gateway to check if the token is valid
    @GetMapping("/checkToken/{jwt}")
    public String checkToken(@PathVariable String jwt) {
        String username = jwtTokenUtil.getUsernameFromToken(jwt);
        //Retrieve userDetails from the repository
        UserDetails userDetails = null;
        userDetails = userDetailsService
                .loadUserByUsername(username);
        //Validate the token
        if (jwtTokenUtil.validateToken(jwt, userDetails)) {
            //Passing the userDetails
            String result = "";
            result += userDetails.getUsername() + " "
                    + userDetails.getPassword() + " "
                    + userDetails.getAuthorities();
            return result;
        } else {
            return null;
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody CustomUser user) {
        user.setPassword((new BCryptPasswordEncoder()).encode(user.getPassword()));
        System.out.println("Password encoded: " + user.getPassword());
        return userDetailsService.registerUser(user);
    }

    //Update user with new password
    @PutMapping("/update/password")
    public ResponseEntity<String> updateUser(@RequestBody CustomUser user) {
        //Cripto la password
        user.setPassword((new BCryptPasswordEncoder()).encode(user.getPassword()));
        //Debug
        System.out.println("Password encoded: " + user.getPassword());
        return userDetailsService.updateUser(user);
    }
    @DeleteMapping("/delete/{username}")
    public ResponseEntity<String> deleteUser(@PathVariable String username) {
        return userDetailsService.deleteUser(username);
    }
}
