import React from 'react';
import { Route, Routes } from 'react-router';

import ElectionResults from './components/ ElectionResults';
// import AppLayout from "./componets/AppLayout";
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
          <Route element={<HomePage />} exact path="/" />
          <Route element={<CandidateInformation />} path="/candidate" />
          <Route element={<Login />} path="/login" />
          <Route element={<RegisterCandidate />} path="/register" />
          <Route element={<SignUp />} path="/sign-up" />
          <Route element={<ElectionResults />} path="/results" />
          {/* <Route path="/AppLayout" element={AppLayout} /> */}
          <Route element={<Profile />} path="/profile" />
        </Routes>
      </main>
    </div>
  );
}

export default App;
