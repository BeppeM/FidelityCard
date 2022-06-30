package com.stage.redeemservice.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity(name = "redeemlog")
@Table(name = "redeemlog")
@IdClass(RedeemLogID.class)
public class RedeemLog {

    @Column(name = "redeemdate")
    private LocalDate redeemDate;
    @Column(name = "requestedpoints")
    private int requestedPoints;

    @Id
    @Column(name = "cardid")
    private Long cardID;

    @Id
    @Column(name = "rewardid")
    private Long rewardID;

    public RedeemLog() {
    }

    public RedeemLog(LocalDate redeemDate, int requestedPoints, Long cardID, Long rewardID) {
        this.redeemDate = redeemDate;
        this.requestedPoints = requestedPoints;
        this.cardID = cardID;
        this.rewardID = rewardID;
    }

    public Long getCardID() {
        return cardID;
    }

    public void setCardID(Long cardID) {
        this.cardID = cardID;
    }

    public Long getRewardID() {
        return rewardID;
    }

    public void setRewardID(Long rewardID) {
        this.rewardID = rewardID;
    }

    public LocalDate getRedeemDate() {
        return redeemDate;
    }

    public void setRedeemDate(LocalDate redeemDate) {
        this.redeemDate = redeemDate;
    }

    public int getRequestedPoints() {
        return requestedPoints;
    }

    public void setRequestedPoints(int requestedPoints) {
        this.requestedPoints = requestedPoints;
    }
}
