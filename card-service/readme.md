# Card Service

Port: 8083

## Operations:

 - __POST__ :
    + localhost:8083/api/card/create "Create a New Card" hasRole="CUSTOMER"
 - __GET__ :
    + localhost:8083/api/card/get/{id} "Get a Card By ID" hasRole="CUSTOMER"
    + localhost:8083/api/card/get/all/{customerUsername} "get All the card of a customer" hasRole="CUSTOMER"
    + localhost:8083/api/card/get/catalog_cards/{manager}/{catalog} "get all card of a type of one manager" hasRole="CUSTOMER"
 - __PUT__ :
    + localhost:8083/api/card/update/{id}?points= "add points number to a customer card" hasRole="MANAGER" (RequestBody not needed)
    + localhost:8083/api/card/redeemDetraction/{id}?points= "remove points after a redeem" hasRole="CUSTOMER" (RequestBody not needed)
      perché il customer fa l'azione di riscattare l'oggetto
 - __DELETE__:
    + localhost:8083/api/card/delete/{id} "delete a card" hasRole="CUSTOMER"
 
## Other Service requests

- localhost:8083/api/card/get/card_points/{manager}/{catalog} 
- localhost:8083/api/card/get/date_points_info/{id}
- localhost:8083/api/card/get/numberOfInscription/{period}
- localhost:8083/api/card/delete/all/{username}
- /api/card/get/isEnoughPoints/{id}/{points}