package com.stage.managerservice.service;

import com.stage.managerservice.model.Manager;
import com.stage.managerservice.repository.ManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ManagerService {
    @Autowired
    private ManagerRepository managerRepository;

    //CRUD methods

//Create new manager
    public ResponseEntity<String> createManager(Manager manager) {
        //Check if manager exists
        if(managerRepository.findByUsername(manager.getUsername()).isEmpty() && managerRepository.findById(manager.getPiva()).isEmpty()
                && managerRepository.findByEmail(manager.getEmail()).isEmpty() && managerRepository.findByPhone(manager.getPhone()).isEmpty()){
            managerRepository.save(manager);
            return ResponseEntity.ok("Manager " + manager.getUsername() + " created!");
        }
        return ResponseEntity.badRequest().body("Error");
    }
//Get manager by username
    public ResponseEntity<Manager> getManager(String username) {
        Manager manager= managerRepository.findByUsername(username).get();
        return ResponseEntity.ok(manager);
    }
//Get all managers
    public List<Manager> getAllManagers() {
        ArrayList<Manager> list = (ArrayList<Manager>) managerRepository.findAll();
        return list;
    }
//Delete manager by username
    public String deleteByUsername(String username){
        ArrayList<Manager> list= (ArrayList<Manager>) managerRepository.deleteByUsername(username);
        if(!list.isEmpty()){
            return "Manager " + username + " deleted";
        }
        return "Manager " + username + "not deleted";
    }
//Update manager
    public String updateManager(Manager manager) {
        managerRepository.save(manager);
        return "Manager " + manager.getUsername() + " updated";
    }
}
