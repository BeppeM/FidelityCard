package com.stage.redeemservice.service;

import com.stage.redeemservice.repository.RedeemRepository;
import com.stage.redeemservice.model.RedeemLog;
import com.stage.redeemservice.model.RedeemLogID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RedeemService {
    private final RedeemRepository redeemRepository;

    @Autowired
    public RedeemService(RedeemRepository redeemRepository) {
        this.redeemRepository = redeemRepository;
    }
    public ResponseEntity<List<RedeemLog>> getRedeemHistory(Long cardID) {
        List<RedeemLog> redeemLogs = redeemRepository.getAllByCardID(cardID);
        return ResponseEntity.ok(redeemLogs);
    }

    public ResponseEntity<String> redeemReward(RedeemLog redeemLog) {
        RedeemLogID redeemLogID = new RedeemLogID(redeemLog.getCardID(), redeemLog.getRewardID());
        if(redeemRepository.findById(redeemLogID).isPresent())
            return ResponseEntity.badRequest().body("redeemLog " + redeemLog.getRewardID()+ " " + redeemLog.getCardID()  + " error");
        else
            redeemRepository.save(redeemLog);
        return ResponseEntity.ok("redeemLog " + redeemLog.getRewardID()+ " " + redeemLog.getCardID() + " created!");
    }
}
