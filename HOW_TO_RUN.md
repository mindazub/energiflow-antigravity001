# How to Run EnergiFlow

This guide will help you run both the frontend and backend of the EnergiFlow application.

## Prerequisites

Before you start, make sure you have installed:

- **Node.js 18+** and npm (for frontend)
- **Java 17+** (for backend)
- **Maven 3.6+** (for backend)

## Quick Start

### Option 1: Run Both Services Manually

#### Step 1: Start the Backend (Spring Boot)

Open a terminal and navigate to the backend directory:

```bash
cd backend
mvn spring-boot:run
```

The backend will start on **http://localhost:8088**

You should see output like:
```
Started EnergiFlowApplication in X.XXX seconds
```

#### Step 2: Start the Frontend (Next.js)

Open a **new terminal** (keep the backend running) and navigate to the frontend directory:

```bash
cd frontend
npm install  # Only needed the first time
npm run dev
```

The frontend will start on **http://localhost:3000**

You should see output like:
```
▲ Next.js 16.1.6
- Local:        http://localhost:3000
```

#### Step 3: Access the Application

Open your browser and go to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **H2 Database Console**: http://localhost:8080/h2-console

### Option 2: Using PowerShell Script (Windows)

Create a file `start-all.ps1` in the root directory:

```powershell
# Start backend in new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; mvn spring-boot:run"

# Wait for backend to start
Start-Sleep -Seconds 10

# Start frontend in new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "Both services are starting..."
Write-Host "Frontend: http://localhost:3000"
Write-Host "Backend: http://localhost:8080"
```

Then run:
```bash
.\start-all.ps1
```

## Testing the Application

1. **Register a new account**:
   - Go to http://localhost:3000/register
   - Fill in your details
   - Click "Register"

2. **Login**:
   - Go to http://localhost:3000/login
   - Enter your credentials
   - Click "Login"

3. **View Dashboard**:
   - After login, you'll be redirected to the dashboard
   - You should see your user information and energy stats

## Accessing the H2 Database

While the backend is running, you can access the H2 database console:

1. Go to http://localhost:8080/h2-console
2. Use these credentials:
   - **JDBC URL**: `jdbc:h2:mem:energiflowdb`
   - **Username**: `sa`
   - **Password**: (leave empty)
3. Click "Connect"

You can now view and query the `USERS` table.

## Troubleshooting

### Backend won't start
- Make sure Java 17+ is installed: `java -version`
- Make sure Maven is installed: `mvn -version`
- Check if port 8080 is already in use

### Frontend won't start
- Make sure Node.js is installed: `node -v`
- Run `npm install` in the frontend directory
- Check if port 3000 is already in use

### CORS errors
- Make sure the backend is running on port 8080
- Check that `.env.local` in frontend has: `NEXT_PUBLIC_API_URL=http://localhost:8080`

### Authentication not working
- Clear browser localStorage: Open DevTools → Application → Local Storage → Clear
- Make sure both frontend and backend are running
- Check browser console for errors

## Building for Production

### Backend
```bash
cd backend
mvn clean package
java -jar target/energiflow-backend-0.0.1-SNAPSHOT.jar
```

### Frontend
```bash
cd frontend
npm run build
npm start
```

## Stopping the Services

Press `Ctrl + C` in each terminal window to stop the services.
