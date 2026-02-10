# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication (`/auth`)

### 1. Google Login
- **Endpoint**: `POST /auth/google`
- **Description**: Authenticate using Google OAuth2 Authorization Code.
- **Body**:
  ```json
  { "code": "4/0A..." }
  ```
- **Response**:
  ```json
  {
    "accessToken": "eyJhbG...",
    "user": { "id": "...", "name": "...", "email": "...", "roles": ["user"] }
  }
  ```

### 2. Register User
- **Endpoint**: `POST /auth/register`
- **Description**: Register a new user with email and password.
- **Body**:
  ```json
  { "name": "John Doe", "email": "john@example.com", "password": "securepassword" }
  ```
- **Response**: Same as Google Login.

### 3. Login
- **Endpoint**: `POST /auth/login`
- **Description**: Login with email and password.
- **Body**:
  ```json
  { "email": "john@example.com", "password": "securepassword" }
  ```

### 4. Refresh Token
- **Endpoint**: `POST /auth/refresh`
- **Description**: Get a new Access Token using the HttpOnly Refresh Token cookie.
- **Body**: None
- **Response**:
  ```json
  { "accessToken": "eyJhbG..." }
  ```

### 5. Logout
- **Endpoint**: `POST /auth/logout`
- **Description**: Clear the Refresh Token cookie.

### 6. Get Profile (Protected)
- **Endpoint**: `GET /auth/profile`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: User object.

### 7. Admin Check (Protected, Admin Only)
- **Endpoint**: `GET /auth/admin`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: 
  ```json
  { "message": "Admin access granted" }
  ```

---

## Tasks (`/tasks`)
*All endpoints require `Authorization: Bearer <token>` header.*

### 1. Get All Tasks
- **Endpoint**: `GET /tasks`
- **Response**: Array of tasks belonging to the user.

### 2. Create Task
- **Endpoint**: `POST /tasks`
- **Body**:
  ```json
  { 
    "title": "Finish Assignment", 
    "description": "Complete the MERN stack task", 
    "status": "pending", 
    "dueDate": "2023-12-31" 
  }
  ```

### 3. Update Task
- **Endpoint**: `PUT /tasks/:id`
- **Body**: Any subset of task fields.

### 4. Delete Task
- **Endpoint**: `DELETE /tasks/:id`
- **Success Response**:
  ```json
  { "message": "Task deleted successfully" }
  ```
