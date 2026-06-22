# PrepAI – AI-Powered Interview Preparation Platform

> An intelligent, comprehensive interview preparation platform powered by AI to help candidates excel in their job interviews.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Architecture](#project-architecture)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)

## 🎯 Overview

**PrepAI** is a cutting-edge interview preparation platform that leverages artificial intelligence to provide candidates with:

- Intelligent interview simulations powered by Google's Gemini API
- Personalized feedback and improvement recommendations
- Resume parsing and analysis
- Interview question generation based on job descriptions
- Real-time AI coaching and tips
- Progress tracking and performance analytics

Whether you're preparing for your first interview or aiming for senior positions, PrepAI adapts to your needs and helps you succeed.

## ✨ Features

### 🤖 AI-Powered Features
- **Intelligent Interview Simulation**: Real-time practice interviews with AI feedback
- **Gemini API Integration**: Advanced natural language processing for realistic responses
- **Personalized Recommendations**: AI-driven insights based on your performance
- **Resume Parser**: Automatic extraction and analysis of resume information
- **Question Generator**: Smart question generation based on job role and experience level

### 👤 User Management
- **Authentication & Authorization**: Secure JWT-based authentication
- **User Profiles**: Comprehensive user information and interview history
- **Session Management**: Track multiple interview sessions
- **Performance Dashboard**: View detailed analytics and progress

### 📄 Interview Management
- **Multiple Interview Types**: Technical, behavioral, and domain-specific interviews
- **Real-time Feedback**: Instant AI-generated feedback on responses
- **Response Recording**: Audio/text recording of answers with timestamps
- **Performance Scoring**: Detailed scoring based on multiple criteria

### 📊 Analytics & Tracking
- **Progress Dashboard**: Visual representation of improvement over time
- **Performance Metrics**: Detailed analysis of strengths and weaknesses
- **Comparative Analysis**: Compare your performance across different sessions
- **Export Reports**: Download comprehensive interview reports

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library with hooks
- **Vite** - Lightning-fast build tool
- **Zustand** - State management
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Redis** - Caching and session management
- **JWT** - Authentication
- **Socket.io** - Real-time communication
- **Google Generative AI** - AI powered interviews
- **Multer** - File upload handling
- **AWS S3** - Cloud storage for resumes/recordings

### Development Tools
- **Nodemon** - Auto-reload during development
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **npm workspaces** - Monorepo management

## 📁 Project Structure

```
PrepAI/
├── client/                          # React Frontend (Vite)
│   ├── src/
│   │   ├── api/                    # Axios instances & API calls
│   │   ├── components/             # Shared UI components
│   │   │   ├── Interview/
│   │   │   ├── Dashboard/
│   │   │   ├── Auth/
│   │   │   └── Common/
│   │   ├── pages/                  # Route-level pages
│   │   │   ├── LoginPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── InterviewPage.jsx
│   │   │   └── ProfilePage.jsx
│   │   ├── store/                  # Zustand state stores
│   │   │   ├── authStore.js
│   │   │   ├── interviewStore.js
│   │   │   └── userStore.js
│   │   ├── hooks/                  # Custom React hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useInterview.js
│   │   │   └── useFetch.js
│   │   ├── utils/                  # Helpers & constants
│   │   │   ├── constants.js
│   │   │   ├── validators.js
│   │   │   └── formatters.js
│   │   ├── App.jsx                 # Root component
│   │   └── main.jsx                # Entry point
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── server/                          # Node.js Backend
│   ├── src/
│   │   ├── config/                 # DB, Redis, S3, env config
│   │   │   ├── database.js
│   │   │   ├── redis.js
│   │   │   ├── s3.js
│   │   │   └── gemini.js
│   │   ├── controllers/            # Route handlers
│   │   │   ├── auth.controller.js
│   │   │   ├── user.controller.js
│   │   │   ├── interview.controller.js
│   │   │   ├── resume.controller.js
│   │   │   └── feedback.controller.js
│   │   ├── middleware/             # Express middleware
│   │   │   ├── auth.middleware.js
│   │   │   ├── rbac.middleware.js
│   │   │   └── errorHandler.js
│   │   ├── models/                 # Mongoose schemas
│   │   │   ├── User.js
│   │   │   ├── Interview.js
│   │   │   ├── Resume.js
│   │   │   ├── Feedback.js
│   │   │   └── Question.js
│   │   ├── routes/                 # Express routers
│   │   │   ├── auth.routes.js
│   │   │   ├── user.routes.js
│   │   │   ├── interview.routes.js
│   │   │   ├── resume.routes.js
│   │   │   └── feedback.routes.js
│   │   ├── services/               # Business logic
│   │   │   ├── gemini.service.js   # Gemini AI integration
│   │   │   ├── email.service.js    # Email notifications
│   │   │   ├── parser.service.js   # Resume parsing
│   │   │   ├── interview.service.js
│   │   │   └── feedback.service.js
│   │   ├── utils/                  # Helper functions
│   │   │   ├── tokenHelpers.js     # JWT utilities
│   │   │   ├── responseFormatter.js
│   │   │   └── validators.js
│   │   └── app.js                  # Express app setup
│   ├── index.js                    # Server entry point
│   ├── .env                        # Environment variables
│   ├── package.json
│   └── .gitignore
│
├── .gitignore                       # Root gitignore
├── .prettierrc                      # Code formatting config
├── .eslintrc.js                     # Linting config
├── package.json                     # Root workspace config
└── README.md                        # This file
```

## 📋 Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v16.0.0 or higher)
- **npm** (v8.0.0 or higher)
- **MongoDB** (Local or MongoDB Atlas)
- **Redis** (For caching and sessions)
- **Git** (For version control)

### API Keys Required

- **Google Generative AI API Key** - [Get here](https://ai.google.dev/)
- **AWS S3 Credentials** (Optional, for file storage)
- **SendGrid/Email Service API** (Optional, for notifications)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/ManishAditiya/PrepAI-AI-Powered-Interview-Preparation-Platform.git
cd PrepAI
```

### 2. Install Root Dependencies

```bash
npm install
```

This will install dependencies for both client and server using npm workspaces.

### 3. Individual Setup (if needed)

**Client Setup:**
```bash
cd client
npm install
```

**Server Setup:**
```bash
cd server
npm install
```

## 🔐 Environment Setup

### Server Environment Variables

Create a `.env` file in the `server/` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/prepai
# Or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/prepai

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
REFRESH_TOKEN_SECRET=your_refresh_token_secret

# Google Generative AI
GEMINI_API_KEY=your_gemini_api_key_here

# AWS S3 (Optional)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET=your-s3-bucket-name
AWS_REGION=us-east-1

# Email Service (Optional)
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=your_sendgrid_key
EMAIL_FROM=noreply@prepai.com

# Frontend URL
CLIENT_URL=http://localhost:5173
```

### Client Environment Variables

Create a `.env.local` file in the `client/` directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## ▶️ Running the Application

### Option 1: Run Both Client and Server (from root)

```bash
npm run dev
```

This will start:
- **Frontend**: http://localhost:5173 (Vite dev server)
- **Backend**: http://localhost:5000 (Express server)

### Option 2: Run Separately

**Start Backend:**
```bash
cd server
npm run dev
```

**Start Frontend (in another terminal):**
```bash
cd client
npm run dev
```

### Production Build

**Build Frontend:**
```bash
cd client
npm run build
```

**Build Backend:**
```bash
npm run build --workspace=server
```

## 📡 API Documentation

### Authentication Endpoints

```
POST   /api/auth/register        # User registration
POST   /api/auth/login           # User login
POST   /api/auth/refresh         # Refresh JWT token
POST   /api/auth/logout          # User logout
```

### Interview Endpoints

```
GET    /api/interview            # Get all interviews
POST   /api/interview            # Start new interview
GET    /api/interview/:id        # Get interview details
PUT    /api/interview/:id        # Update interview
DELETE /api/interview/:id        # Delete interview
POST   /api/interview/:id/answer # Submit answer
```

### Resume Endpoints

```
POST   /api/resume/upload        # Upload resume
GET    /api/resume/:id           # Get resume details
DELETE /api/resume/:id           # Delete resume
POST   /api/resume/parse         # Parse resume with AI
```

### Feedback Endpoints

```
GET    /api/feedback/:id         # Get feedback for interview
POST   /api/feedback/generate    # Generate AI feedback
```

## 🏗️ Project Architecture

### Frontend Architecture

```
Component-based UI
    ↓
Zustand Store (State Management)
    ↓
Axios API Client
    ↓
REST API / WebSocket
```

### Backend Architecture

```
Express App
    ↓
Routes
    ↓
Controllers
    ↓
Services (Business Logic)
    ↓
Models (MongoDB)
    ↓
Gemini AI / External APIs
```

### Data Flow

1. **User Authentication**: JWT tokens stored securely
2. **Interview Session**: Real-time communication via Socket.io
3. **AI Processing**: Gemini API processes responses
4. **Feedback Generation**: ML models analyze answers
5. **Storage**: Results stored in MongoDB, files in S3

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit your changes**
   ```bash
   git commit -m "Add some feature"
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request**

### Coding Standards

- Follow ESLint rules
- Use Prettier for formatting
- Write meaningful commit messages
- Add comments for complex logic
- Test thoroughly before submitting PR

## 📞 Support

For support, email support@prepai.com or open an issue on GitHub.

### Troubleshooting

**Port Already in Use:**
```bash
# Kill process on port 5000
lsof -i :5000 | grep -v PID | awk '{print $2}' | xargs kill -9
```

**MongoDB Connection Issues:**
- Ensure MongoDB is running locally or connection string is correct
- Check network connectivity if using MongoDB Atlas

**Redis Connection Issues:**
- Ensure Redis is running: `redis-server`
- Check Redis URL in `.env`

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👨‍💻 Author

**Manish Aditiya**
- GitHub: [@ManishAditiya](https://github.com/ManishAditiya)
- Email: contact@manishaditiya.com

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Google Generative AI](https://ai.google.dev/)
- [Socket.io Guide](https://socket.io/docs/)

## 🚀 Roadmap

- [ ] Mobile app (React Native)
- [ ] Video interview recording
- [ ] More AI models integration
- [ ] Behavioral analysis
- [ ] Company-specific interview prep
- [ ] Interview mock sessions with mentors
- [ ] Advanced analytics dashboard

---

**Happy Interviewing! 🎯**

*Made with ❤️ by the PrepAI Team*
