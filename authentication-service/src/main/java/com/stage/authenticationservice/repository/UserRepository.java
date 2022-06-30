package com.stage.authenticationservice.repository;

import com.stage.authenticationservice.model.CustomUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<CustomUser, String> {
    CustomUser findByUsername(String username);
}
