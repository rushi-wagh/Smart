# Smart Hostel Issue Management Platform

A full-stack web platform designed to help students and hostel authorities efficiently report, track, and resolve hostel and campus-related issues. The system improves transparency, reduces response time, and provides actionable insights using intelligent automation and analytics.

---

## Features

- Role-based authentication (Student / Management / Staff)
- Automatic issue categorization and priority detection
- Smart duplicate complaint detection and auto-merge
- Automatic staff assignment based on department and workload
- Complete issue lifecycle tracking
- Hostel announcements and notifications
- Lost & Found management system
- Real-time analytics dashboard
- Community interaction through comments and updates

---

## System Architecture

Frontend → Backend API → Intelligence Engine → Workflow Manager → Analytics Engine

---

## Intelligent Components

- NLP-based similarity scoring for detecting duplicate issues  
- Hybrid rule + NLP logic for category and priority classification  
- Workload-based routing engine for automatic staff assignment  

---

## Tech Stack

### Frontend
- React.js
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

### Intelligence & Logic
- NLP similarity matching  
- Weighted priority scoring  
- Rule-based automation  

---

## Setup Instructions


# Clone the repository
git clone <repo-url>

# Install backend dependencies
cd backend
npm install

# Run backend server
npm run dev

# Install frontend dependencies
cd ../frontend
npm install

# Run Frontend
npm run dev
