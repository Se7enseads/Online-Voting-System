import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          &lt; Vote App &gt;
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/candidate" className="nav-link">
                Candidate Info
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/live_result" className="nav-link">
                Live Result
              </Link>
            </li>
            {/* Check if the user is not authenticated */}
            {!current_user.is_authenticated && (
              <React.Fragment>
                <li className="nav-item">
                  <Link to="/auth/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/auth/register" className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </React.Fragment>
            )}
            {/* Check if the user is an admin */}
            {current_user.admin === 1 && (
              <li className="nav-item">
                <Link to="/candidate_register" className="nav-link">
                  Register Candidate
                </Link>
              </li>
            )}
            {/* Check if the user is authenticated */}
            {current_user.is_authenticated && (
              <li className="nav-item">
                <Link to="/auth/logout" className="nav-link">
                  Logout
                </Link>
              </li>
            )}
            {/* Check if the user is authenticated and not an admin */}
            {current_user.is_authenticated && current_user.admin !== 1 && (
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
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
