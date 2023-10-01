import React from 'react';
import { Route, Routes } from 'react-router';
import ElectionResults from './componets/ ElectionResults';
import AppLayout from "./componets/AppLayout";
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
      <NavBar/>
      <Routes>
        <Route exact path="/" component={HomePage} />
        <Route path="/candidate" component={CandidateInformation} />
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/register" component={RegisterCandidate} />
        <Route path="/auth/sign-up" component={SignUp} />
        <Route path="/election" component={ElectionResults} />
        <Route path="/AppLayout" component={AppLayout} />
        <Route path="/profile" component={Profile} />
      </Routes>
    </div>
  );
}

export default App;
