package com.stage.catalogservice.controller;

import com.stage.catalogservice.model.Reward;
import com.stage.catalogservice.service.RewardService;
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
@RequestMapping("/api/catalog/reward")
public class RewardController {
    private final RewardService rewardService;

    @Autowired
    public RewardController(RewardService rewardService) {
        this.rewardService = rewardService;
    }
    @GetMapping("/get/{id}")
    public ResponseEntity<Object> getReward(@PathVariable Long id){
        return rewardService.getReward(id);
    }
    //Create new reward
    @PostMapping("/create")
    public ResponseEntity<Reward> createReward(@RequestBody Reward reward){
        return rewardService.createReward(reward);
    }
    //Update the quantity of a reward
    @PutMapping("/update/quantity/{id}")
    public ResponseEntity<String> updateQuantity(@PathVariable Long id, @RequestParam int quantity){
        return rewardService.updateQuantity(id, quantity);
    }

    //Decrement the quantity of a reward redeemed
    @PutMapping("/redeemed/{id}")
    public ResponseEntity<String> updateQuantity(@PathVariable Long id){
        return rewardService.updateQuantity(id, -1);
    }

    //Update the description of a reward
    @PutMapping("/update/description/{id}")
    public ResponseEntity<String> updateDescription(@PathVariable Long id, @RequestParam String description){
        return rewardService.updateDescription(id, description);
    }

    //Delete of a reward
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteReward(@PathVariable Long id){
        return rewardService.deleteReward(id);
    }

    //Get reward
    @GetMapping("/get/{manager}/{type}")
    public ResponseEntity<List<Reward>> getRewardsByManagerAndType(@PathVariable String manager,@PathVariable String type){
        return rewardService.getRewardsByManagerAndType(manager, type);
    }

    @GetMapping("/get/isRedeemable/{id}")
    public ResponseEntity<Boolean> isAvailable(@PathVariable Long id){
        return rewardService.isAvailable(id);
    }

    @GetMapping("/get/all/{manager}")
    public List<HashMap<String, String>> getTopRewards(@PathVariable String manager){
        List<Reward> rewards =  rewardService.getTopRewards(manager).getBody();
        List<HashMap<String, String>> results = new ArrayList<>();
        if (rewards == null)
            throw new HttpClientErrorException(HttpStatus.BAD_REQUEST,"No rewards");
        rewards = rewards
                .stream()
                .sorted(Comparator.comparingInt(Reward::getQuantityRedeemed).reversed())
                .collect(Collectors.toList());
        for(Reward reward: rewards){
            results.add(new HashMap<>(){{
                put("Quantity", String.valueOf(reward.getQuantityRedeemed()));
                put("Catalog", reward.getCatalogTypeName());
                put("Name", reward.getRewardName());
            }});
        }
        return results;
    }

    @GetMapping("/get/info/{id}")
    List<HashMap<String, String>> getRewardInfo(@PathVariable Long id){
        Reward reward = (Reward) rewardService.getReward(id).getBody();
        List<HashMap<String, String>> info = new ArrayList<>();
        info.add(new HashMap<>(){{
            put("Name", reward.getRewardName());
            put("Catalog", reward.getCatalogTypeName());
            put("Manager", reward.getManagerName());
        }});
        return info;
    }
}
