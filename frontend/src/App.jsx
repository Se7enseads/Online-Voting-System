import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { useAuth } from './utils/AuthContext';
import UnderConstruction from './components/UnderConstruction';

const CandidateInformation = React.lazy(() =>
  import('./components/CandidateInformation'),
);
const HomePage = React.lazy(() => import('./components/HomePage'));
const Login = React.lazy(() => import('./components/Login'));
const NavBar = React.lazy(() => import('./components/NavBar'));
const NotFound = React.lazy(() => import('./components/NotFound'));
const Profile = React.lazy(() => import('./components/Profile'));
const RegisterCandidate = React.lazy(() =>
  import('./components/RegisterCandidate'),
);
const SignUp = React.lazy(() => import('./components/SignUp'));
// const VoteChart = React.lazy(() => import('./components/VoteChart'));

function App() {
  const { token, updateToken } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate();
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
          updateToken('');
          return `Error fetching data: ${error}`;
        });
    }
  }, [token, updateToken]);

  const handleLogout = () => {
    sessionStorage.clear('token');
    updateToken('');
    setTimeout(() => {
      navigate('/');
    }, 2500);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${darkMode ? 'dark' : null} bg-gray-100`}>
      <React.Suspense fallback={<div>Loading...</div>}>
        <NavBar
          darkMode={darkMode}
          isAdmin={isAdmin}
          onLogout={handleLogout}
          toggleDarkMode={toggleDarkMode}
          token={token}
        />
        <main>
          <Routes>
            <Route element={<HomePage />} exact path="/" />
            <Route
              element={<CandidateInformation isAdmin={isAdmin} />}
              path="/candidates"
            />
            <Route
              element={<Login token={token} updateToken={updateToken} />}
              path="/login"
            />
            <Route element={<RegisterCandidate />} path="/register" />
            <Route element={<SignUp />} path="/sign-up" />
            <Route element={<UnderConstruction />} path="/results" />
            <Route element={<Profile />} path="/profile" />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </React.Suspense>
    </div>
  );
}

export default App;
