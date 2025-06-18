# Blogging Platform

This project is a full-stack web application that allows users to create, view, edit, and delete blog posts, as well as add comments. It features user authentication to manage access to certain functionalities.

## Table of Contents

* [Features](#features)
* [Technologies Used](#technologies-used)
* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
    * [Running the Application](#running-the-application)
* [Project Structure](#project-structure)
* [API Endpoints (Backend)](#api-endpoints-backend)
* [Redux State Management (Frontend)](#redux-state-management-frontend)
* [Database](#database)

## Features

* **User Authentication:**
    * User signup, login, and logout.
    * JWT (JSON Web Tokens) for secure authentication.
* **Blog Post Management:**
    * Create new blog posts (title, content, author).
    * View a list of all blog posts.
    * View individual blog post details.
    * Edit and update user's own blog posts.
    * Delete user's own blog posts.
* **User Interface:**
    * User-friendly and responsive design using React and Tailwind CSS.
    * Intuitive user experience for blog interactions.
* **State Management:**
    * Centralized state management using Redux for predictable data flow.

## Technologies Used

### Backend

* **Node.js:** JavaScript runtime environment.
* **Express.js:** Web application framework for Node.js.
* **JSON Web Tokens (JWT):** For user authentication.
* **Database:** MongoDB

* (Note: While Node.js and Express are mentioned here, specific database drivers like Mongoose for MongoDB would be used in a real implementation.)

### Frontend

* **React:** JavaScript library for building user interfaces.
* **Redux:** Predictable state container for JavaScript apps.
* **React-Redux:** Official React bindings for Redux.
* **Tailwind CSS:** A utility-first CSS framework for rapid UI development.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Make sure you have the following installed:

* Node.js (LTS version recommended)
* Yarn (or npm)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/1999soumallya/blogging-platform.git
    cd blogging-platform
    ```

2.  **Install backend dependencies:**

    ```bash
    cd backend
    yarn
    # or npm install
    ```

3.  **Install frontend dependencies:**

    ```bash
    cd frontend
    yarn
    # or npm install
    ```

### Running the Application

This project is set up to run the backend and frontend separately.

* **Start the Backend:**

    ```bash
    cd backend
    yarn dev
    # or npm run dev
    ```
    The backend API will typically run on `http://localhost:3000`.

* **Start the Frontend:**

    ```bash
    cd frontend
    yarn dev
    # or npm run dev
    ```
    The React application will typically open in your browser at `http://localhost:5173`.

* **Start Both (if configured):**
    You can start both the backend and frontend simultaneously from the project root.

    ```bash
    yarn both
    ```
    The backend API will typically run on `http://localhost:3000`.
    The React application will typically open in your browser at `http://localhost:5173`.

## Project Structure

The project is typically structured into `backend` and `frontend` directories:

```bash
blogging-platform/
├── backend/
│   ├── connection/
│   ├── controllers/
│   ├── helpers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── validation/
│   ├── server.js
│   ├── package.json
│   └── ...
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── config/
│   │   ├── context/
│   │   ├── guards/
│   │   ├── layouts/
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   └── blog/
│   │   ├── services/ (for API calls)
│   │   │   ├── actions/
│   │   │   ├── constants/
│   │   │   ├── reducers/
│   │   │   └── store.js
│   │   ├── shared/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   ├── package.json
│   └── ...
│── package.json
└── README.md
```

## API Endpoints (Backend)

* **Authentication:**
    * `GET /api/auth`
    * `POST /api/auth/register`
    * `POST /api/auth/login`
    * `POST /api/auth/logout`
* **Blog Posts:**
    * `GET /api/blog/get-all` (Get all posts)
    * `GET /api/blog/get-details/:id` (Get single post)
    * `POST /api/blog/create` (Create new post - requires authentication)
    * `PUT /api/blog/update/:id` (Update post - requires authentication, must be owner)
    * `DELETE /api/blog/delete/:id` (Delete post - requires authentication, must be owner)

## Redux State Management (Frontend)

The Redux store manages global application state, including:

* **Auth State:** User login status, token, user information.
* **Blog Posts State:** List of posts, selected post details.

Actions will be dispatched to update the state, and reducers will handle these updates immutably.

## Database

This project uses MongoDB for data persistence.
