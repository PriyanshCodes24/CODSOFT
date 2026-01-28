
# InstaJob

InstaJob is a full-stack job portal web application built as part of my **CODSOFT Web Development Internship**.  
It allows applicants to browse and apply for jobs, while recruiters can post jobs and manage applications.

The focus of this project was to build a **real-world workflow**, clean UI/UX, and proper role-based access.

---

## Features

### 🔐 Authentication & Authorization
- User registration and login
- JWT-based authentication
- Role-based access control (Applicant / Recruiter)
- Protected routes on frontend and backend

### Applicant
- Browse and search jobs by title and location
- View detailed job descriptions
- Apply to jobs with resume upload (PDF)
- Track application status (Pending / Accepted / Rejected)
- Personal dashboard to manage applications

### Recruiter
- Post new job listings
- View jobs posted by them
- View applicants for each job
- Accept or reject applications
- Recruiter-specific dashboard

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Axios
- Framer Motion (animations)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer (resume upload)

---

## 🧠 Application Flow (High Level)

* Users register and log in
* JWT is issued and stored on the client
* Protected routes verify token and role
* Applicants can apply to jobs
* Recruiters manage jobs and applications
* Application status updates are reflected in real time

---

## Environment Variables

### Backend (`server/.env`)

```
PORT=2000
MONGO_URI=your_mongodb_uri
SECRET_KEY=your_jwt_secret
```

### Frontend (`client/.env`)

```
VITE_API=http://localhost:2000/api
```

---

##  How to Run Locally

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Author

Priyansh Patel
Web Developer Intern – CODSOFT

GitHub: https://github.com/PriyanshCodes24
