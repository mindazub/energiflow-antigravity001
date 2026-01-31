#!/bin/bash

# Colors for output
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Default flags
DOCKER_FLAG=false
RESET_FLAG=false

while [[ "$#" -gt 0 ]]; do
    case $1 in
        -Docker|--docker) DOCKER_FLAG=true ;;
        -Reset|--reset) RESET_FLAG=true ;;
        *) echo "Unknown parameter passed: $1"; exit 1 ;;
    esac
    shift
done

# Kill any existing node and java processes
echo -e "${YELLOW}Stopping any existing services...${NC}"
pkill -f "node" 2>/dev/null
pkill -f "java" 2>/dev/null

if [ "$RESET_FLAG" = true ]; then
    echo -e "\033[0;31mResetting database and volumes...\033[0m"
    docker compose down -v
    sleep 2
fi

if [ "$DOCKER_FLAG" = true ]; then
    echo -e "${CYAN}Starting everything with Docker Compose...${NC}"
    docker compose up --build
    exit
fi

# Local development mode (no Docker for app)
echo -e "${CYAN}Starting PostgreSQL container...${NC}"
docker compose up -d db

echo -e "${CYAN}Starting backend in background...${NC}"
cd backend && mvn spring-boot:run &
BACKEND_PID=$!

echo -e "${CYAN}Waiting for backend to initialize (15 seconds)...${NC}"
sleep 15

echo -e "${CYAN}Starting frontend in background...${NC}"
cd ../frontend && npm run dev &
FRONTEND_PID=$!

echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}EnergiFlow is starting!${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "\nFrontend: http://localhost:3000"
echo -e "Backend API: http://localhost:8088"
echo -e "\nPress Ctrl+C to stop (though services are in background)"

# Wait for background processes
wait $BACKEND_PID $FRONTEND_PID
