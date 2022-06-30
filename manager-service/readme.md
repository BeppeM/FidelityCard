# Manager Service

Port: 8081

## Operations:

 - __POST__ :
    + localhost:8081/api/manager/create "Create a Manager" hasRole="MANAGER"
 - __GET__ :
    + localhost:8081/api/manager/get/{username} "Get a Manager by username" hasRole="MANAGER"
    + localhost:8081/api/manager/get/all "get All the Managers" hasRole="MANAGER" or hasRole="CUSTOMER"
 - __PUT__ :
    + localhost:8081/api/manager/update "update Manager" hasRole="MANAGER" (RequestBody needed)
 - __DELETE__:
    + localhost:8081/api/manager/delete/{username} "delete a Manager" hasRole="MANAGER"