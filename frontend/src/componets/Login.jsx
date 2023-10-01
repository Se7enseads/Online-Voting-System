import React from 'react';

function Login() {
  // Assuming you have an array of error messages
  const errorMessages = ["Invalid email", "Incorrect password"];

  return (
    <div className="column is-4 is-offset-4">
      <h3 className="title">Login</h3>
      <div className="box">
        {errorMessages.length > 0 && (
          <div className="notification is-danger">
            <ul>
              {errorMessages.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          </div>
        )}
        <form method="POST" action="/auth/login">
          <div className="field">
            <div className="control">
              <input className="input is-medium" type="email" name="email" placeholder="Your Email" autoFocus />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input is-medium" type="password" name="password" placeholder="Your Password" />
            </div>
          </div>
          <div className="field">
            <label className="checkbox">
              <input type="checkbox" name="remember" />
              Remember me
            </label>
          </div>
          <button className="button is-block is-info is-medium is-fullwidth">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
