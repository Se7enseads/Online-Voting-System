import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import CandidateInformation from './components/CandidateInformation';
import HomePage from './components/HomePage';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Profile from './components/Profile';
import RegisterCandidate from './components/RegisterCandidate';
import SignUp from './components/SignUp';
import VoteChart from './components/VoteChart';
import { useAuth } from './utils/AuthContext';

function App() {
  const { token, updateToken } = useAuth();
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (token) {
      fetch('http://localhost:10000/api/profile', {
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
      setShowAlert(true);
    }, 3000);
  };

  return (
    <div className="dark:bg-slate-900">
      <NavBar isAdmin={isAdmin} onLogout={handleLogout} token={token} />
      <main>
        <Routes>
          <Route element={<HomePage alert={showAlert} />} exact path="/" />
          <Route
            element={<CandidateInformation isAdmin={isAdmin} />}
            path="/candidates"
          />
          {/* <Route element={<Candidates />} path={'/candidates'} /> */}
          <Route
            element={<Login token={token} updateToken={updateToken} />}
            path="/login"
          />
          <Route element={<RegisterCandidate />} path="/register" />
          <Route element={<SignUp />} path="/sign-up" />
          <Route element={<VoteChart />} path="/results" />
          <Route element={<Profile />} path="/profile" />
        </Routes>
      </main>
    </div>
  );
}

export default App;
