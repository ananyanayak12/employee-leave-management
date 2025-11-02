# 🧾 Employee Leave Management System

A simple full-stack web application built using Node.js, Express, MongoDB, and Vanilla JavaScript.
This project allows employees to apply for leaves and lets admins approve or reject them easily.

Features

Employee
- Register and Login securely (JWT-based authentication)
- Apply for leaves (with reason and date range)
- View the status of their leaves (Pending / Approved / Rejected)

Admin
- Login as admin
- View all leave requests from employees
- Approve or Reject leaves in one click
- View status updates reflected in real time

---

Tech Stack


Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express.js
Database: MongoDB (Mongoose)
Authentication: JWT (JSON Web Token)

---

Installation & Setup

1. Clone the repository
git clone https://github.com/your-username/employee-leave-management.git
cd employee-leave-management

2. Install dependencies
npm install

3. Set up environment variables
Create a .env file in the root folder and add:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
4. Start the server
node server.js

Then open your browser and go to:
http://localhost:5000

Default Admin Credentials:
You can either register manually and set the role to admin in MongoDB,
or use this pre-created admin account:
Email: admin@example.com
Password: admin123

How to Use:
Employee Flow:
Register or login using your email and password.
Go to Apply Leave, fill in the reason, start date, and end date.
Submit your leave request.
View your leave requests in the "My Leave Requests" section.
Status will show as Pending, Approved, or Rejected.

Admin Flow
Login with the Admin account.
You’ll see the Admin Dashboard with all leave requests.
Approve or Reject each request.

Once actioned, employees see the updated status instantly.

Project Structure:
employee-leave-management/
│
├── config/
│   └── db.js
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
├── models/
│   ├── Leave.js
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   └── leaveRoutes.js
├── public/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── server.js
├── package.json
└── README.md

Author
[ananyanayak12](https://github.com/ananyanayak12)