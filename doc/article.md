# API Documentation for `/api/article` Routes

## Base URL
- **Base URL:** `/api/article`

## Endpoints

### Request Article for Review
- **URL:** `/request/review`
- **Method:** `POST`
- **Auth Required:** Yes
- **Request Body:**
  ```json
  {
    "title": "string",
    "description": "string",
    "body": "string"
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "message": "Article successfully submitted for review"
    }
    ```
- **Error Responses:**
  - **Code:** 400
    - **Content:**
      ```json
      {
        "error": "Title is required"
      }
      ```
  - **Code:** 500
    - **Content:**
      ```json
      {
        "error": "Server error"
      }
      ```

### Fetching Article (Authenticated User)
- **URL:** `/auth/fetch`
- **Method:** `POST`
- **Auth Required:** Yes
- **Request Body:**
  ```json
  {
    "slug": "string"
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "article": { ... },
      "message": "User interests updated successfully"
    }
    ```
- **Error Responses:**
  - **Code:** 400
    - **Content:**
      ```json
      {
        "error": "Slug is required"
      }
      ```
  - **Code:** 404
    - **Content:**
      ```json
      {
        "error": "Article not found"
      }
      ```
  - **Code:** 500
    - **Content:**
      ```json
      {
        "error": "Server error"
      }
      ```

### Fetching Article (Non-Authenticated User)
- **URL:** `/fetch`
- **Method:** `POST`
- **Auth Required:** No
- **Request Body:**
  ```json
  {
    "slug": "string"
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "article": { ... }
    }
    ```
- **Error Responses:**
  - **Code:** 400
    - **Content:**
      ```json
      {
        "error": "Slug is required"
      }
      ```
  - **Code:** 404
    - **Content:**
      ```json
      {
        "error": "Article not found"
      }
      ```
  - **Code:** 500
    - **Content:**
      ```json
      {
        "error": "Server error"
      }
      ```

### Fetching Recommended Articles (Authenticated User)
- **URL:** `/auth/list/fetch/recommended`
- **Method:** `POST`
- **Auth Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "articles": [ ... ]
    }
    ```
- **Error Responses:**
  - **Code:** 500
    - **Content:**
      ```json
      {
        "error": "Server error"
      }
      ```

### Fetching All Articles (Non-Authenticated User)
- **URL:** `/list/fetch`
- **Method:** `POST`
- **Auth Required:** No
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "articles": [ ... ]
    }
    ```
- **Error Responses:**
  - **Code:** 500
    - **Content:**
      ```json
      {
        "error": "Server error"
      }
      ```

### Fetching Personal Articles (Authenticated User)
- **URL:** `/list/personal/fetch`
- **Method:** `POST`
- **Auth Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "articles": [ ... ]
    }
    ```
- **Error Responses:**
  - **Code:** 500
    - **Content:**
      ```json
      {
        "error": "Server error"
      }
      ```

### Update Published Article
- **URL:** `/update`
- **Method:** `POST`
- **Auth Required:** Yes
- **Request Body:**
  ```json
  {
    "title": "string",
    "description": "string",
    "body": "string",
    "article_id": "string"
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "message": "Article successfully updated"
    }
    ```
- **Error Responses:**
  - **Code:** 400
    - **Content:**
      ```json
      {
        "error": "Title is required"
      }
      ```
  - **Code:** 500
    - **Content:**
      ```json
      {
        "error": "Server error"
      }
      ```

### Update Pending Article
- **URL:** `/pending/update`
- **Method:** `POST`
- **Auth Required:** Yes
- **Request Body:**
  ```json
  {
    "title": "string",
    "description": "string",
    "body": "string",
    "article_id": "string"
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "message": "Article successfully updated"
    }
    ```
- **Error Responses:**
  - **Code:** 400
    - **Content:**
      ```json
      {
        "error": "Title is required"
      }
      ```
  - **Code:** 500
    - **Content:**
      ```json
      {
        "error": "Server error"
      }
      ```

### Like Article
- **URL:** `/auth/like`
- **Method:** `POST`
- **Auth Required:** Yes
- **Request Body:**
  ```json
  {
    "article_id": "string"
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "message": "User interests updated successfully"
    }
    ```
- **Error Responses:**
  - **Code:** 400
    - **Content:**
      ```json
      {
        "error": "Article ID is required"
      }
      ```
  - **Code:** 500
    - **Content:**
      ```json
      {
        "error": "Server error"
      }
      ```

### Delete Article
- **URL:** `/delete`
- **Method:** `POST`
- **Auth Required:** Yes
- **Request Body:**
  ```json
  {
    "article_id": "string"
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "message": "Article has been deleted successfully"
    }
    ```
- **Error Responses:**
  - **Code:** 400
    - **Content:**
      ```json
      {
        "error": "Article ID is required"
      }
      ```
  - **Code:** 500
    - **Content:**
      ```json
      {
        "error": "Server error"
      }
      ```

### Report Article
- **URL:** `/report`
- **Method:** `POST`
- **Auth Required:** Yes
- **Request Body:**
  ```json
  {
    "article_id": "string",
    "reason": "string"
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "message": "Article has been reported successfully"
    }
    ```
- **Error Responses:**
  - **Code:** 400
    - **Content:**
      ```json
      {
        "error": "Article ID is required"
      }
      ```
  - **Code:** 500
    - **Content:**
      ```json
      {
        "error": "Server error"
      }
      ```