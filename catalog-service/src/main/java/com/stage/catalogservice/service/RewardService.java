package com.stage.catalogservice.service;

import com.stage.catalogservice.model.Reward;
import com.stage.catalogservice.repository.RewardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class RewardService {
    private final RewardRepository rewardRepository;

    @Autowired
    public RewardService(RewardRepository rewardRepository) {
        this.rewardRepository = rewardRepository;
    }

    public ResponseEntity<Reward> createReward(Reward reward){
        List<Reward> rewards = rewardRepository.getRewardsByManagerNameAndCatalogTypeName(reward.getManagerName(), reward.getCatalogTypeName());
        boolean check = rewards.stream()
                .filter(rewardSample -> rewardSample.getRewardName().equals(reward.getRewardName()))
                .count() == 0;
        if (!check)
            return ResponseEntity.badRequest().body(reward);
        rewardRepository.save(reward);
        return ResponseEntity.ok(rewardRepository.getRewardByCatalogTypeNameAndManagerNameAndRewardName(
                reward.getCatalogTypeName(), reward.getManagerName(), reward.getRewardName()));
    }

    @Transactional
    public ResponseEntity<String> updateQuantity(Long rewardID, int quantity){
        Optional<Reward> reward = rewardRepository.findById(rewardID);
        if (reward.isEmpty())
            return ResponseEntity.badRequest().body("reward with id " + rewardID + " does not exist");
        reward.get().setCurrentQuantity(reward.get().getCurrentQuantity() + quantity);
        if (quantity > 0)
            reward.get().setQuantityOnRestock(reward.get().getQuantityOnRestock() + quantity);
        return ResponseEntity.ok("Reward quantity updated");
    }
    @Transactional
    public ResponseEntity<String> updateDescription(Long rewardID, String description){
        Optional<Reward> reward = rewardRepository.findById(rewardID);
        if (reward.isEmpty())
            return ResponseEntity.badRequest().body("reward with id " + rewardID + " does not exist");
        reward.get().setDescription(description);
        return ResponseEntity.ok("Reward description updated");
    }

    public ResponseEntity<String> deleteReward(Long rewardID){
        rewardRepository.deleteById(rewardID);
        return ResponseEntity.ok("reward" + rewardID + " deleted");
    }

    public ResponseEntity<Object> getReward(Long rewardID){
        Optional<Reward> reward = rewardRepository.findById(rewardID);
        return reward.<ResponseEntity<Object>>map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.badRequest().body("reward with id " + rewardID + " does not exist"));
    }

  public ResponseEntity<List<Reward>> getRewardsByManagerAndType(String manager, String type){
      List<Reward> rewards = rewardRepository.getRewardsByManagerNameAndCatalogTypeName(manager, type);
      return ResponseEntity.ok(rewards);
  }

  public ResponseEntity<Boolean> isAvailable(Long id){
        Optional<Reward> reward = rewardRepository.findById(id);
        return reward.isPresent() && reward.get().getCurrentQuantity() > 0 ? ResponseEntity.ok(Boolean.TRUE) : ResponseEntity.ok(Boolean.FALSE);
  }

    public ResponseEntity<List<Reward>> getTopRewards(String manager) {
        return ResponseEntity.ok(rewardRepository.getRewardsByManagerName(manager));
    }
}
