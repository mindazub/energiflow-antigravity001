# Deploying EnergiFlow to AWS EC2

Follow these steps to deploy the project using Docker on an AWS EC2 instance.

## 1. AWS Console Setup

### Create a Security Group
Go to **EC2 > Security Groups > Create security group**:
- **Inbound Rules**:
  - `SSH` (Port 22): My IP
  - `HTTP` (Port 80): 0.0.0.0/0
  - `Next.js` (Port 3000): 0.0.0.0/0
  - `API` (Port 8088): 0.0.0.0/0

### Launch Instance
1. Choose **Ubuntu 24.04 LTS (HVM)**.
2. Select **t3.medium** (recommended for build/run) or **t3.small**.
3. Select your **Key Pair**.
4. Select the **Security Group** created above.

## 2. Connect and Install Docker

SSH into your instance:
```bash
ssh -i "your-key.pem" ubuntu@your-ec2-public-ip
```

Install Docker:
```bash
# Update and install dependencies
sudo apt update
sudo apt install -y docker.io docker-compose-v2
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu
```
*(Logout and back in for groups to apply)*

## 3. Deployment

1. **Create the Project Folder**:
   ```bash
   mkdir energiflow && cd energiflow
   ```

2. **Copy `docker-compose.prod.yml`**:
   Create a `docker-compose.yml` file and paste the contents of the `docker-compose.prod.yml` from your local machine.

3. **Configure Environment**:
   ```bash
   nano docker-compose.yml
   ```
   - Change `NEXT_PUBLIC_API_URL` to `http://YOUR_EC2_PUBLIC_IP:8088`.
   - Update passwords and secrets.

4. **Run**:
   ```bash
   docker compose up -d
   ```

## 4. Troubleshooting
- **Logs**: `docker compose logs -f`
- **Port Check**: Ensure AWS Security Group rules are correctly applied.
