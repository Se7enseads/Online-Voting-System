import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  // Assuming you have a user state that tracks authentication
  const isAuthenticated = true; // Replace with your actual authentication state
  const isAdmin = true; // Replace with your actual admin state

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          &lt; Vote App &gt;
        </Link>
        <button
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          className="navbar-toggler"
          data-bs-target="#navbarNav"
          data-bs-toggle="collapse"
          type="button"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="navbar-collapse collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/candidate">
                Candidate Info
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/live_result">
                Live Result
              </Link>
            </li>
            {/* Check if the user is not authenticated */}
            {!isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/auth/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/auth/register">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
            {/* Check if the user is an admin */}
            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/candidate_register">
                  Register Candidate
                </Link>
              </li>
            )}
            {/* Check if the user is authenticated */}
            {isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link" to="/auth/logout">
                  Logout
                </Link>
              </li>
            )}
            {/* Check if the user is authenticated and not an admin */}
            {isAuthenticated && !isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Vote
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
