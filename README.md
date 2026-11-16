 User Authentication Web Application

Project Details

Project Name: User Authentication Web App
Developed By: Payal Makani
Course: B.Tech CSE (Data Science)


Introduction

This project is a simple User Authentication Web Application developed using Node.js, Express.js, MongoDB and JWT.

The application allows users to register, log in, access their dashboard and log out securely. It helps in understanding how user authentication works in web development.

Features

- User Registration
- User Login
- Password Encryption using bcrypt
- JWT-based Authentication
- Protected Dashboard
- User Logout
- MongoDB Database Connectivity
- Simple and Responsive User Interface

Technologies Used

Technology| Purpose
HTML| Website structure
CSS| Website styling
Bootstrap| Responsive design
JavaScript| Frontend functionality
Node.js| Backend runtime
Express.js| Server and routing
MongoDB| Database
Mongoose| Database connection
bcryptjs| Password hashing
JWT| User authentication

Project Structure

experiment-9-authentication/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── server.js
├── package.json
├── .gitignore
└── README.md

Installation and Setup

Follow these steps to run the project locally:

Step 1: Clone the repository.

git clone https://github.com/payalmakani08/experiment-9-authentication.git

Step 2: Open the project folder.

cd experiment-9-authentication

Step 3: Install the required packages.

npm install

Step 4: Create a ".env" file in the main project folder and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000

Replace the values with your own MongoDB connection string and secret key.

Step 5: Start the application.

npm start

Step 6: Open the following address in your browser:

http://localhost:3000

How the Application Works

1. Open the website.
2. Click on the Register option.
3. Enter your name, email and password.
4. Register your account.
5. Log in using your registered email and password.
6. After successful login, the dashboard displays user details.
7. Click the Logout button to end the session.

Security Features

- Passwords are stored in hashed form using bcryptjs.
- JWT is used to verify authenticated users.
- Protected routes prevent unauthorized dashboard access.
- Environment variables are used to store sensitive configuration details.

Deployment

The application is deployed using Render.

The MongoDB database is hosted using MongoDB Atlas.

Conclusion

Through this, I learned how to develop a basic user authentication system using Node.js, Express.js, MongoDB and JWT. I also understood password hashing, database connectivity, API requests and protected routes.

---

Developed by Payal Makani
B.Tech CSE (Data Science)
