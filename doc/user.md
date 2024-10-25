# API Documentation for `/api/user/` Routes

## Overview

This document provides details about the API endpoints related to user management. These endpoints allow you to check if an email exists, fetch user data, update user information, create and reset passwords, and check the validity of reset links.

## Base URL

```
/api/user/
```

## Endpoints

### 1. Check if Email Exists

- **Endpoint**: `/check-email`
- **Method**: `POST`
- **Description**: Checks if an email already exists in the system.
- **Request Body**:
  ```json
  {
    "email": "string"
  }
  ```
- **Responses**:
  - **200 OK**: Email availability check result.
    ```json
    {
      "exists": true,
      "message": "Email already exists"
    }
    ```
  - **400 Bad Request**: Invalid email format.
    ```json
    {
      "error": "Invalid email format"
    }
    ```
  - **500 Internal Server Error**: Server error.
    ```json
    {
      "error": "Server error"
    }
    ```

### 2. Fetch User Data

- **Endpoint**: `/user-data`
- **Method**: `POST`
- **Description**: Fetches user data (first_name, last_name, about) by user ID.
- **Request Body**:
  ```json
  {
    "user_id": "string"
  }
  ```
- **Responses**:
  - **200 OK**: User data retrieved successfully.
    ```json
    {
      "first_name": "string",
      "last_name": "string",
      "about": "string",
      "profile_url": "string"
    }
    ```
  - **400 Bad Request**: User ID is required.
    ```json
    {
      "error": "User ID is required"
    }
    ```
  - **404 Not Found**: User not found.
    ```json
    {
      "error": "User not found"
    }
    ```
  - **500 Internal Server Error**: Server error.
    ```json
    {
      "error": "Server error"
    }
    ```

### 3. Update User

- **Endpoint**: `/update`
- **Method**: `POST`
- **Description**: Updates user information. Requires authentication.
- **Request Body**:
  ```json
  {
    "first_name": "string",
    "last_name": "string",
    "country_code": "string",
    "contact_no": "string",
    "sex": "string",
    "about": "string",
    "address": "string",
    "date_of_birth": "string"
  }
  ```
- **Responses**:
  - **200 OK**: User updated successfully.
    ```json
    {
      "message": "User updation successful"
    }
    ```
  - **500 Internal Server Error**: Server error.
    ```json
    {
      "error": "Server error"
    }
    ```

### 4. Create Password Reset Link

- **Endpoint**: `/reset-password`
- **Method**: `POST`
- **Description**: Creates a password reset link and sends it to the user's email.
- **Request Body**:
  ```json
  {
    "email": "string"
  }
  ```
- **Responses**:
  - **200 OK**: Password reset link sent successfully.
    ```json
    {
      "message": "Password reset link sent to your email"
    }
    ```
  - **400 Bad Request**: Email is required or invalid email format.
    ```json
    {
      "error": "Email is required"
    }
    ```
    ```json
    {
      "error": "Invalid email format"
    }
    ```
  - **404 Not Found**: User not found.
    ```json
    {
      "error": "User not found"
    }
    ```
  - **500 Internal Server Error**: Server error.
    ```json
    {
      "error": "Server error"
    }
    ```

### 5. Reset User Password

- **Endpoint**: `/reset-password/:token`
- **Method**: `POST`
- **Description**: Resets the user's password using a token.
- **Request Body**:
  ```json
  {
    "password": "string",
    "confirmPassword": "string"
  }
  ```
- **Responses**:
  - **200 OK**: Password reset successfully.
    ```json
    {
      "message": "Password reset successfully"
    }
    ```
  - **400 Bad Request**: Password and confirm password are required or do not match.
    ```json
    {
      "error": "Password and confirm password are required"
    }
    ```
    ```json
    {
      "error": "Password and confirm password do not match"
    }
    ```
  - **404 Not Found**: Link expired or user not found.
    ```json
    {
      "error": "Looks like the link was expired"
    }
    ```
    ```json
    {
      "error": "User not found"
    }
    ```
  - **500 Internal Server Error**: Server error.
    ```json
    {
      "error": "Server error"
    }
    ```

### 6. Check if Reset Link URL Exists

- **Endpoint**: `/check-reset-link/:token`
- **Method**: `GET`
- **Description**: Checks if a password reset link exists.
- **Responses**:
  - **200 OK**: Reset link exists.
    ```json
    {
      "exists": true,
      "message": "Reset link exists"
    }
    ```
  - **400 Bad Request**: Token is required.
    ```json
    {
      "error": "Token is required"
    }
    ```
  - **404 Not Found**: Reset link not found.
    ```json
    {
      "error": "Reset link not found"
    }
    ```
  - **500 Internal Server Error**: Server error.
    ```json
    {
      "error": "Server error"
    }
    ```

## Authentication

Some endpoints require authentication via a token. Use the `auth.verifyToken` middleware to ensure that the request is made by an authenticated user.

## Errors

All error responses are provided with a status code and a description of the issue. Ensure that your client application handles these errors appropriately.

## Notes

- Ensure to replace `process.env.SECRET_KEY` and `process.env.BASE_URL` with your actual environment variables.
- The email content for password reset includes HTML formatting and should be properly rendered in email clients.

For additional assistance or queries, contact the API support team at `support@grovixlab.com`.
