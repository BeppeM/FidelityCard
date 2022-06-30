package com.stage.redeemservice.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@FeignClient(name = "catalog-service")
public interface CatalogServiceProxy {

    @RequestMapping("/api/catalog/reward/get/isRedeemable/{id}")
    ResponseEntity<Boolean> isAvailable(@RequestHeader String username, @RequestHeader String password,
                                        @RequestHeader String role, @PathVariable Long id);

    @PutMapping("/api/catalog/reward/redeemed/{id}")
    ResponseEntity<String> updateQuantity(@RequestHeader String username, @RequestHeader String password,
                                          @RequestHeader String role,@PathVariable Long id);

    @GetMapping("/api/catalog/reward/get/info/{id}")
    List<HashMap<String, String>> getRewardInfo(@RequestHeader String username, @RequestHeader String password,
                                               @RequestHeader String role, @PathVariable Long id);
}
