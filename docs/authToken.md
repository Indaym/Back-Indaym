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