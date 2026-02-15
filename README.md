# Real-Time Poll Rooms

A full-stack real-time polling application built with React, Node.js, Socket.io, and MongoDB.

## Features

✅ Create polls with custom questions and options  
✅ Share polls via link  
✅ Real-time vote updates  
✅ IP-based + localStorage anti-abuse controls  
✅ Persistent data storage  

## Tech Stack

**Frontend:** React, Socket.io Client, Axios  
**Backend:** Node.js, Express, Socket.io, MongoDB, Mongoose  

## Setup

### Backend
```bash
cd backend
npm install
# Create .env file with MONGODB_URI
npm run dev
```

### Frontend
```bash
cd frontend
npm install
# Create .env file with REACT_APP_API_URL
npm start
```
