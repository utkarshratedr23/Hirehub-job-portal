HireHub is a full-stack job portal that connects job seekers with employers. The platform delivers real-time job notifications to seekers based on their skills, location, and preferences. This ensures job seekers never miss an opportunity that aligns with their career goals.

🚀 Features

Real-Time Job Alerts: Job seekers receive instant email notifications when relevant jobs are posted.

Job Posting & Management: Employers can post jobs and manage applications seamlessly.

Profile Management: Users can update their profiles, resumes, and preferences.

Secure Authentication: Secure login and registration for both job seekers and employers.

Responsive UI: Currently still working on the UI part to make it look more attractive and better .

🛠️ Tech Stack

Frontend:

React.js

Redux

Vite (for fast build and development)

CSS

Backend:

Node.js

Express.js

MongoDB (Database)

Mongoose (ODM for MongoDB)

Cloudinary (For image uploads)

JWT (Authentication)

bcrypt (Password hashing)

Node-Cron (For scheduling email notifications)

Dev Tools:

Nodemon (For live server reloads)

ESLint (For code quality)

📩 Real-Time Email Notifications

The portal uses Node-Cron to schedule and automate job notifications. Whenever a job matching the job seeker's profile and location is posted, an email alert is triggered to their registered email ID.

📂 Project Structure

HireHub/
├── backend/
│   ├── server.js
│   ├── models/
│   ├── routes/
│   └── controllers/
│
├── front end/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── main.jsx
│   └── public/
│
└── package.json

🛠️ Installation

# Clone the repository
git clone https://github.com/utkarshratedr23/Hirehub-job-portal

# Navigate to project directory
cd hirehub-job-portal

# Install dependencies for backend
npm install

# Install dependencies for frontend
cd frontend
npm install

# Start the backend server
npm run dev

# Start the frontend
npm run frontend

🤝 Contributing

Contributions are welcome! If you want to add new features or improve the project, feel free to submit a pull request.

📄 License

This project is licensed under the MIT License.

✨ Connect with Me


Email: Bhargavautkarsh074@gmail.com

Let's build something great together