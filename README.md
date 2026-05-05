# Google Keep Clone - Frontend

This is the frontend client for the Google Keep Clone project, built with React and Vite. It provides a responsive, dark-themed UI for creating, editing, and managing notes.

## Features
- **Modern UI**: Dark mode interface inspired by Google Keep.
- **Responsive Layout**: Dynamic grid layout that adapts to different screen sizes.
- **Note Management**: Create, view, edit, and delete notes.
- **Authentication**: User signup and login functionality.

## Technologies Used
- React (with Hooks and Context API)
- Vite for fast development and building
- Axios for API requests
- CSS for styling

## Getting Started

### Prerequisites
Make sure you have Node.js installed on your machine.

### Installation

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the `client` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`.

## Deployment
This project is configured to be deployed on platforms like Vercel, Render, or Netlify. Make sure to set the `VITE_API_URL` environment variable in your deployment settings to point to your live backend URL (e.g., `https://your-backend.onrender.com/api`).
