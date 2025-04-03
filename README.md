# ATM Project by Rodolfo Campos

A modern web application designed to handle concurrent ATM transactions with ACID compliance. The project implements robust transaction management to ensure data consistency and reliability, even under high concurrent load.

## Key Features

- **ACID Compliance**: Implements database transactions to ensure Atomicity, Consistency, Isolation, and Durability of all financial operations
- **Concurrent Request Handling**:
  - Implements optimistic locking and retry mechanisms for handling concurrent transactions
  - Uses exponential backoff strategy to handle database locks
  - Supports multiple simultaneous users without data corruption
- **Transaction Safety**:
  - All financial operations (withdrawals and deposits) are wrapped in database transactions
  - Automatic rollback on failure ensures no partial transactions
  - PIN verification and balance checks are performed within the same transaction
- **Error Recovery**:
  - Automatic retry mechanism for handling temporary database locks
  - Graceful error handling with meaningful error messages
  - Transaction isolation prevents dirty reads and ensures data consistency

The project consists of a frontend and backend service, containerized for easy deployment and development. The backend implements a robust transaction management system that can handle multiple simultaneous ATM operations while maintaining data integrity and consistency.

## Project Structure

```
.
├── frontend/          # React + Vite frontend application
├── backend/          # Node.js backend API
└── compose.yml       # Docker Compose configuration
```

## Technologies Used

### Frontend

- React
- TypeScript
- Vite
- ESLint

### Backend

- Node.js
- SQLite Database

### Infrastructure

- Docker
- Docker Compose

## Prerequisites

- Docker
- Docker Compose
- Node.js (for local development)

## Getting Started

### Option 1: Using Docker (Recommended)

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd atm
   ```

2. Start the application using Docker Compose:

   ```bash
   docker compose up
   ```

   This will start both the frontend and backend services:

   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000

### Option 2: Running Locally

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd atm
   ```

2. Start the Backend:

   ```bash
   cd backend
   npm install
   npm run seed    # Initialize the database with sample data
   npm start       # Start the backend server
   ```

   The backend will be available at http://localhost:8000

3. Start the Frontend (in a new terminal):

   ```bash
   cd frontend
   npm install
   npm start
   ```

   The frontend will be available at http://localhost:5173

## Development

The project uses Docker Compose's watch mode for development, which provides:

- Hot reloading for both frontend and backend
- Automatic container rebuilds when dependencies change
- Real-time file synchronization

### Frontend Development

The frontend service runs on port 5173 and automatically syncs changes from the `frontend` directory to the container.

### Backend Development

The backend service runs on port 8000 and uses SQLite as the database. Changes in the `backend` directory are automatically synced to the container.

## Environment Variables

### Frontend

- `VITE_API_URL`: Backend API URL (default: http://localhost:8000)

### Backend

- `DB_URL`: SQLite database URL (default: sqlite:///backend/data/database.sqlite)

## API Endpoints

All endpoints are prefixed with `/api/v1/`

### Account Operations

#### Get Account by PIN

- **POST** `/accounts`
- **Body:**
  ```json
  {
    "id": "number",
    "pin": "string"
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "data": {
      "id": "number",
      "firstName": "string",
      "lastName": "string",
      "balance": "number",
      "accountStatus": "string",
      "cardType": "string"
    }
  }
  ```

#### Withdraw Money

- **POST** `/withdraw`
- **Body:**
  ```json
  {
    "id": "number",
    "pin": "string",
    "amount": "number"
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "data": {
      "message": "Withdraw successful"
    }
  }
  ```

#### Deposit Money

- **POST** `/deposit`
- **Body:**
  ```json
  {
    "id": "number",
    "pin": "string",
    "amount": "number"
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "data": {
      "message": "Deposit successful"
    }
  }
  ```

### Error Responses

All endpoints may return the following error responses:

- **400 Bad Request**

  ```json
  {
    "status": "error",
    "message": "Error message describing the issue"
  }
  ```

- **404 Not Found**

  ```json
  {
    "status": "error",
    "message": "Account not found or Invalid PIN"
  }
  ```

- **500 Internal Server Error**
  ```json
  {
    "status": "error",
    "message": "Internal server error message"
  }
  ```

## TODO

### Testing Improvements

- Implement comprehensive unit tests for all backend services
- Add integration tests for API endpoints
- Set up end-to-end testing with Cypress or Playwright
- Add load testing scenarios to verify concurrent transaction handling
- Implement test coverage reporting
- Add automated testing in CI/CD pipeline

### Backend TypeScript Migration

- Migrate backend codebase to TypeScript
- Define strong types for:
  - Database models and schemas
  - API request/response interfaces
  - Service layer interfaces
  - Transaction types and states
  - Error types and handling
- Implement strict TypeScript configuration
- Add type checking in CI/CD pipeline
- Update documentation with TypeScript examples
