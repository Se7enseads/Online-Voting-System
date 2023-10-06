[![linting: pylint](https://img.shields.io/badge/linting-pylint-yellowgreen)](https://github.com/pylint-dev/pylint)
[![license](https://img.shields.io/badge/license-%20MIT%20-green.svg)](./LICENSE)

# Online-Voting-System

## Overview

This is a web-based election voting system built with Flask for the backend and React for the frontend. It allows registered university log in, and vote for their preferred candidates in both presidential and vice-presidential positions.

## Features

- User registration with email, national ID, name, and password.
- User login with email and password.
- User authentication and authorization using JWT tokens.
- Voting for presidential and vice-presidential candidates.
- Displaying candidate information including their images, names, roll numbers and agendas
- Admin privileges for registering candidates.
- Protection against double voting.
- Responsive web design for various screen sizes.

## Project Structure

The project is divided into two main parts: the frontend and the backend.

### Frontend (React)

The frontend of the application is built with React and organized as follows:

- `src/components`: Contains React components, including the CandidateInformation component for displaying candidate information.
- `src/App.js`: Main application component that handles routing.
- `src/index.js`: Entry point of the React application.

### Backend (Flask)

The backend of the application is built with Flask and follows the MVC (Model-View-Controller) architecture:

- `app.py`: Main Flask application file, including routes and configuration.
- `models.py`: Defines the database models for users, votes, and candidates.
- `api_bp.py`: Blueprint for handling API routes related to candidates and user profiles.
- `instance/app.db`: SQLite database file for storing user and vote data.

## Getting Started

To run the application locally, follow these steps:

### Run both frameworks

- install Honcho and run on root

```bash
 $ honcho start
```

### Backend Setup

1. Create a virtual environment and activate it:

   ```
   python -m venv venv
   source venv/bin/activate
   ```

2. Install the required Python packages:

   ```
   pip install -r requirements.txt
   ```

3. Set up environment variables by creating a `.env` file in the project root and add the following variables:

   ```
   DATABASE_URI=sqlite:///instance/app.db
   SECRET_KEY=your_secret_key
   ```

4. Initialize the database:

   ```
   flask db init
   flask db migrate
   flask db upgrade
   ```

5. Start the Flask backend server:

   ```
   python3 app.py
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:

   ```
   cd frontend
   ```

2. Install the frontend dependencies:

   ```
   npm install
   ```

3. Start the React development server:

   ```
   npm run dev
   ```

## Usage

- Access the application by opening a web browser and navigating to `http://localhost:5555`.
- Register as a new user or log in if you already have an account.
- Once logged in, you can view the list of presidential and vice-presidential candidates and vote for your preferred candidates.
- If you have admin privileges, you can register new candidates.
- Users are protected from voting multiple times.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- This project was built as a demonstration of web development using Flask and React.
- Special thanks to the Flask, React, and SQLAlchemy communities for their excellent documentation and resources.
