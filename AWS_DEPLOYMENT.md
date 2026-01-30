# 🏗️ Deploying EnergiFlow to AWS

This guide outlines the recommended approach for deploying the EnergiFlow full-stack application to AWS using the most modern and scalable services.

## 🏗️ Recommended Architecture

For a production-ready deployment, we recommend:

| Component | AWS Service | Why? |
|-----------|-------------|------|
| **Frontend** | AWS Amplify or S3 + CloudFront | Fast, global CDN, perfect for Next.js |
| **Backend API** | AWS App Runner | Fully managed, auto-scaling, easy container deployment |
| **Database** | AWS RDS (PostgreSQL) | Managed database with backups, patches, and HA |
| **Secrets** | AWS Secrets Manager | Securely store DB passwords and JWT keys |

---

## 🚀 Step-by-Step Deployment (The Professional Way)

### 1. Database (RDS)
1. Go to the **RDS Console** → Create Database.
2. Choose **PostgreSQL**.
3. Use the **Free Tier** (db.t3.micro) for testing.
4. Note your **Endpoint**, **Username**, and **Password**.
5. Ensure your Security Group allows traffic from your backend.

### 2. Backend (App Runner)
1. Push your backend code to **GitHub**.
2. Go to **AWS App Runner** → Create Service.
3. Connect your GitHub repository.
4. Set build settings:
   - Runtime: Python (Wait, use **Docker** instead).
   - Source: **Container Image**.
   - Push your container to **AWS ECR** first.
5. Set environment variables:
   - `SPRING_DATASOURCE_URL`: `jdbc:postgresql://your-rds-endpoint:5432/energiflowdb`
   - `JWT_SECRET`: Your super secret key.
   - `CORS_ALLOWED_ORIGINS`: Your frontend URL.

### 3. Frontend (Amplify)
1. Go to **AWS Amplify** → Build an app.
2. Connect your GitHub repository.
3. Amplify will automatically detect Next.js.
4. Add Environment Variable:
   - `NEXT_PUBLIC_API_URL`: Your App Runner backend URL.
5. Deploy.

---

## 🛠️ Deployment (The Quick & Simple Way - EC2 + Docker Compose)

If you just want to get it running on a single server:

1. **Launch an EC2 Instance** (Ubuntu 22.04 recommended).
2. **Install Docker and Docker Compose**:
   ```bash
   sudo apt update
   sudo apt install docker.io docker-compose -y
   sudo usermod -aG docker $USER
   ```
3. **Clone your repo**:
   ```bash
   git clone <your-repo-url>
   cd antigravity001
   ```
4. **Update `docker-compose.yml`** (Change localhost to your public IP).
5. **Start everything**:
   ```bash
   docker-compose up -d --build
   ```

---

## 🔐 Security Best Practices

- **HTTPS**: Use AWS Certificate Manager (ACM) to get a free SSL certificate.
- **VPC**: Place your RDS database in a private subnet.
- **Secrets**: Never commit passwords to GitHub; use `.env` files or AWS Secrets Manager.
- **IAM**: Use the principle of least privilege for your service roles.

---

## 📈 Scaling

- **Backend**: App Runner scales automatically based on traffic.
- **Frontend**: CloudFront/Amplify handles caching and global delivery.
- **Database**: RDS can be scaled up (Instance Type) or out (Read Replicas).

---

**Need specific help with one of these steps?** Just ask!
