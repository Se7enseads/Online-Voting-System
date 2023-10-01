import React from 'react';
import { Route, Routes } from 'react-router';
import ElectionResults from './componets/ ElectionResults';
//import AppLayout from "./componets/AppLayout";
import  CandidateInformation from "./componets/CandidateInformation";
import HomePage from "./componets/HomePage";
import Login from "./componets/Login";
import NavBar from './componets/NavBar';
import Profile from "./componets/Profile";
import  RegisterCandidate from "./componets/RegisterCandidate";
import SignUp from "./componets/SignUp"
function App() {
  return (
    <div>
      <NavBar />
      <main>
        <Routes>

          <Route exact path="/" element={<HomePage/>} />
          <Route path="/candidate" element={<CandidateInformation/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<RegisterCandidate/>} />
          <Route path="/sign-up" element={<SignUp/>} />
          <Route path="/election" element={<ElectionResults/>} />
          {/* <Route path="/AppLayout" element={AppLayout} /> */}
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
