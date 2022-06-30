package com.stage.customerservice.model;

import javax.persistence.*;

@Entity(name = "Customer")
@Table
public class Customer {
    @Column(
            name = "firstname"
    )
    private String firstName;
    @Column(
            name = "lastname"
    )
    private String lastName;
    @Column(
            name = "cf",
            unique = true
    )
    private String cf;
    @Id
    @Column(
            name = "username"
    )
    private String username;

    @Column(
            name = "city"
    )
    private String city;
    @Column(
            name = "address"
    )
    private String address;
    @Column(
            name = "housenumber"
    )
    private String houseNumber;
    @Column(
            name = "email"
    )
    private String email;
    @Column(
            name = "phone"
    )
    private String phone;


    public Customer(){}

    public Customer(String firstName, String lastName, String cf, String username, String city, String address,
                    String houseNumber, String email, String phone) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.cf = cf;
        this.username = username;
        this.address = address;
        this.city = city;
        this.houseNumber = houseNumber;
        this.phone = phone;
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getCf() {
        return cf;
    }

    public void setCf(String cf) {
        this.cf = cf;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAddress() {
        return address;
    }

    public String getHouseNumber() {
        return houseNumber;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }
}
