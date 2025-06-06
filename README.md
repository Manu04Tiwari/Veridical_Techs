# Animated Auth System

A full-stack web application featuring animated login and signup forms with real, secure authentication. Built with React (frontend), Node.js/Express (backend), and MongoDB Atlas (cloud database).

---

## Features

- Modern animated login and signup forms (React, Framer Motion)
- User registration and login with validation
- Secure JWT-based authentication
- Password hashing with bcrypt
- MongoDB Atlas cloud database integration
- CORS enabled for frontend-backend communication

---

## Tech Stack

- **Frontend:** React, Framer Motion, Axios, CSS
- **Backend:** Node.js, Express, Mongoose, JWT, bcrypt, CORS
- **Database:** MongoDB Atlas (Cloud)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Manu04Tiwari/Veridical_Techs.git
cd Veridical_Techs
```

### 2. Setup Backend

```bash
cd backend
npm install
```

- Create a `.env` file in `backend` with your MongoDB connection string:
  ```
  MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/auth_demo?retryWrites=true&w=majority
  JWT_SECRET=your_jwt_secret_here
  ```

- Start the backend server:
  ```bash
  node server.js
  # or, for auto-reload on changes
  npx nodemon server.js
  ```

### 3. Setup Frontend

```bash
cd ../auth-client
npm install
npm start
```

---

## Usage

- Visit `http://localhost:3000` in your browser.
- Register a new user or login with existing credentials.
- The frontend communicates securely with the backend for authentication and user data.

---

## Folder Structure

```
Veridical_Techs/
├── backend/
│   ├── server.js
│   ├── userModel.js
|   ├── routes.js
|   ├── authController.js
│   ├── .env
│   └── ...
├── auth-client/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── ...
│   └── ...
├── images/
|   ├── backend success.png
|   ├── front page.png
|   └── ...
└── README.md
```

---

## Customization

- You can style the forms further in `auth-client/src/App.css`.
- To use your own MongoDB Atlas cluster, edit the `.env` file in `/backend`.
- Change the JWT secret to something strong and unique in production.

---

## Deployment

- Deploy the backend (Node.js) to services like Render, Heroku, or Railway.
- Deploy the frontend (React) to Vercel, Netlify, or GitHub Pages.
- Remember to set real environment variables on your deployment platforms.

---

## License

[MIT](LICENSE)

---

## Credits

Created by [Manu04Tiwari](https://github.com/Manu04Tiwari)

---

**Feel free to open issues or pull requests for improvements!**