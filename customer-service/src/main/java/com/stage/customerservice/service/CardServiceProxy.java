package com.stage.customerservice.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@FeignClient(name = "card-service")
public interface CardServiceProxy {
    @RequestMapping(path = "/api/card/delete/all/{username}")
    ResponseEntity<String> deleteCards(@PathVariable String username);
}
