# MERN OAuth Authentication System

A full-stack authentication application built with **MongoDB**, **Express**, **React**, and **Node.js** (MERN stack) that integrates OAuth 2.0 with **Google** and **Facebook** login providers, along with JWT-based authentication.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **OAuth 2.0 Authentication**
  - Google OAuth 2.0 login
  - Facebook OAuth login
  
- **User Management**
  - Secure user registration and login
  - User profile management
  - Session-based authentication using Passport.js
  
- **Frontend**
  - Clean and responsive React UI
  - Protected routes for authenticated users
  - Home and Profile pages
  
- **Backend**
  - Express.js REST API
  - MongoDB database for user storage
  - CORS enabled for secure cross-origin requests
  - Environment variable configuration with dotenv

## 🛠 Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Passport.js** - Authentication middleware
  - passport-google-oauth20 - Google OAuth strategy
  - passport-facebook - Facebook OAuth strategy
- **express-session** - Session management
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variable management

### Frontend
- **React** - JavaScript library for building UI
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **CSS** - Styling

## 📁 Project Structure

```
mernOauth/
├── backend/
│   ├── config/
│   │   └── passport.js          # Passport.js configuration
│   ├── models/
│   │   └── User.js              # User schema and model
│   ├── index.js                 # Express server entry point
│   ├── package.json             # Backend dependencies
│   └── .env                     # Environment variables (not in repo)
│
├── frontend/
│   ├── public/
│   │   ├── index.html           # HTML template
│   │   ├── manifest.json        # PWA manifest
│   │   └── robots.txt           # SEO robots file
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.js          # Home page
│   │   │   └── Profile.js       # User profile page
│   │   ├── App.js               # Main React component
│   │   ├── App.css              # App styling
│   │   ├── index.js             # React entry point
│   │   ├── index.css            # Global styles
│   │   └── setupTests.js        # Test configuration
│   ├── package.json             # Frontend dependencies
│   └── README.md                # Frontend documentation
│
└── README.md                    # This file
```

## ✅ Prerequisites

Before getting started, ensure you have installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** (local or cloud instance via MongoDB Atlas)
- **Git**

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/mern-oauth-authentication.git
cd mernOauth
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## ⚙️ Configuration

### Backend Setup

1. Create a `.env` file in the `backend` directory:

```bash
cd backend
touch .env
```

2. Add the following environment variables to `.env`:

```env
# MongoDB URI
MONGO_URI=mongodb://localhost:27017/mern-oauth
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-oauth

# Session Secret
COOKIE_KEY=your_secret_key_here

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Facebook OAuth Credentials
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret

# Server Port (optional, defaults to 5000)
PORT=5000
```

### Obtaining OAuth Credentials

#### Google OAuth 2.0
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Set Authorized redirect URIs to `http://localhost:5000/auth/google/callback`
6. Copy the Client ID and Client Secret

#### Facebook OAuth
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Facebook Login product
4. Set OAuth Redirect URIs to `http://localhost:5000/auth/facebook/callback`
5. Copy the App ID and App Secret

## 🚀 Running the Application

### Start MongoDB (if using local instance)

```bash
mongod
```

### Start Backend Server

```bash
cd backend
npm start
# or
node index.js
```

The backend will run on **http://localhost:5000**

### Start Frontend Development Server

In a new terminal:

```bash
cd frontend
npm start
```

The frontend will open automatically at **http://localhost:3000**

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/auth/google` | Initiates Google OAuth login |
| GET | `/auth/google/callback` | Google OAuth callback |
| GET | `/auth/facebook` | Initiates Facebook OAuth login |
| GET | `/auth/facebook/callback` | Facebook OAuth callback |
| GET | `/logout` | Logs out user and destroys session |
| GET | `/user` | Retrieves current logged-in user data |

## 💻 Usage

### User Flow

1. **Home Page**: User lands on the home page with login buttons
2. **OAuth Login**: User clicks "Login with Google" or "Login with Facebook"
3. **OAuth Provider**: User authenticates with their Google/Facebook account
4. **Callback**: After authentication, user is redirected to the profile page
5. **Profile Page**: User can view their profile information
6. **Logout**: User can logout, which destroys the session

### Authentication Flow

1. User initiates OAuth login → Redirected to provider
2. User authorizes app → Provider sends authorization code to callback
3. Backend exchanges code for access token
4. User data is fetched and stored in MongoDB
5. Session is created and user is authenticated
6. User is redirected to profile page

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the `package.json` file for details.

## 📧 Contact & Support

For questions or issues, please open an issue in the repository or contact the maintainer.

---

**Happy Coding! 🎉**
