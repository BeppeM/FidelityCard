package com.stage.customerservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.stage.customerservice.repository.CustomerRepository;
import com.stage.customerservice.model.Customer;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {
    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public ResponseEntity<String> createCustomer(Customer customer) {
        if(customerRepository.findById(customer.getUsername()).isPresent() || customerRepository.findCustomerByCf(customer.getCf()).isPresent()
                || customerRepository.findCustomerByEmail(customer.getEmail()).isPresent()
                || customerRepository.findCustomerByPhone(customer.getPhone()).isPresent())
            return ResponseEntity.badRequest().body("error ");
        else
            customerRepository.save(customer);
        return ResponseEntity.ok("Customer " + customer.getUsername() + " created!");
    }

    public ResponseEntity<Object> getCustomer(String username){
        Optional<Customer> customer = customerRepository.findById(username);
        return customer.<ResponseEntity<Object>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.badRequest()
                        .body("customer with username " + username + " does not exist"));
    }

    public ResponseEntity<String> deleteCustomer(String customerUsername){
        customerRepository.deleteById(customerUsername);
        return ResponseEntity.ok("customer deleted");
    }

    @Deprecated
    @Transactional
    public ResponseEntity<String> updateCustomer(String username, String address, String houseNumber, String city){
        Optional<Customer> customer = customerRepository.findById(username);
        if (customer.isEmpty())
            return ResponseEntity.badRequest().body("Customer " + username +  " does not exist");
        if (address != null)
            customer.get().setAddress(address);
        if(houseNumber!=null)
            customer.get().setHouseNumber(houseNumber);
        if(city!=null)
            customer.get().setCity(city);
        return ResponseEntity.ok("Customer Updated");
    }

    public ResponseEntity<String> updateCustomer(Customer customer){
        if(customerRepository.findById(customer.getUsername()).isEmpty())
            return ResponseEntity.badRequest().body("username " + customer.getUsername()  + " does not exist");
        else
            customerRepository.save(customer);
        return ResponseEntity.ok("Customer " + customer.getUsername() + " updated!");
    }

    public ResponseEntity<List<Customer>> getAllCustomers(){
        return ResponseEntity.ok(customerRepository.findAll());
    }
}
