package com.stage.customerservice.controller;

import com.stage.customerservice.service.CardServiceProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.stage.customerservice.model.Customer;
import com.stage.customerservice.service.CustomerService;

import java.util.List;

@RestController
@RequestMapping(path = "/api/customer")
public class CustomerController {
    private final CustomerService customerService;
    private final CardServiceProxy cardServiceProxy;

    @Autowired
    public CustomerController(CustomerService customerService, CardServiceProxy cardServiceProxy) {
        this.customerService = customerService;
        this.cardServiceProxy = cardServiceProxy;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createCustomer(@RequestBody Customer customer){
        return customerService.createCustomer(customer);
    }

    @GetMapping("/get/{username}")
    public ResponseEntity<Object> getCustomer(@PathVariable String username){
        return customerService.getCustomer(username);
    }

    @DeleteMapping("/delete/{customerUsername}")
    public ResponseEntity<String> deleteCustomer(@PathVariable String customerUsername){
        return customerService.deleteCustomer(customerUsername);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateCustomer(@RequestBody Customer customer){

        return customerService.updateCustomer(customer);
    }

    @GetMapping("/get/all")
    public ResponseEntity<List<Customer>> getAllCustomers(){
        return customerService.getAllCustomers();
    }
}
