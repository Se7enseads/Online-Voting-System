import React from 'react';
import { Route, Routes } from 'react-router';
import ElectionResults from './components/ ElectionResults';
//import AppLayout from "./componets/AppLayout";
import CandidateInformation from './components/CandidateInformation';
import HomePage from './components/HomePage';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Profile from './components/Profile';
import RegisterCandidate from './components/RegisterCandidate';
import SignUp from './components/SignUp';
function App() {
  return (
    <div>
      <NavBar />
      <main>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/candidate" element={<CandidateInformation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterCandidate />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/election" element={<ElectionResults />} />
          {/* <Route path="/AppLayout" element={AppLayout} /> */}
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
