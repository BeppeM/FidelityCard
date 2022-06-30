package com.stage.managerservice.repository;

import com.stage.managerservice.model.Manager;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ManagerRepository extends JpaRepository<Manager, String> {
    //Find manager by username
    Optional<Manager> findByUsername(String username);
    Optional<Manager> findByEmail(String email);
//Get all the managers

    Optional<Manager> findByPhone(String phone);
    List<Manager> findAll();
//Delete manager by username
    List<Manager> deleteByUsername(String username);
}
