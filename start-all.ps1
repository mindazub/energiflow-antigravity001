param(
    [switch]$Docker,
    [switch]$Reset
)

# Kill any existing node and java processes to ensure clean start
Write-Host "Stopping any existing services..." -ForegroundColor Yellow
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
Stop-Process -Name "java" -Force -ErrorAction SilentlyContinue

if ($Reset) {
    Write-Host "Resetting database and volumes..." -ForegroundColor Red
    docker-compose down -v
    Start-Sleep -Seconds 2
}

if ($Docker) {
    Write-Host "Starting everything with Docker Compose..." -ForegroundColor Cyan
    docker-compose up --build
    exit
}

# Start PostgreSQL container
Write-Host "Starting PostgreSQL container..." -ForegroundColor Cyan
docker-compose up -d db

# Start backend in new window
Write-Host "Starting backend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; mvn spring-boot:run"

# Wait for backend to start
Write-Host "Waiting for backend to initialize (15 seconds)..." -ForegroundColor Cyan
Start-Sleep -Seconds 15

# Start frontend in new window
Write-Host "Starting frontend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

# Wait a bit for frontend to start
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "EnergiFlow is starting!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Backend API: http://localhost:8088" -ForegroundColor Cyan
Write-Host "Database (Postgres): localhost:5432" -ForegroundColor Cyan
Write-Host ""
Write-Host "Default Admin Credentials:" -ForegroundColor Green
Write-Host "  Email: admin@admin.com" -ForegroundColor Green
Write-Host "  Password: admin000" -ForegroundColor Green
Write-Host ""
Write-Host "Two new PowerShell windows have opened:" -ForegroundColor Yellow
Write-Host "  1. Backend (Spring Boot)" -ForegroundColor Yellow
Write-Host "  2. Frontend (Next.js)" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Ctrl+C in each window to stop the services" -ForegroundColor Yellow
Write-Host "Or close this window and the service windows will keep running" -ForegroundColor Yellow
