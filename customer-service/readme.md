# Customer Service

Port: 8082

## Operations:

 - __POST__ :
    + localhost:8082/api/customer/create "Create a New Customer" hasRole="CUSTOMER"
 - __GET__ :
    + localhost:8082/api/customer/get/{username} "get a customer by username" hasRole="MANAGER" or hasRole="CUSTOMER"
    + localhost:8082/api/customer/get/all "get all the customers" hasRole="MANAGER"
 - __PUT__ :
    + localhost:8082/api/customer/update "update a customer" hasRole="CUSTOMER" (RequestBody needed)
 - __DELETE__:
    + localhost:8082/api/customer/delete/{customerUsername} "delete a customer" hasRole="CUSTOMER" 