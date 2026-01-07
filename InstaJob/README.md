
# InstaJob

A full-stack job portal where **recruiters can post jobs** and **applicants can browse and apply**, built with a clean UI and a simple, role-based workflow.

This project focuses on **core functionality**, clean separation of concerns, and a smooth user experience rather than over-engineering.

---

## Features

### Authentication

* User registration & login using JWT
* Role-based access (`applicant`, `recruiter`)
* Persistent login using token storage

### Applicant

* Browse all available jobs
* Search jobs by title and location
* View detailed job descriptions
* Apply to jobs (only once per job)
* Track applied jobs and application status from dashboard

### Recruiter

* Post new job openings
* View all jobs posted by them
* View applications for each job
* Accept or reject applications

---

## Tech Stack

### Frontend

* React (Vite)
* React Router
* Axios
* Tailwind CSS
* Context API (Auth state)
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Role-based middleware

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

### Backend (`.env`)

```
PORT=2000
MONGO_URI=your_mongodb_uri
SECRET_KEY=your_jwt_secret
```

### Frontend (`.env`)

```
VITE_API=http://localhost:2000/api
```

---

##  How to Run Locally

### Backend

```bash
cd backend
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

## Demo Roles

You can register users manually and assign roles in the database:

* **Applicant** → apply to jobs
* **Recruiter** → post jobs and manage applications

---

## Notes

* This project prioritizes **clarity and correctness** over advanced features.
* UI is intentionally kept minimal and professional.
* Some enhancements (pagination, email notifications, analytics) are intentionally left out to keep scope focused.


---

## Author

Built by **Priyansh Patel**
Computer Engineering Student | Full-Stack Developer
