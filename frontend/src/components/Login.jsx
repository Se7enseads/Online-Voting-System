import React from 'react';

function Login() {
  // Assuming you have an array of error messages
  const errorMessages = ['Invalid email', 'Incorrect password'];

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body login-card">
              <h3 className="card-title text-center">Login</h3>
              {errorMessages.length > 0 && (
                <div className="alert alert-danger">
                  <ul>
                    {errorMessages.map((message, index) => (
                      <li key={index}>{message}</li>
                    ))}
                  </ul>
                </div>
              )}
              <form action="/auth/login" method="POST">
                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    className="form-control"
                    id="email"
                    name="email"
                    type="email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Your Password</label>
                  <input
                    className="form-control"
                    id="password"
                    name="password"
                    type="password"
                  />
                </div>
                <div className="form-group form-check">
                  <input
                    className="form-check-input"
                    id="remember"
                    name="remember"
                    type="checkbox"
                  />
                  <label className="form-check-label" htmlFor="remember">
                    Remember me
                  </label>
                </div>
                <button className="btn btn-primary btn-block">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
