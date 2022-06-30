package com.stage.cardservice.service;

import com.stage.cardservice.model.Card;
import com.stage.cardservice.repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Service
public class CardService {
    private final CardRepository cardRepository;

    @Autowired
    public CardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    public ResponseEntity<Card> createCard(Card card){
        List<Card> cards = getCardsByUsername(card.getCustomerUsername()).getBody();
        boolean check = cards.stream()
                .filter(card1 -> card1.getManager().equals(card.getManager()))
                .filter(card1 -> card1.getCatalogName().equals(card.getCatalogName()))
                .count() == 0;
        if (!check)
            return ResponseEntity.badRequest().body(card);
        cardRepository.save(card);
        return ResponseEntity.ok(cardRepository.getCardByCatalogNameAndManagerAndCustomerUsername(card.getCatalogName(),
                card.getManager(), card.getCustomerUsername()));
    }

    public ResponseEntity<Object> getCard(Long id){
        Optional<Card> card = cardRepository.findById(id);
        return card.<ResponseEntity<Object>>map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.badRequest().body("Card Not Found"));
    }

    public ResponseEntity<List<Card>> getCardsByUsername(String username){
        return ResponseEntity.ok(cardRepository.getCardsByCustomerUsername(username));
    }

    public ResponseEntity<List<Card>> getCatalogCards(String catalog, String manager){
        return ResponseEntity.ok(cardRepository.getCardsByCatalogNameAndManager(catalog, manager));
    }

    public ResponseEntity<String> deleteCard(Long id){
        cardRepository.deleteById(id);
        return ResponseEntity.ok("card deleted");
    }

    @Transactional
    public ResponseEntity<String> updateCardPoints(Long id, int points){
        Optional<Card> card = cardRepository.findById(id);
        if (card.isEmpty() || card.get().getExpirationDate().isBefore(LocalDate.now()))
            return ResponseEntity.badRequest().body("card with id " + id + " does not exist or is expired");
        card.get().setCurrentPoints(card.get().getCurrentPoints() + points);
        if (points > 0)
            card.get().setEarnedPoints(card.get().getEarnedPoints() + points);
        return ResponseEntity.ok("card updated");
    }

    public int getNumOfSubscriptionInTheLastPeriod(long period, String manager, String type){
        LocalDate currentDate = LocalDate.now();
        LocalDate startDate = currentDate.minusMonths(period);
        return (int) cardRepository.getAllBySubscriptionDateBetween(startDate, currentDate)
                .stream()
                .filter(card -> card.getManager().equals(manager))
                .filter(card -> card.getCatalogName().equals(type))
                .count();
    }

    public ResponseEntity<Boolean> isEnoughPoints(Long cardID, int points){
        Optional<Card> card = cardRepository.findById(cardID);
        if (card.isEmpty() || card.get().getCurrentPoints() < points){
            return ResponseEntity.ok(Boolean.FALSE);
        }
        return ResponseEntity.ok(Boolean.TRUE);
    }

    public ResponseEntity<List<Card>> getManagerCards(String manager) {
        return ResponseEntity.ok(cardRepository.getCardsByManager(manager));
    }

    public HashMap<String,List<HashMap<String, String>>> getAverageSubscriptionForTheLastMonths(long period, String manager) {
        LocalDate startDate;
        List<Card> cards = cardRepository.getCardsByManager(manager);
        List<String> catalogs = cards
                .stream()
                .map(Card::getCatalogName)
                .collect(Collectors.toList());
        catalogs = catalogs.stream().distinct().collect(Collectors.toList());
        HashMap<String,List<HashMap<String, String>>> results = new HashMap<>();
        for (int i=(int)period; i>=0; i--) {
            startDate = LocalDate.now().minusMonths(i).withDayOfMonth(1);
            LocalDate endOfMonth = LocalDate.now().minusMonths(i).withDayOfMonth(startDate.lengthOfMonth());
            List<Card> sortedCards = cardRepository.getAllBySubscriptionDateBetween(startDate, endOfMonth);
            System.out.println(sortedCards);
            for (String catalog: catalogs){
                Long numOfSubs = sortedCards
                        .stream()
                        .filter(card -> card.getCatalogName().equals(catalog))
                        .count();
                System.out.println(numOfSubs);
                if (!results.containsKey(catalog)) {
                    results.put(catalog, new ArrayList<>());
                }
                LocalDate finalStartDate = startDate;
                results.get(catalog).add(new HashMap<>(){{
                    put("numOfSubs", numOfSubs.toString());
                    put("Date", finalStartDate.getYear() + " " + finalStartDate.getMonth().toString());
                }});
            }
        }
        return results;
    }

    public ResponseEntity<List<Long>> getCardsID(String user) {
        return ResponseEntity.ok(cardRepository
                .getCardsByCustomerUsername(user)
                .stream()
                .map(Card::getId)
                .collect(Collectors.toList()));
    }
}
