# EnergiFlow Backend

Spring Boot backend API for the EnergiFlow Energy Management System.

## Technology Stack

- **Java 17**
- **Spring Boot 3.2.2**
- **Spring Security** with JWT authentication
- **Spring Data JPA**
- **H2 Database** (in-memory for development)
- **Maven** for dependency management

## Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.6+

### Running the Application

```bash
cd backend
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### H2 Database Console

Access the H2 console at: `http://localhost:8080/h2-console`

- **JDBC URL**: `jdbc:h2:mem:energiflowdb`
- **Username**: `sa`
- **Password**: (leave empty)

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token
- `POST /api/auth/logout` - Logout (client-side token removal)
- `GET /api/auth/me` - Get current user info (requires authentication)

### Request Examples

**Register:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Login:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Logged in successfully"
}
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-token-here>
```

## CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:3000`
- `http://localhost:3001`

Update `application.yml` to add more origins if needed.

## Building for Production

```bash
mvn clean package
java -jar target/energiflow-backend-0.0.1-SNAPSHOT.jar
```
