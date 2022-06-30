package com.stage.statisticservice.controller;

import com.stage.statisticservice.service.CardServiceProxy;
import com.stage.statisticservice.service.CatalogServiceProxy;
import org.apache.catalina.LifecycleState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.OptionalDouble;

@RestController
@RequestMapping(path = "/api/statistic")
public class StatisticController {

    private final CardServiceProxy cardServiceProxy;
    private final CatalogServiceProxy catalogServiceProxy;

    @Autowired
    public StatisticController(CardServiceProxy cardServiceProxy, CatalogServiceProxy catalogServiceProxy) {
        this.cardServiceProxy = cardServiceProxy;
        this.catalogServiceProxy = catalogServiceProxy;
    }
    //hasRole manager
    // Media dei punti di tutte le carte di un catalogo
    @GetMapping("/avgPoints/{manager}/{catalog}")
    public double getAverageCustomerPoints(@RequestHeader String username, @RequestHeader String password,
                                           @RequestHeader String role, @PathVariable String manager,
                                           @PathVariable String catalog){
        OptionalDouble avg = cardServiceProxy.getCardPointsByCardType(username, password, role, manager,catalog)
                .stream()
                .mapToDouble(a -> a)
                .average();
        return avg.isPresent() ? avg.getAsDouble() : 0;
    }
    
    //hasRole manager
    // Media dei punti di tutte le carte di un manager
    @GetMapping("/avgPoints/{manager}")
    public HashMap<String, Double> getAverageCustomerPoints(@RequestHeader String username, @RequestHeader String password,
                                           @RequestHeader String role, @PathVariable String manager){
        HashMap<String, List<Integer>> pointsInCatalogs = cardServiceProxy.getCardPointsByManager(username, password, role, manager);
        HashMap<String, Double> result = new HashMap<>();
        OptionalDouble avg;
        for (Map.Entry<String, List<Integer>> entry: pointsInCatalogs.entrySet()){
            avg = entry
                    .getValue()
                    .stream()
                    .mapToDouble(a -> a)
                    .average();
            result.put(entry.getKey(), avg.isPresent() ? avg.getAsDouble() : 0);
        }
        return result;
    }
    //permitAll
    //media dei punti di una carta
    @GetMapping("/get/avgPoints/{id}")
    public long getAverageCustomerPoints(@RequestHeader String username, @RequestHeader String password,
                                             @RequestHeader String role,@PathVariable Long id){
        HashMap<LocalDate, Integer> infTuple = cardServiceProxy.getInsDateAndPoints(username, password, role,id);
        LocalDate localDate = LocalDate.now();
        LocalDate subDate = infTuple
                .keySet()
                .stream()
                .findFirst()
                .get();
        long time = Duration.between(subDate.atStartOfDay(), localDate.atStartOfDay()).toDays();
        return infTuple
                .values()
                .stream()
                .findFirst()
                .get()/time;
    }

    //Customer
    //punti di n carte di un customer (Data di iscrizione)
    //List<HashMap<String, String>>
    @GetMapping("/get/avgPointsByUser/{user}")
    public List<HashMap<String, String>> getAverageCustomerCardsPoints(@RequestHeader String username, @RequestHeader String password,
                                         @RequestHeader String role,@PathVariable String user){
        return cardServiceProxy.getInsDateAndPoints(username, password, role, user);
    }

    //Manager
    //Classifica premi per catalogo (Top 10)
     @GetMapping("/get/topReward/{manager}")
     public List<HashMap<String, String>> getTopReward(@RequestHeader String username, @RequestHeader String password,
                                                @RequestHeader String role,  @PathVariable String manager){
        List<HashMap<String, String>> rewards = catalogServiceProxy.getTopRewards(username, password, role, manager);
        return rewards.size()<=10 ? rewards : rewards.subList(0,10);
     }

    //Manager
    //Classifica cataloghi per subs (Top 10)
    @GetMapping("/get/topCatalogs/{manager}")
    public List<HashMap<String, String>> getTopCatalogs(@RequestHeader String username, @RequestHeader String password,
                                                      @RequestHeader String role,  @PathVariable String manager){
        List<HashMap<String, String>> catalogs = cardServiceProxy.getTopCatalogs(username, password, role, manager);
        return catalogs.size()<=10 ? catalogs : catalogs.subList(0,10);
    }

    //Manager
    //Media iscrizioni per periodo
    @GetMapping("/get/avgSubs/{period}/{manager}/{type}")
    public long getAverageSubscriptionByPeriod(@RequestHeader String username, @RequestHeader String password,
                                               @RequestHeader String role,@PathVariable long period,
                                               @PathVariable String manager, @PathVariable String type){
        return cardServiceProxy.getNumOfSubscriptionInTheLastPeriod(username, password, role,period, manager, type)/period;
    }

    //Manager
    // iscrizioni per mesi (periodo passato)
    @GetMapping("/get/avgSubsByMonths/{period}/{manager}")
    public HashMap<String,List<HashMap<String, String>>> getAverageSubscriptionForTheLastMonths(@RequestHeader String username, @RequestHeader String password,
                                               @RequestHeader String role,@PathVariable long period,
                                               @PathVariable String manager) {
        return cardServiceProxy.getAverageSubscriptionForTheLastMonths(username, password, role, period, manager);
    }
}