package com.stage.cardservice.controller;

import com.stage.cardservice.model.Card;
import com.stage.cardservice.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.time.Duration;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/card")
public class CardController {
    private final CardService cardService;

    @Autowired
    public CardController(CardService cardService) {
        this.cardService = cardService;
    }
    //Create new card
    @PostMapping("/create")
    public ResponseEntity<Card> createCard(@RequestBody Card card){
        return cardService.createCard(card);
    }
    //Delete card
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCard(@PathVariable  Long id){
        return cardService.deleteCard(id);
    }

    //Get card
    @GetMapping("/get/{id}")
    public ResponseEntity<Object> getCard(@PathVariable Long id){
        return cardService.getCard(id);
    }

    //Update the card
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateCardPoints(@RequestParam int points, @PathVariable Long id){
       return cardService.updateCardPoints(id, points);
    }

    //Decrease points
    @PutMapping("/redeemDetraction/{id}")
    public ResponseEntity<String> decreasePointsOnRedeem(@RequestParam int points, @PathVariable Long id){
        return cardService.updateCardPoints(id, -points);
    }

    //Get all Customer cards
    @GetMapping("/get/all/{customerUsername}")
    public ResponseEntity<List<Card>> getCustomerCards(@PathVariable String customerUsername){
        return cardService.getCardsByUsername(customerUsername);
    }

    //Get all the cards of a specific catalog
    @GetMapping("/get/catalog_cards/{manager}/{catalog}")
    public ResponseEntity<List<Card>> getCatalogCards(@PathVariable String manager,@PathVariable String catalog){
        return cardService.getCatalogCards(catalog, manager);
    }

    // Communication between microservice endpoints

    @GetMapping("/get/card_points/{manager}/{catalog}")
    public List<Integer> getCatalogCardsPoints(@PathVariable String manager,@PathVariable String catalog){
        List<Card> cards = cardService.getCatalogCards(catalog, manager).getBody();
        return cards.stream()
                .map(Card::getEarnedPoints)
                .collect(Collectors.toList());
    }

    //Get earned average points number in a certain time
    @GetMapping("get/date_points_info/{id}")
    public HashMap<LocalDate, Integer> getCatalogCardsPoints(@PathVariable Long id){
        ResponseEntity<Object> cardResponseEntity = cardService.getCard(id);
        if (cardResponseEntity.getStatusCode().is4xxClientError())
            throw new HttpClientErrorException(cardResponseEntity.getStatusCode(),(String) cardResponseEntity.getBody());
        Card card = (Card) cardResponseEntity.getBody();
        return new HashMap<>(){{
            put(card.getSubscriptionDate(), card.getEarnedPoints());
        }};
    }
    //Get subscriptions in a certain period
    @GetMapping("get/numberOfSubscription/{period}/{manager}/{type}")
    public int getNumOfSubscriptionInTheLastPeriod(@PathVariable long period, @PathVariable String manager, @PathVariable String type){
        return cardService.getNumOfSubscriptionInTheLastPeriod(period, manager, type);
    }


    //Get subscriptions in a certain period sort by months
    @GetMapping("get/numberOfSubscription/{period}/{manager}")
    public HashMap<String,List<HashMap<String, String>>> getAverageSubscriptionForTheLastMonths(@PathVariable long period, @PathVariable String manager){
        return cardService.getAverageSubscriptionForTheLastMonths(period, manager);
    }
    //Check if the customer has enough points
    @GetMapping("/get/isEnoughPoints/{id}/{points}")
    public ResponseEntity<Boolean> isEnoughPoints(@PathVariable Long id, @PathVariable int points){
        return cardService.isEnoughPoints(id,points);
    }

    @GetMapping("/get/card_points/{manager}")
    public HashMap<String, List<Integer>> getManagerCardsPoints(@PathVariable String manager){
        List<Card> cards = cardService.getManagerCards(manager).getBody();
        HashMap<String, List<Integer>> results = new HashMap<>();
        if (cards == null)
            throw new HttpClientErrorException(HttpStatus.BAD_REQUEST,"No catalogs");
        List<String> catalogNames = cards
                .stream()
                .map(Card::getCatalogName)
                .collect(Collectors.toList());
        for (String name: catalogNames){
            results.put(name, cards
                    .stream()
                    .filter(card -> card.getCatalogName().equals(name))
                    .map(Card::getEarnedPoints)
                    .collect(Collectors.toList()));
        }

        return results;
    }


    //Classifica dei cataloghi dato un manager
    @GetMapping("/get/top/{manager}")
    public List<HashMap<String, String>> getTopCatalogs(@PathVariable String manager){
        List<Card> cards =  cardService.getManagerCards(manager).getBody();
        List<HashMap<String, String>> results = new ArrayList<>();
        if (cards == null)
            throw new HttpClientErrorException(HttpStatus.BAD_REQUEST,"No catalogs");
        List<String> catalogs = cards
                .stream()
                .map(Card::getCatalogName)
                .collect(Collectors.toList());
        HashMap<Long, String> tempValue = new HashMap<>();
        for(String catalog: catalogs){
            long numOfSubs = cards
                            .stream()
                            .filter(card -> card.getCatalogName().equals(catalog))
                            .count();
            tempValue.put(numOfSubs, catalog);
        }
        List<Long> nums = tempValue.keySet()
                .stream()
                .sorted(Comparator.reverseOrder())
                .collect(Collectors.toList());
        for (Long num: nums){
                 results.add(new HashMap<>(){{
                     put("NumberOfSubs", String.valueOf(num));
                     put("Catalog", tempValue.get(num));
                 }});
        }
        return results;
    }

    @GetMapping("/get/card_points_info/{user}")
    public List<HashMap<String, String>> getCardPointsInfo(@PathVariable String user){
        ResponseEntity<List<Card>> responseCards = cardService.getCardsByUsername(user);
        if (responseCards.getBody().isEmpty())
            throw new HttpClientErrorException(HttpStatus.BAD_REQUEST,"No cards");
        List<Card> cards = responseCards.getBody();
        List<String> managers = cards
                .stream()
                .map(Card::getManager)
                .distinct()
                .collect(Collectors.toList());
        List<HashMap<String, String>> results = new ArrayList<>();
        for (String manager: managers){
            List<String> catalogs = cards
                    .stream()
                    .filter(card -> card.getManager().equals(manager))
                    .map(Card::getCatalogName)
                    .distinct()
                    .collect(Collectors.toList());
            for (String catalog: catalogs){
                Card card = cards
                        .stream()
                        .filter(card1 -> card1.getManager().equals(manager))
                        .filter(card1 -> card1.getCatalogName().equals(catalog))
                        .findFirst()
                        .get();
                LocalDate localDate = card.getExpirationDate().isAfter(LocalDate.now()) ? LocalDate.now() : card.getExpirationDate();
                LocalDate subDate = card.getSubscriptionDate();
                long time = Duration.between(subDate.atStartOfDay(), localDate.atStartOfDay()).toDays();
                results.add(new HashMap<>(){{
                    put("AveragePoints", String.valueOf(time == 0 ? card.getEarnedPoints() : card.getEarnedPoints()/time));
                    put("SubDate", card.getSubscriptionDate().toString());
                    put("ExpDate", card.getExpirationDate().toString());
                    put("Manager", manager);
                    put("Catalog", catalog);
                }});
            }
        }
        return results;
    }

    @GetMapping("/get/all/id/{user}")
    public ResponseEntity<List<Long>> getCardsId(@PathVariable String user){
        return cardService.getCardsID(user);
    }
}
