import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { useAuth } from './utils/AuthContext';

const CandidateInformation = React.lazy(() =>
  import('./components/CandidateInformation'),
);
const HomePage = React.lazy(() => import('./components/HomePage'));
const Loading = React.lazy(() => import('./utils/Loading'));
const Login = React.lazy(() => import('./components/Login'));
const NavBar = React.lazy(() => import('./components/NavBar'));
const NotFound = React.lazy(() => import('./utils/NotFound'));
const Profile = React.lazy(() => import('./components/Profile'));
const RegisterCandidate = React.lazy(() =>
  import('./components/RegisterCandidate'),
);
const SignUp = React.lazy(() => import('./components/SignUp'));
const UnderConstruction = React.lazy(() => import('./utils/UnderConstruction'));

function App() {
  const { token, updateToken } = useAuth();
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem('darkMode')) || false;
  });

  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (token) {
      React.startTransition(() => {
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
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };

  return (
    <div className={`${darkMode ? 'dark' : null} bg-gray-100`}>
      <React.Suspense fallback={<Loading />}>
        <NavBar
          // darkMode={darkMode}
          isAdmin={isAdmin}
          onLogout={handleLogout}
          // toggleDarkMode={toggleDarkMode}
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
            <Route element={<NotFound />} path="*" />
          </Routes>
          <div className="fixed bottom-4 right-4 flex items-center space-x-2">
            <span className="text-gray-600 dark:text-gray-300">&#xF5A1;</span>
            <div className="relative h-6 w-12 rounded-full bg-gray-400 p-1 transition duration-300 ease-in-out dark:bg-gray-600">
              <input
                type="checkbox"
                className="hidden"
                id="dark-mode-toggle"
                checked={darkMode}
                onChange={toggleDarkMode}
              />
              <label
                htmlFor="dark-mode-toggle"
                className="absolute left-0 h-6 w-6 translate-x-0 transform cursor-pointer rounded-full bg-white transition dark:bg-gray-800"
              ></label>
            </div>
            <span className="text-gray-600 dark:text-gray-300">&#xF495;</span>
          </div>
        </main>
      </React.Suspense>
    </div>
  );
}

export default App;
