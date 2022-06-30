# Authentication Service

Port: 8085

## Operations:

  - __POST__ :
    + localhost:8085/api/auth/register "Register a new user with role" permitAll
    + localhost:8085/api/auth/authenticate "Get a token of a registered user" permitAll
  - __GET__ : 
    + localhost:8085/api/auth/refresh "Get new access token given the refresh token" **authenticated**
  - __PUT__ :
      + localhost:8085/api/auth/update/password "Update the pwd of a user" **authenticated**
      + localhost:8085/api/auth/update/username/{oldUsername} "Update the username of a user given the old one" **authenticated**
  - __DELETE__:
      + localhost:8085/api/auth/delete/{username} "Delete a user given the username" **authenticated**