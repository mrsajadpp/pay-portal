# API Documentation for `/api/img` Routes

## Base URL

```
/api/img
```

## Endpoints

### 1. Fetch Profile Image

- **Endpoint:** `/pfp/:user_id`
- **Method:** `GET`
- **Description:** Retrieves the profile picture of a user based on their user ID.
- **URL Params:**
  - `user_id` (string): The ID of the user whose profile picture is to be fetched.
- **Query Params:** None
- **Headers:** 
  - `Content-Type`: `image/png` (automatically set by the server)
- **Response:**
  - **200 OK**
    - **Content-Type:** `image/png`
    - **Body:** Binary image data (PNG format)
  - **400 Bad Request**
    - **Content-Type:** `application/json`
    - **Body:** `{ "error": "User ID is required" }`
  - **404 Not Found**
    - **Content-Type:** `application/json`
    - **Body:** `{ "error": "Profile picture not found" }`
  - **500 Internal Server Error**
    - **Content-Type:** `application/json`
    - **Body:** `{ "error": "Server error" }`

- **Example Request:**
  ```http
  GET /api/img/pfp/60d5f5e2b45f1245a71c8d32
  ```

- **Example Response (Success):**
  ```http
  HTTP/1.1 200 OK
  Content-Type: image/png
  
  [Binary image data]
  ```

- **Example Response (Error):**
  ```json
  {
    "error": "Profile picture not found"
  }
  ```

### 2. Upload Profile Picture

- **Endpoint:** `/auth/pfp/upload`
- **Method:** `POST`
- **Description:** Uploads a new profile picture for the authenticated user.
- **Headers:** 
  - `Authorization`: `Bearer <token>` (authentication token)
- **Body:**
  - **Form Data:** Multipart form-data including the file to upload
- **Response:**
  - **200 OK**
    - **Content-Type:** `application/json`
    - **Body:** `{ "message": "Avatar updated." }`
  - **400 Bad Request**
    - **Content-Type:** `text/plain`
    - **Body:** `No file uploaded.`
  - **500 Internal Server Error**
    - **Content-Type:** `application/json`
    - **Body:** `{ "error": "Server error" }`

- **Example Request:**
  ```http
  POST /api/img/auth/pfp/upload
  Authorization: Bearer <token>
  Content-Type: multipart/form-data

  [File data]
  ```

- **Example Response (Success):**
  ```json
  {
    "message": "Avatar updated."
  }
  ```

- **Example Response (Error):**
  ```json
  {
    "error": "Server error"
  }
  ```

## Authentication

- The `/auth/pfp/upload` endpoint requires authentication via JWT. The token must be included in the `Authorization` header as `Bearer <token>`.

## Error Handling

- **400 Bad Request**: Indicates missing or invalid parameters.
- **404 Not Found**: Indicates that the requested profile picture was not found.
- **500 Internal Server Error**: Indicates a server error during processing.

## Dependencies

- **Express**: For handling HTTP requests.
- **Multer**: For handling file uploads.
- **Mongoose**: For MongoDB database interactions.
- **Path, FS**: For handling file paths and file system operations.
- **JWT**: For handling JSON Web Tokens (authentication).

## Notes

- The image is stored as a Base64-encoded string in the database.
- The `/pfp/:user_id` endpoint assumes that images are in PNG format and Base64-encoded. Adjust the `Content-Type` header if using other formats.