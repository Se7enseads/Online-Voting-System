import { Link } from 'react-router-dom';

function NavBar({ isAdmin, onLogout, token }) {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <nav>
      <div>
        <Link to="/">&lt; Vote App &gt;</Link>
        <div id="navbarNav">
          <ul>
            <li>
              <Link to="/candidates">Candidate Info</Link>
            </li>
            <li>
              <Link to="/results">Live Result</Link>
            </li>
            {!token && (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/sign-up">Sign Up</Link>
                </li>
              </>
            )}
            {token && isAdmin && (
              <li>
                <Link to="/register">Register Candidate</Link>
              </li>
            )}
            {token && !isAdmin && (
              <li>
                <Link to="/profile">Vote</Link>
              </li>
            )}
            {token && (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
