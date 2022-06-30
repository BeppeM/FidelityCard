package com.stage.authenticationservice.model;


import lombok.Getter;

import java.io.Serializable;

//Response of the Controller when user authenticates
@Getter
public class JwtResponse implements Serializable {

    private static final long serialVersionUID = -8091879091924046844L;
    //Token to return
    private final String access;
    private final String refresh;

    public JwtResponse(String access, String refresh) {
        this.access = access;
        this.refresh = refresh;
    }
}