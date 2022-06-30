package com.stage.redeemservice.controller;

import com.stage.redeemservice.model.RedeemLog;
import com.stage.redeemservice.service.CardServiceProxy;
import com.stage.redeemservice.service.CatalogServiceProxy;
import com.stage.redeemservice.service.RedeemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/redeem")
public class RedeemController {
    private final RedeemService redeemService;
    private final CardServiceProxy cardServiceProxy;
    private final CatalogServiceProxy catalogServiceProxy;

    @Autowired
    public RedeemController(RedeemService redeemService, CardServiceProxy cardServiceProxy, CatalogServiceProxy catalogServiceProxy) {
        this.redeemService = redeemService;
        this.cardServiceProxy = cardServiceProxy;
        this.catalogServiceProxy = catalogServiceProxy;
    }

    //Customer
    //Lo storico
    @GetMapping("/get/all/{user}")
    public List<HashMap<String, String>> getRedeemHistory(@RequestHeader String username, @RequestHeader String password,
                                                            @RequestHeader String role,@PathVariable String user){
        ResponseEntity<List<Long>> cardsID = cardServiceProxy.getCardsId(username, password, role, user);
        if (cardsID.getStatusCode().is4xxClientError())
            throw new HttpClientErrorException(HttpStatus.BAD_REQUEST,"Error");
        List<HashMap<String, String>> result = new ArrayList<>();
        List<RedeemLog> rewards = new ArrayList<>();
        for (Long cardID: cardsID.getBody()) {
            ResponseEntity<List<RedeemLog>> response = redeemService.getRedeemHistory(cardID);
            if (response.getStatusCode().is4xxClientError())
                throw new HttpClientErrorException(HttpStatus.BAD_REQUEST,"Error");
            if (!response.getBody().isEmpty())
                rewards.addAll(new ArrayList<>(response.getBody()));
        }
        rewards = rewards
                .stream()
                .sorted((Comparator.comparing(RedeemLog::getRedeemDate).reversed()))
                .collect(Collectors.toList());
        System.out.println(rewards.stream().map(RedeemLog::getRewardID).collect(Collectors.toList()));
        for (RedeemLog reward : rewards) {
            List<HashMap<String, String>> infos = catalogServiceProxy.getRewardInfo(username, password, role, reward.getRewardID());
            if (!infos.isEmpty()){
                HashMap<String, String> info = infos.stream().findFirst().get();
                result.add(new HashMap<>(){{
                    put("Name", info.get("Name"));
                    put("Redeem_Date", reward.getRedeemDate().toString());
                    put("Points_Spent", String.valueOf(reward.getRequestedPoints()));
                    put("Catalog", info.get("Catalog"));
                    put("Manager", info.get("Manager"));
                }});
            }
        }
        return result;
    }

    @PostMapping("/perform")
    public ResponseEntity<String> redeemReward(@RequestHeader String username, @RequestHeader String password,
                                               @RequestHeader String role,@RequestBody RedeemLog redeemLog){
        Boolean isEnoughPoints = cardServiceProxy.isEnoughPoints(username, password, role,redeemLog.getCardID(), redeemLog.getRequestedPoints()).getBody();
        Boolean isAvailable = catalogServiceProxy.isAvailable(username, password, role,redeemLog.getRewardID()).getBody();
        ResponseEntity<String> response;
        if (isEnoughPoints && isAvailable) {
            response = redeemService.redeemReward(redeemLog);
            if (!response.getStatusCode().is4xxClientError()){
                cardServiceProxy.updatePoints(username, password, role, redeemLog.getCardID(), redeemLog.getRequestedPoints());
                catalogServiceProxy.updateQuantity(username, password, role, redeemLog.getRewardID());
            }
        }
        else
            response = ResponseEntity.badRequest().body("Error");
        return response;
    }

}
