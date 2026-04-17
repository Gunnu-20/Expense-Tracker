# 💸 Expense Tracker (Full-Stack MERN App)

## 🚀 Overview

This is a production-level full-stack Expense Tracker application that allows users to manage their daily expenses, track budgets, and visualize spending patterns through interactive dashboards.

The project focuses on scalability, security, and real-world user experience rather than just basic CRUD operations.

---

## ✨ Features

### 🔐 Authentication & Security

* JWT Authentication (Access + Refresh Tokens)
* Password hashing using bcrypt
* Auto Token Refresh
* Protected Routes (Frontend + Backend)
* Rate Limiting for API protection

### 💸 Expense Management

* Add, Edit, Delete Expenses
* Category-based organization
* Search functionality
* Date Range Filtering
* Server-side Pagination

### 📊 Analytics & Dashboard

* Area Chart for trends
* Pie Chart for category breakdown
* Monthly Expense Trends (last 6 months)
* Category-wise expense analysis

### 🧾 Budgeting

* Set budget per category
* Budget exceeded alerts

### 📤 Utility Features

* Export data to CSV
* Toast Notifications
* Loading Skeletons
* Dark Mode Support
* Fully Responsive (Mobile-first)

### 🏗️ Architecture

* MVC Folder Structure
* RESTful APIs
* Input Validation (Backend)
* Global Error Handling

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Aggregation Pipelines used for analytics)

### Other Tools

* JWT (Authentication)
* Bcrypt (Password Hashing)

---

## ⚙️ Setup & Run

### Install dependencies

#### Backend

```
cd backend
npm install
```

#### Frontend

```
cd frontend
npm install
```

### Run the project

#### Backend

```
nodemon server.js
```

#### Frontend

```
npm run dev
```

npm run dev

```

#### Frontend
```

npm start

```

---

## 📌 API Highlights

- `POST /auth/register` → Register user
- `POST /auth/login` → Login user
- `POST /auth/refresh` → Refresh access token
- `GET /expenses` → Get all expenses (with pagination & filters)
- `POST /expenses` → Add expense
- `PUT /expenses/:id` → Update expense
- `DELETE /expenses/:id` → Delete expense

---

## 🧪 Testing Strategy

- Manual testing for all user flows
- API testing using Postman
- Edge case handling (invalid inputs, expired tokens, empty states)

---

## ⚡ Challenges Faced

- Implementing secure JWT refresh token flow
- Handling MongoDB aggregation for analytics
- Managing filters, pagination, and search together
- Ensuring consistent UI/UX with loading and edge cases
- Securing APIs with rate limiting

---

---

## 🌐 Live Demo
(Add your deployed link here - Vercel / Render)

---

## 📂 Folder Structure
```

/backend
/controllers
/models
/routes
/middlewares

/frontend
/components
/pages
/services

```

---

## 🤝 Contributing
Feel free to fork this repo and submit pull requests.

---

## ⭐ Acknowledgements
This project was built as part of my learning journey to become a full-stack developer.

---

## 📬 Contact
If you have any feedback or suggestions, feel free to connect!

```

