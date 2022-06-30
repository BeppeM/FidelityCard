package com.stage.managerservice.controller;

import com.stage.managerservice.model.Manager;
import com.stage.managerservice.service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/manager")
public class ManagerController {
    @Autowired
    private ManagerService managerService;
    @Value(value = "${message:NoProp default}")
    private String config;

    @GetMapping("/config")
    public String getConfig(){
        return "Configurations from the config file: " + config;
    }

    //CRUD methods
    @PostMapping("/create")
    public ResponseEntity<String> createManager(@RequestBody Manager manager){
        return managerService.createManager(manager);
    }

    @GetMapping("/get/{username}")
    public ResponseEntity<Manager> getManager(@PathVariable String username){
        return managerService.getManager(username);
    }

    @GetMapping("/get/all")
    public List<Manager> getAllManagers(){
        return managerService.getAllManagers();
    }

    @DeleteMapping("/delete/{username}")
    public String deleteManager(@PathVariable String username){
        return managerService.deleteByUsername(username);
    }

    @PutMapping("/update")
    public String updateManager(@RequestBody Manager manager){
        return managerService.updateManager(manager);
    }
}
