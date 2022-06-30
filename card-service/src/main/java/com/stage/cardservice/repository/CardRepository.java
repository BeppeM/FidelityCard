package com.stage.cardservice.repository;

import com.stage.cardservice.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface CardRepository extends JpaRepository<Card, Long> {
    List<Card> getCardsByCustomerUsername(String customerUsername);

    List<Card> getCardsByCatalogNameAndManager(String catalogName, String manager);

    List<Card> getAllBySubscriptionDateBetween(LocalDate starDate, LocalDate currentDate);

    List<Card> getCardsByManager(String manager);

    Card getCardByCatalogNameAndManagerAndCustomerUsername(String catalogName, String manager, String customerUsername);

}
