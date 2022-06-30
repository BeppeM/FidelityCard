package com.stage.catalogservice.model;

import javax.persistence.*;

@Entity(name = "reward")
@Table
//@IdClass(RewardID.class)
public class Reward{
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
 //   @Id
    @Column(name = "catalogtypename")
    private String catalogTypeName;
 //   @Id
    @Column(name = "managername")
    private String managerName;
    @Column(name = "rewardname")
    private String rewardName;
    @Column(name = "description")
    private String description;
    @Column(name = "redeempoints")
    private int redeemPoints;
    @Column(name = "quantityonrestock")
    private int quantityOnRestock;
    @Column(name = "currentquantity")
    private int currentQuantity;

    public Reward() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCatalogTypeName() {
        return catalogTypeName;
    }

    public void setCatalogTypeName(String catalogTypeName) {
        this.catalogTypeName = catalogTypeName;
    }

    public String getManagerName() {
        return managerName;
    }

    public void setManagerName(String managerName) {
        this.managerName = managerName;
    }

    public String getRewardName() {
        return rewardName;
    }

    public void setRewardName(String rewardName) {
        this.rewardName = rewardName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getRedeemPoints() {
        return redeemPoints;
    }

    public void setRedeemPoints(int redeemPoints) {
        this.redeemPoints = redeemPoints;
    }

    public int getQuantityOnRestock() {
        return quantityOnRestock;
    }

    public void setQuantityOnRestock(int quantityOnRestock) {
        this.quantityOnRestock = quantityOnRestock;
    }

    public int getCurrentQuantity() {
        return currentQuantity;
    }

    public void setCurrentQuantity(int currentQuantity) {
        this.currentQuantity = currentQuantity;
    }

    public int getQuantityRedeemed(){
        return quantityOnRestock-currentQuantity;
    }
}
