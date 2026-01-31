#!/bin/bash

# Colors for output
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Stopping EnergiFlow services...${NC}"

# Stop Node.js (frontend)
if pgrep -f "node" > /dev/null; then
    pkill -f "node"
    echo -e "${GREEN}✓ Stopped frontend (Node.js)${NC}"
else
    echo -e "\033[0;90m✓ Frontend was not running${NC}"
fi

# Stop Java (backend)
if pgrep -f "java" > /dev/null; then
    pkill -f "java"
    echo -e "${GREEN}✓ Stopped backend (Java)${NC}"
else
    echo -e "\033[0;90m✓ Backend was not running${NC}"
fi

# Stop Docker Compose
echo -e "${YELLOW}Stopping PostgreSQL container...${NC}"
if command -v docker-compose &> /dev/null || docker compose version &> /dev/null; then
    docker compose down 2>/dev/null || docker-compose down
    echo -e "${GREEN}✓ Stopped database container${NC}"
fi

echo -e "\n${GREEN}All services stopped!${NC}"
