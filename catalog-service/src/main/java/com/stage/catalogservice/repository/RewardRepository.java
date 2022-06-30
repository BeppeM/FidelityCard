package com.stage.catalogservice.repository;

import com.stage.catalogservice.model.Reward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RewardRepository extends JpaRepository<Reward, Long> {
    List<Reward> getRewardsByManagerNameAndCatalogTypeName(String manager, String type);

    List<Reward> getRewardsByManagerName(String manager);

    Reward getRewardByCatalogTypeNameAndManagerNameAndRewardName(String catalogType, String managerName, String rewardName);
}
