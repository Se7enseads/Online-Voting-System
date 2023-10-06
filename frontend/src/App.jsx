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
  const [prez, setPrez] = useState([]);
  const [vice, setVice] = useState([]);
  const { updateToken } = useAuth();
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5555/api/candidate', {
      'Content-Type': 'application/json',
    })
      .then((response) => response.json())
      .then((data) => {
        setPrez(data.prez);
        setVice(data.vice);
      })
      .catch((error) => {
        return `Error fetching data: ${error}`;
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    updateToken('');
    setTimeout(() => {
      navigate('/');
      setShowAlert(true);
    }, 3000);
  };

  return (
    <div>
      <NavBar onLogout={handleLogout} />
      <main>
        <Routes>
          <Route element={<HomePage alert={showAlert} />} exact path="/" />
          <Route
            element={<CandidateInformation prez={prez} vice={vice} />}
            path="/candidates"
          />
          <Route element={<Login />} path="/login" />
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
