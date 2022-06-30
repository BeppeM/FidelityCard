package com.stage.authenticationservice.util;


import java.io.Serializable;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

import com.stage.authenticationservice.model.CustomUser;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.crypto.SecretKey;

//Utilities for Jwt token
@Component
public class JwtTokenUtil implements Serializable {

    private static final long serialVersionUID = -2550185165626007488L;

    public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;
    //Secret key
    @Value("${jwt.secret}")
    private String secret;

    //retrieve username from jwt token
    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    //retrieve expiration date from jwt token
    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }
    //For retrieveing any information from token we will need the secret key
    private Claims getAllClaimsFromToken(String token) throws JwtException{
        Claims body = Jwts.parserBuilder()
            .setSigningKey(getSigningKey())
            .build()
            .parseClaimsJws(token).getBody();
//        System.out.println("Claims boss: " + body);
        return body;
    }

    //check if the token has expired
    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    //generate access token for user
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        final String authorities = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        //Adding the roles/authorities
        claims.put("AUTHORITIES_KEY", authorities);
        return createToken(claims, userDetails.getUsername(), 100);
    }
    //generate refresh token
    public String generateRefreshToken(UserDetails userDetails){
        Map<String, Object> claims = new HashMap<>();
        //Adding the roles/authorities
        return createToken(claims, userDetails.getUsername(), 1000);
    }

    //Create the token
    //time parameter is used for access/refresh token type
    private String createToken(Map<String, Object> claims, String username, int time) {
        return Jwts.builder()
                //Setting the properties/claims of the JWT
                .setClaims(claims)
                //Setting the person who has authenticated
                .setSubject(username)
                //Current date
                .setIssuedAt(new Date(System.currentTimeMillis()))
                //Expiration date
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * time))
                //Add verifying signature with the algorithm and the secret key
                .signWith(getSigningKey())
                //Compact/Package everything
                .compact();
    }


//Used if the secret key is Base64 encoded
//    private Key getSigningKey() {
//        byte[] keyBytes = Decoders.BASE64.decode(this.secret);
//        return Keys.hmacShaKeyFor(keyBytes);
//    }

    private Key getSigningKey() {
        byte[] keyBytes = this.secret.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    //validate token
    //Check if username of the token is = to the username of userDetails
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}