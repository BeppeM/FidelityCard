package com.stage.authenticationservice.model;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
//Request sent to the controller
@Getter @Setter @NoArgsConstructor
public class JwtRequest implements Serializable {

    private static final long serialVersionUID = 5926468583005150707L;
//User wants to authenticate himself with username and password
    private String username;
    private String password;

    public JwtRequest(String username, String password) {
        this.username=username;
        this.password=password;
    }
}
