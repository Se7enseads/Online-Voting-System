import { useState } from 'react';
import { useNavigate } from 'react-router';

function Login() {
  // Assuming you have an array of error messages
  const errorMessages = ['Invalid email', 'Incorrect password'];

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Perform login logic here
    // Send a POST request to /auth/login with email and password
    fetch('http://localhost:5555/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        remember: false,
      }),
    }).then((response) => {
      if (response.ok) {
        navigate('/profile');
      } else {
        navigate('/login');
        return 'failed to login';
      }
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h3 className="title">Login</h3>
          <div className="card">
            <div className="card-body">
              {errorMessages.length > 0 && (
                <div className="alert alert-danger">
                  <ul>
                    {errorMessages.map((message, index) => (
                      <li key={index}>{message}</li>
                    ))}
                  </ul>
                </div>
              )}
              <form onSubmit={handleLogin}>
                {/* Use onSubmit to trigger handleLogin */}
                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    className="form-control"
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Your Password</label>
                  <input
                    className="form-control"
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <div className="form-check">
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
                </div>
                <button className="btn btn-info btn-block" type="submit">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
