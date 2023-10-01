import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './componets/NavBar';
import Home from './componets/Home';
import CandidateInfo from './componets/CandidateInfo';
import LiveResult from './componets/LiveResult';
import Login from './componets/Login';
import Register from './componets/Register';
import CandidateRegister from './componets/CandidateRegister';
import Logout from './componets/Logout';
import Profile from './componets/Profile';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/candidate" component={CandidateInfo} />
        <Route path="/live_result" component={LiveResult} />
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/register" component={Register} />
        <Route path="/candidate_register" component={CandidateRegister} />
        <Route path="/auth/logout" component={Logout} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
}

export default App;
