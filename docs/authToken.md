put the token in the header of the request

add this field to request header:

  ```http
  key: authorization
  value: JWT <jwt_token>
  ```

token jwt:
  * iss: string => username
  * pwd: string => password
  * email: string
  * iat: timestamp  => current date
  * exp: timestamp  => expiration

### password
  sha1(sha1(password) + salt)


### register
  body => 
    data {
      username: string,
      passowrd: string,
      email: string
    }

### login
  body => {
    data {
      jwt: <jwt_token>
    }
  }


#### generating script for a token and a hash password
to get the hash of the password exec: node hash_generator.js <password>
to get the JWT exec: node jwt_request.js 1 <username> <hash> <email>
