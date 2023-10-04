import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import ElectionResults from './components/ ElectionResults';
import CandidateInformation from './components/CandidateInformation';
import HomePage from './components/HomePage';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Profile from './components/Profile';
import RegisterCandidate from './components/RegisterCandidate';
import SignUp from './components/SignUp';

function App() {
  const [prez, setPrez] = useState([]);
  const [vice, setVice] = useState([]);
  const [name, setName] = useState('');
  const [admin, setAdmin] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:5555/api/user/2`, {
      'Content-Type': 'application/json',
    })
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
        setAdmin(data.admin);
      });
  }, []);

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
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <NavBar admin={admin} />
      <main>
        <Routes>
          <Route element={<HomePage />} exact path="/" />
          <Route
            element={<CandidateInformation vice={vice} prez={prez} />}
            path="/candidates"
          />
          <Route element={<Login />} path="/login" />
          <Route element={<RegisterCandidate />} path="/register" />
          <Route element={<SignUp />} path="/sign-up" />
          <Route element={<ElectionResults />} path="/results" />
          <Route
            element={<Profile vice={vice} prez={prez} name={name} />}
            path="/profile"
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
