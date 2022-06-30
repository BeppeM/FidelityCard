package com.stage.redeemservice.model;

import java.io.Serializable;
import java.util.Objects;


public class RedeemLogID implements Serializable {

    private Long cardID;
    private Long rewardID;

    public RedeemLogID(Long cardID, Long rewardID) {
        this.cardID = cardID;
        this.rewardID = rewardID;
    }

    public RedeemLogID() {
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

    @Override
    public int hashCode() {
        return Objects.hash(rewardID, cardID);
    }

    @Override
    public boolean equals(Object o) {
        if ( this == o ) {
            return true;
        }
        if ( o == null || getClass() != o.getClass() ) {
            return false;
        }
        RedeemLogID redeemLogID = (RedeemLogID) o;
        return Objects.equals( rewardID, redeemLogID.rewardID ) &&
                Objects.equals( cardID, redeemLogID.cardID );
    }
}
