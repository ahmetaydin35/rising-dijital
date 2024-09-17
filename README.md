# Rising Dijital API

## Description

The Rising Dijital API is built to offer a range of endpoints for managing users, services, and orders. It features multiple endpoints that handle CRUD operations as well as user authentication.

## Endpoints

### 1. GET /

- **Description**: Homepage.
- **Response**: The company name appears "Rising Dijital".

### 2. GET /services

- **Description**: Retrieve a list of all services.
- **Authentication**: Requires a valid JWT token.
- **Response**: A JSON array of services.

### 3. POST /register

- **Description**: Register a new user.
- **Request Body**: A JSON object containing the user's details (firstName, lastName, email, password).
- **Response**: A JSON object representing the created user.

### 4. POST /login

- **Description**: Authenticate a user and return a JWT token.
- **Request Body**: A JSON object containing the user's email and password.
- **Response**: A JSON object containing the JWT token.

### 5. POST /orders

- **Description**: Create a new order.
- **Authentication**: Requires a valid JWT token.
- **Request Body**: A JSON object containing the order details (userId, serviceId, quantity).
- **Response**: A JSON object representing the created order.

### 6. GET /orders/:userId

- **Description**: Retrieve a list of orders for a specific user.
- **Authentication**: Requires a valid JWT token.
- **Parameters**:
  - `userId` (path parameter): The ID of the user whose orders are to be retrieved.
- **Response**: A JSON array of orders.

### 7. GET /all-data

- **Description**: Retrieve all data including users, services, and orders.
- **Authentication**: Requires a valid JWT token.
- **Response**: A JSON object containing arrays of users, services, and orders.

## Running Tests

To run the tests for this project, you can use Jest. Make sure you have all the dependencies installed by running:

```sh
npm install
```

Then, you can run the tests using the following command:

```sh
npx jest
```

You should see an output similar to this:

```sh
 PASS  src/controllers/userController.test.js
 PASS  src/controllers/serviceController.test.js

Test Suites: 2 passed, 2 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        0.568 s
Ran all test suites.
```
