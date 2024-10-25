### API Documentation for `/api/admin` Routes

**Base URL:** `/api/admin`

---

#### **POST /article/approve**

Approves a pending article.

**Request Body:**
```json
{
  "article_id": "string"
}
```

**Responses:**

- **200 OK**  
  ```json
  {
    "message": "Article has been approved successfully"
  }
  ```

- **400 Bad Request**  
  ```json
  {
    "message": "Article ID is required"
  }
  ```
  ```json
  {
    "message": "Article is not found on pending list or article id is wrong"
  }
  ```

- **500 Internal Server Error**  
  ```json
  {
    "error": "Server error"
  }
  ```

---

#### **POST /article/decline**

Declines a pending article and notifies the author.

**Request Body:**
```json
{
  "article_id": "string",
  "reason": "string"
}
```

**Responses:**

- **200 OK**  
  ```json
  {
    "message": "Article has been declined successfully"
  }
  ```

- **400 Bad Request**  
  ```json
  {
    "message": "Article ID is required"
  }
  ```
  ```json
  {
    "message": "Reason is required"
  }
  ```
  ```json
  {
    "message": "Article is not found on pending list or article id is wrong"
  }
  ```

- **500 Internal Server Error**  
  ```json
  {
    "error": "Server error"
  }
  ```

---

#### **POST /article/delete**

Deletes an article and notifies the author.

**Request Body:**
```json
{
  "article_id": "string",
  "reason": "string"
}
```

**Responses:**

- **200 OK**  
  ```json
  {
    "message": "Article has been deleted successfully"
  }
  ```

- **400 Bad Request**  
  ```json
  {
    "message": "Article ID is required"
  }
  ```
  ```json
  {
    "message": "Reason is required"
  }
  ```
  ```json
  {
    "message": "Article is not found or article id is wrong"
  }
  ```

- **500 Internal Server Error**  
  ```json
  {
    "error": "Server error"
  }
  ```

---

**Middleware:**

- `auth.verifyAdmin`: Verifies if the user is an admin.

**Utils:**

- `validator`: Validation utilities.
- `unique`: Utilities for uniqueness checks.
- `sendMail`: Utility to send emails.
- `date`: Date utilities.
- `format`: Formatting utilities.
- `scrap`: Web scraping utilities.
- `interaction`: Utilities for user interactions.

**Database Models:**

- `Article`: Model for approved articles.
- `ArticleBin`: Model for deleted articles.
- `ArticlePending`: Model for pending articles.
- `User`: Model for users.
- `UserBin`: Model for deleted users.
- `UserPending`: Model for pending users.
- `Code`: Model for OTP codes.
- `CodeBin`: Model for deleted OTP codes.
- `Report`: Model for reports.
- `ReportBin`: Model for deleted reports.

This documentation provides details on the endpoints available for admin actions, including article approval, decline, and deletion, along with the expected request and response formats.