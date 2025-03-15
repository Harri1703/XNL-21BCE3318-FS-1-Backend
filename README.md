# XNL-21BCE3318-FS-1-Backend

Fintech Platform - Backend

This is the backend of the Fintech Platform, built using Node.js, Express.js, and Sequelize ORM. It provides a secure API for user authentication, account management, transactions, and admin functionalities. The backend is hosted on Railway, with AWS PostgreSQL as the database, and EKS configured as a standby infrastructure.

Features

User Authentication using JWT-based authentication system
Role-Based Access Control (RBAC) with Admin and user roles
Account Management where users can create and manage bank accounts
Transactions including deposit, withdraw, and transfer funds securely
Admin Features allowing admins to fetch all user data
RESTful API with well-structured endpoints for seamless frontend integration

Technologies Used

Node.js and Express.js as the backend framework
Sequelize ORM to handle database operations
PostgreSQL as the database hosted on AWS
JWT Authentication for secure login and session management
Railway as the deployment and hosting platform
EKS (Amazon Elastic Kubernetes Service) as standby infrastructure for scalability
Elastic Beanstalk for future automated deployments and monitoring

Getting Started

Step 1 Clone the Repository

git clone https://github.com/Harri1703/XNL-21BCE3318-FS-1-Backend.git
cd XNL-21BCE3318-FS-1-Backend

Step 2 Install Dependencies

npm install

Step 3 Set Up Environment Variables

Create a .env file in the project root and add the following variables

PORT=5000
DATABASE_URL=your_postgres_database_url
JWT_SECRET=your_jwt_secret

Step 4 Run the Server Locally

npm start

The backend will run on http://localhost:5000

Deployment on Railway

Step 1 Install Railway CLI

npm install -g railway

Step 2 Login to Railway

railway login

Step 3 Link Project to Railway

railway link

Step 4 Deploy to Railway

railway up

The backend will be deployed and accessible via Railway's generated URL

API Endpoints

Authentication APIs

POST /auth/register Register a new user
POST /auth/login Login and receive JWT token

User APIs

GET /users/me Get logged-in user details
GET /users/all Fetch all users (Admin only)

Account APIs

POST /accounts/create Create a new account
GET /accounts/fetch Fetch user’s accounts
POST /accounts/getbalance Check account balance

Transaction APIs

POST /accounts/deposit Deposit money
POST /accounts/withdraw Withdraw money
POST /accounts/transfer Transfer money between accounts

Database Schema

AWS PostgreSQL is used to manage data securely. The key tables include

Users Table

id Unique user ID
name Full name
email User email
password Encrypted password
role User role (user or admin)
createdAt and updatedAt timestamps

Accounts Table

id Unique account ID
accountNumber Auto-generated unique number
balance Account balance
userId Linked user ID

Transactions Table

id Unique transaction ID
accountNumber Associated account number
type deposit, withdraw, transfer
amount Transaction amount
createdAt Timestamp

Architecture

The system follows a microservices-inspired approach with

Node.js Backend running on Railway
AWS PostgreSQL for database management
JWT Authentication for security
EKS (Elastic Kubernetes Service) as a standby infrastructure for scaling
Elastic Beanstalk for potential future automated deployment

Contributing

If any issues are found or suggestions are available, feel free to submit a pull request

Developed by 21BCE3318 Sriharri K - For XNL-FS-1
