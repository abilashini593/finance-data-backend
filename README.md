# Finance Data Processing and Access Control Backend

## Overview
This is a comprehensive backend built for a finance dashboard system. It provides APIs for user & role management, financial records management, and dashboard summary views. It includes role-based access control (RBAC), authentication, and a logically structured codebase.

## Tech Stack
- **Node.js** & **Express**: For fast asynchronous REST APIs.
- **SQLite**: Using `sqlite` and `sqlite3` for a lightweight, file-based relational database.
- **JWT**: For secure authentication.
- **bcrypt**: For secure password hashing.

## Architecture & Structure
The backend follows a classic layered architecture (Separation of Concerns):
- **Routes (`src/routes`)**: Defines API endpoints and attaches middleware.
- **Controllers (`src/controllers`)**: Business logic for requests and responses.
- **Models (`src/models`)**: Data access layer. Handles SQL queries using lightweight SQLite wrappers.
- **Middlewares (`src/middlewares`)**: Shared logic such as Auth validation, RBAC enforcements, and Global Error Handling.
- **DB config (`src/db.js`)**: Initialize SQLite connection and schemas.

## Roles & Permissions
- **Viewer**: Baseline role. Can not mutate or view records/dashboard (unless assigned).
- **Analyst**: Can view financial records and dashboard summaries. Cannot mutate data.
- **Admin**: Full access. Can create users, assign roles, create/update/delete records, and view dashboards.

## API Documentation

### Auth
- `POST /api/auth/register`: Create a new user account.
- `POST /api/auth/login`: Retrieve a JWT token for use in other requests.

### Users (Requires Admin)
- `GET /api/users`: Get all users.
- `GET /api/users/:id`: Get user details.
- `PUT /api/users/:id/role`: Update user role (`Viewer`, `Analyst`, `Admin`).
- `PUT /api/users/:id/status`: Update user status (`active`, `inactive`).

### Records
- `GET /api/records`: List financial records. Supports pagination (`?page=1&limit=10`) and filtering (`?type=income`, `?category=Salary`). (Analyst, Admin)
- `GET /api/records/:id`: Get a specific record. (Analyst, Admin)
- `POST /api/records`: Create a new record. Payload: `amount`, `type` (income/expense), `category`, `date`, `notes`. (Admin)
- `PUT /api/records/:id`: Update existing record. (Admin)
- `DELETE /api/records/:id`: Soft delete a record. (Admin)

### Dashboard
- `GET /api/dashboard/summary`: Get totals for income, expenses, net balance, category summaries, and recent activity. (Analyst, Admin)

## Setup and Run
1. `npm install`
2. `npm start` (or `node src/server.js`)
3. Database `finance.sqlite` is automatically generated on startup if it doesn't exist.
4. Server runs on port `3000` by default. Can be overridden using `PORT` environment variable.
