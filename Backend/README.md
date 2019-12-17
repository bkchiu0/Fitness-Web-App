# Fitness web application REST API

Backend REST API for handling http requests from frontend or mobile clients.

## Endpoints

### Authentication

Authentication uses JWT to verify authenticity.

- /auth/users/create (Register new user)
  - firstName, lastName, email, password
- /auth/users/login (login user)
  - email, password

## Notes

Depending on what version of docker you have the IP addresses for your containers may differ

- Docker toolbox (legacy docker) uses the ip `192.168.99.100`
- Regular Docker uses the ip `127.0.0.1`
