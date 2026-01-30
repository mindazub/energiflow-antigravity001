# 🚀 Quick Start Guide

## Starting EnergiFlow

### Option 1: Use the Start Script (Easiest)

```powershell
.\start-all.ps1
```

This will:
1. **Stop any existing services** (cleans up old processes)
2. **Start the backend** in a new window
3. **Start the frontend** in a new window
4. Show you the URLs to access

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
mvn spring-boot:run
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

---

## Stopping EnergiFlow

### Option 1: Use the Stop Script

```powershell
.\stop-all.ps1
```

This cleanly stops both frontend and backend.

### Option 2: Manual Stop

Press `Ctrl + C` in each terminal window.

---

## Access Your Application

Once running:

| Service | URL |
|---------|-----|
| **Frontend** | http://localhost:3000 |
| **Backend** | http://localhost:8088 |
| **H2 Database** | http://localhost:8088/h2-console |

### H2 Database Login
- **JDBC URL**: `jdbc:h2:mem:energiflowdb`
- **Username**: `sa`
- **Password**: *(leave empty)*

---

## Common Issues

### "Port 3000 is in use"
The frontend is already running. Either:
- Use `.\stop-all.ps1` to stop it
- Or manually: `taskkill /F /IM node.exe`

### "Port 8088 is in use"
The backend is already running. Either:
- Use `.\stop-all.ps1` to stop it
- Or manually: `taskkill /F /IM java.exe`

### Backend won't start
- Make sure Java 17+ is installed: `java -version`
- Make sure Maven is installed: `mvn -version`

### Frontend shows errors
- Clear the cache: Delete `frontend\.next` folder
- Reinstall: `cd frontend && npm install`

---

## First Time Setup

If this is your first time running the app:

1. **Install dependencies** (frontend):
   ```bash
   cd frontend
   npm install
   ```

2. **Start the app**:
   ```powershell
   .\start-all.ps1
   ```

3. **Register an account**:
   - Go to http://localhost:3000
   - Click "Get Started"
   - Fill in your details
   - You're in!

---

## Development Workflow

1. **Start services**: `.\start-all.ps1`
2. **Make changes** to your code
3. **Frontend auto-reloads** on save
4. **Backend auto-reloads** with Spring DevTools
5. **Stop services**: `.\stop-all.ps1` when done

---

## Need More Help?

- **Full Documentation**: See `INTEGRATION_COMPLETE.md`
- **Turbopack Issues**: See `TURBOPACK_FIX.md`
- **Project Overview**: See `README.md`
