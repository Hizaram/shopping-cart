# A Simple Shopping Cart

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
A simple shopping cart system built in Node.js that allows the creation and modification of products


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Endpoints](#endpoints)
- [Authentication](#authentication)
- [Testing](#testing)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Hizaram/shopping-cart.git
  ```
2. Install dependencies:
```bash
npm install
```
## Usage

### Configuration
- Create a Mongodb database

- Configure the database connection in the `.env` file:
```env
MONGODB_URI=your_mongodb_uri
```

- Generate a secret key for JWT authentication and set its expiry time in the `.env` file:
```env
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN="time"
```

## ENDPOINTS
* Fetch Products:
- Method: GET
- URL: `http://localhost:3000/products`
* Signup (As a customer):
- Method: POST
- URL: `http://localhost:3000/auth/signup`
- Body (raw JSON);
```json
{
  "username": "your_username",
  "password": "your_password",
  "passwordConfirmation": "your_password"
}
```
* Login (To get JWToken):
- Method: POST
- URL: `http://localhost:3000/auth/login`
- Body (raw JSON);
```json
{
  "username": "your_username",
  "password": "your_password"
}
```
* Add Product (Protected)
- Method: POST
- URL: `http://localhost:3000/products`
- Headers:
  * `Content-Type: application/json`
  * `Authorization: Bearer {your_jwtoken}`
- Body (raw JSON):
```json
{
  "name": "String",
  "price": Number
}
```
* Update Product Information (Protected)
- Method: PUT
- URL: `http://localhost:3000/products/{product_id}`
- Headers:
  * `Content-Type: application/json`
  * `Authorization: Bearer {your_jwtoken}`
- Body (raw JSON):
```json
{
 "name": "updatedString",
 "price": updatedNumber
}
```

## Authentication
This project uses JWT for authentication. Make sure to include the JWT token in the `Authorization` header for protected routes.

## Testing
Testing is done through Postman or cURL
