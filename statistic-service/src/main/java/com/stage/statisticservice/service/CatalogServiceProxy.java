package com.stage.statisticservice.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.HashMap;
import java.util.List;

@FeignClient(name = "catalog-service")
public interface CatalogServiceProxy {
    @GetMapping("/api/catalog/reward/get/all/{manager}")
    List<HashMap<String, String>> getTopRewards(@RequestHeader String username, @RequestHeader String password,
                                                @RequestHeader String role, @PathVariable String manager);
}
