# Deploying EnergiFlow to AWS Managed Services

This guide explains how to deploy EnergiFlow using professional, managed AWS services for high availability and scalability.

## Architecture
- **Database**: AWS RDS for PostgreSQL
- **Backend (Spring Boot)**: AWS App Runner
- **Frontend (Next.js)**: AWS App Runner (or AWS Amplify)

---

## 1. Database: AWS RDS Setup

1. Go to **RDS > Create database**.
2. Select **Standard create** > **PostgreSQL**.
3. Template: **Free Tier** (or Dev/Test).
4. DB Instance Identifier: `energiflow-db`.
5. Master username: `energiflow_user`.
6. Set password and save it.
7. **Public Access**: No.
8. **VPC Security Group**: Create new (e.g., `rds-sg`).

## 2. Backend: AWS App Runner

1. Go to **App Runner > Create service**.
2. Source: **Container registry** > **External registry**.
3. Image repository: `public.ecr.aws/mindazub/energiflow-backend:v1.1.1` (or your Docker Hub path).
4. **Environment variables**:
   - `SPRING_DATASOURCE_URL`: `jdbc:postgresql://YOUR_RDS_ENDPOINT:5432/energiflowdb`
   - `SPRING_DATASOURCE_USERNAME`: `energiflow_user`
   - `SPRING_DATASOURCE_PASSWORD`: `your_rds_password`
   - `JWT_SECRET`: `your_super_secret`
5. Port: `8088`.
6. **Networking**: Ensure it can reach RDS (use a VPC Connector).

## 3. Frontend: AWS App Runner

1. Create another **App Runner service**.
2. Image repository: `mindazub/energiflow-frontend:v1.1.1`.
3. **Environment variables**:
   - `NEXT_PUBLIC_API_URL`: `https://your-backend-apprunner-url.awsapprunner.com`
4. Port: `3000`.

---

## 🔒 Security Configuration (Crucial)

To allow the Backend to talk to RDS:
1. Go to your **RDS Security Group**.
2. Add an **Inbound Rule**:
   - Type: `PostgreSQL` (5432)
   - Source: The Security Group used by your **App Runner VPC Connector**.

## 🚀 Why Managed Services?
- **Zero Server Management**: AWS patches the OS and handles scaling.
- **Reliability**: RDS automatically handles database failover.
- **SSL by Default**: App Runner provides `https://` URLs automatically.
