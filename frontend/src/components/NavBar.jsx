import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../utils/AuthContext';

function NavBar({ onLogout }) {
  const { token, updateToken } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (token) {
      fetch('http://localhost:5555/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setIsAdmin(data.admin);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          updateToken('');
        });
    }
  }, [token, updateToken]);

  const handleLogout = () => {
    onLogout();
  };

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
            {/* <li className="nav-item">
              <Link className="nav-link btn btn-success" to="/">
                Home
              </Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link btn btn-primary" to="/candidates">
                Candidate Info
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link btn btn-warning" to="/results">
                Live Result
              </Link>
            </li>
            {!token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link btn btn-secondary" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn btn-info" to="/sign-up">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
            {token && isAdmin && (
              <li className="nav-item">
                <Link className="nav-link btn btn-light" to="/register">
                  Register Candidate
                </Link>
              </li>
            )}
            {token && !isAdmin && (
              <li className="nav-item">
                <Link className="nav-link btn btn-success" to="/profile">
                  Vote
                </Link>
              </li>
            )}
            {token && (
              <li className="nav-item">
                <button
                  className="nav-link btn btn-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
