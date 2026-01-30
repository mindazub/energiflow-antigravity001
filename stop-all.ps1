# Stop all EnergiFlow services
Write-Host "Stopping EnergiFlow services..." -ForegroundColor Yellow

# Stop Node.js (frontend)
$nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    Stop-Process -Name "node" -Force
    Write-Host "✓ Stopped frontend (Node.js)" -ForegroundColor Green
}
else {
    Write-Host "✓ Frontend was not running" -ForegroundColor Gray
}

# Stop Java (backend)
$javaProcesses = Get-Process -Name "java" -ErrorAction SilentlyContinue
if ($javaProcesses) {
    Stop-Process -Name "java" -Force
    Write-Host "✓ Stopped backend (Java)" -ForegroundColor Green
}
else {
    Write-Host "✓ Backend was not running" -ForegroundColor Gray
}

# Stop Docker Compose
Write-Host "Stopping PostgreSQL container..." -ForegroundColor Yellow
docker-compose down
Write-Host "✓ Stopped database container" -ForegroundColor Green

Write-Host "`nAll services stopped!" -ForegroundColor Green
