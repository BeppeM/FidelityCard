package com.stage.managerservice.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "manager")
@Getter @Setter @NoArgsConstructor
public class Manager {
    @Id
    @Column(name = "piva")
    private String piva;
    @Column(name = "username")
    private String username;
    @Column(name = "email")
    private String email;
    @Column(name = "phone")
    private String phone;
    @Column(name = "socialreason")
    private String socialReason;
    @Column(name = "businessname")
    private String businessName;
    @Column(name = "city")
    private String city;
    @Column(name = "address")
    private String address;
    @Column(name = "housenumber")
    private String houseNumber;
    public Manager(String username, String email){
        this.username=username;
        this.email=email;
    }
}
