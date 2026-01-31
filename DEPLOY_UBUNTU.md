# Deploying EnergiFlow to Ubuntu Server

Follow these steps to deploy the project using pre-built Docker images.

## 1. Prerequisites (Install Docker & Docker Compose)

Run these commands on your fresh Ubuntu server:

```bash
# Update package list
sudo apt update

# Install Docker
sudo apt install -y docker.io

# Install Docker Compose
sudo apt install -y docker-compose-v2

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# Add your user to the docker group (optional, requires re-login)
sudo usermod -aG docker $USER
```

## 2. Set Up Project Directory

Create a folder for the project and download the production compose file:

```bash
mkdir energiflow && cd energiflow

# Create the docker-compose.yml file
nano docker-compose.yml
```

**Paste the contents of `docker-compose.prod.yml` into this file.**

## 3. Configuration

In the `docker-compose.yml` file, make sure to:
1. Replace `YOUR_SERVER_IP` with your actual server IP address.
2. Change the default `POSTGRES_PASSWORD` and `SPRING_DATASOURCE_PASSWORD`.
3. Set a unique `JWT_SECRET`.

## 4. Launch the Application

Run the following command to pull the images and start the services in the background:

```bash
sudo docker compose up -d
```

## 5. Verify Deployment

Check if the containers are running:
```bash
sudo docker ps
```

You should see 3 containers: `energiflow_db`, `energiflow_backend`, and `energiflow_frontend`.

### Accessing the App:
- **Frontend**: `http://your-server-ip:3000`
- **Backend API**: `http://your-server-ip:8088`

## 6. Maintenance & Logs

- **View Logs**: `sudo docker compose logs -f`
- **Stop Services**: `sudo docker compose down`
- **Update to latest v1.1.1**: `sudo docker compose pull && sudo docker compose up -d`

---

> [!TIP]
> **Pro Tip**: For a real production environment, we recommend setting up **Nginx** as a reverse proxy on ports 80/443 with **SSL** using Certbot.
