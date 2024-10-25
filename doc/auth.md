# API Documentation for `/api/auth` Routes

## **Base URL:** `/api/auth`

This document provides an overview of the authentication-related API endpoints. These endpoints handle user registration, OTP verification, user login, and email existence checks.

---

### **1. Register User**

- **Endpoint:** `/api/auth/register`
- **Method:** `POST`
- **Description:** Registers a new user.

- **Request Body:**
  ```json
  {
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "country_code": "string",
    "contact_no": "string",
    "password": "string",
    "date_of_birth": "string"
  }
  ```

- **Response:**
  - **Status:** `200 OK`
  - **Body:**
    ```json
    {
      "message": "User registered successfully",
      "user": {
        "first_name": "string",
        "last_name": "string",
        "email": "string",
        "user_id": "string"
      }
    }
    ```

- **Notes:**
  - The `date_of_birth` field contains `day`, `month`, and `year` as integers.

---

### **2. Verify OTP**

- **Endpoint:** `/api/auth/verify-otp`
- **Method:** `POST`
- **Description:** Verifies the OTP sent to the user's email during registration.

- **Request Body:**
  ```json
  {
    "email": "string",
    "otp": "string"
  }
  ```

- **Response:**
  - **Status:** `200 OK`
  - **Body:**
    ```json
    {
      "message": "Email verified successfully",
      "jwt_token": "string"
    }
    ```

- **Notes:**
  - A JWT token is provided upon successful OTP verification.

---

### **3. User Login**

- **Endpoint:** `/api/auth/login`
- **Method:** `POST`
- **Description:** Logs in a user with the provided email and password.

- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

- **Response:**
  - **Status:** `200 OK`
  - **Body:**
    ```json
    {
      "message": "Login successfully",
      "jwt_token": "string"
    }
    ```

- **Notes:**
  - A JWT token is provided upon successful login.

---

### **4. Check Email Existence**

- **Endpoint:** `/api/user/check-email`
- **Method:** `POST`
- **Description:** Checks if the provided email is already registered.

- **Request Body:**
  ```json
  {
    "email": "string"
  }
  ```

- **Response:**
  - **Status:** `200 OK`
  - **Body:**
    ```json
    {
      "exist": true | false
    }
    ```

- **Notes:**
  - The `exist` field returns `true` if the email is registered, otherwise `false`.

---

## **Error Handling**

Each endpoint returns a JSON error response when applicable, with the following structure:

```json
{
  "error": "Error message here"
}
```

---

## **Security**

- Authentication relies on JWT tokens.
- Ensure sensitive data such as passwords are securely stored using encryption and hashing.
