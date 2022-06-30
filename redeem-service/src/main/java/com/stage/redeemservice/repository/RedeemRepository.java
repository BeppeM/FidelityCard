package com.stage.redeemservice.repository;

import com.stage.redeemservice.model.RedeemLog;
import com.stage.redeemservice.model.RedeemLogID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RedeemRepository extends JpaRepository<RedeemLog, RedeemLogID> {
    List<RedeemLog> getAllByCardID(Long cardID);
}
