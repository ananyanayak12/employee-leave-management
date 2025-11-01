# Employee Leave Management System

A full-stack Employee Leave Management system built using Node.js, Express, and MongoDB.

Features
- Employee registration and login (JWT authentication)
- Role-based access (Admin & Employee)
- Leave application and approval workflow
- MongoDB database for storing user and leave data

Tech Stack
- Backend: Node.js, Express.js  
- Database: MongoDB (Mongoose)  
- Authentication: JWT  
- Environment Variables: dotenv  

Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/ananyanayak12/employee-leave-management.git
   cd employee-leave-management

Install dependencies:
npm install


Create a .env file in the root folder:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000


Run the application:
npm start


Open your browser:
http://localhost:5000

Project Structure:
employee-leave-management/
│
├── config/             # MongoDB connection
├── middleware/         # Auth middlewares
├── models/             # Mongoose models
├── routes/             # API routes
├── server.js           # Entry point
├── .env                # Environment variables (excluded from Git)
└── .gitignore