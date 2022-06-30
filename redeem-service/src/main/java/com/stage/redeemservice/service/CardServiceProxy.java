package com.stage.redeemservice.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "card-service")
public interface CardServiceProxy {

    @RequestMapping("/api/card/get/isEnoughPoints/{id}/{points}")
    ResponseEntity<Boolean> isEnoughPoints(@RequestHeader String username, @RequestHeader String password,
                                           @RequestHeader String role, @PathVariable Long id, @PathVariable int points);

    @PutMapping("/api/card/redeemDetraction/{id}")
    ResponseEntity<String> updatePoints(@RequestHeader String username, @RequestHeader String password,
                                        @RequestHeader String role,@PathVariable Long id, @RequestParam int points);

    @GetMapping("/api/card/get/all/id/{user}")
    ResponseEntity<List<Long>> getCardsId(@RequestHeader String username, @RequestHeader String password,
                                           @RequestHeader String role, @PathVariable String user);

}
