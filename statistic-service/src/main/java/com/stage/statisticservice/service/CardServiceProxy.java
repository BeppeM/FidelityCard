package com.stage.statisticservice.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;

@FeignClient(name = "card-service")
public interface CardServiceProxy {
    @RequestMapping(path = "/api/card/get/card_points/{manager}/{catalog}")
    List<Integer> getCardPointsByCardType(@RequestHeader String username, @RequestHeader String password,
                                          @RequestHeader String role,@PathVariable String manager,
                                          @PathVariable String catalog);

    @RequestMapping(path = "/api/card/get/card_points/{manager}")
    HashMap<String, List<Integer>> getCardPointsByManager(@RequestHeader String username, @RequestHeader String password,
                                          @RequestHeader String role,@PathVariable String manager);

    // @RequestHeader String username, @RequestHeader String password, @RequestHeader String role,

    @RequestMapping(path = "/api/card/get/date_points_info/{id}")
    HashMap<LocalDate, Integer> getInsDateAndPoints(@RequestHeader String username, @RequestHeader String password,
                                                    @RequestHeader String role,@PathVariable Long id);

    @GetMapping("/api/card/get/numberOfSubscription/{period}/{manager}/{type}")
    int getNumOfSubscriptionInTheLastPeriod(@RequestHeader String username, @RequestHeader String password,
                                           @RequestHeader String role,@PathVariable long period,
                                            @PathVariable String manager, @PathVariable String type);

    @GetMapping("/api/card/get/top/{manager}")
    List<HashMap<String, String>> getTopCatalogs(@RequestHeader String username,@RequestHeader String password,
                                                 @RequestHeader String role,@PathVariable String manager);

    @RequestMapping(path = "/api/card/get/card_points_info/{user}")
    List<HashMap<String, String>> getInsDateAndPoints(@RequestHeader String username, @RequestHeader String password,
                                                    @RequestHeader String role,@PathVariable String user);
    @GetMapping("/api/card/get/numberOfSubscription/{period}/{manager}")
    HashMap<String,List<HashMap<String, String>>> getAverageSubscriptionForTheLastMonths(@RequestHeader String username, @RequestHeader String password,
                                                             @RequestHeader String role,@PathVariable long period,
                                                             @PathVariable String manager);
}
