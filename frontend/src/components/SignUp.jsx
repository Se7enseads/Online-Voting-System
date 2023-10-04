import { useState } from 'react';
import { useNavigate } from 'react-router';

function SignUp() {
  const [formData, setFormData] = useState({
    nat_id: '',
    email: '',
    name: '',
    password1: '',
    password2: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a POST request to the server with the form data
    fetch('http://localhost:5555/api/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // Redirect to a success page or perform other actions
          // You can use `useNavigate` from React Router for navigation
          navigate('/login');
        } else {
          // Handle error, display error messages, etc.
          alert('error');
        }
      })
      .catch((error) => {
        // Handle network errors or other exceptions
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h3 className="title">Sign Up</h3>
          <div className="card">
            <div className="card-body">
              {/* Render error messages here */}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    className="form-control"
                    name="nat_id"
                    placeholder="National ID"
                    type="integer"
                    value={formData.nat_id}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    name="name"
                    placeholder="Name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    name="password1"
                    placeholder="Password"
                    type="password"
                    value={formData.password1}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    name="password2"
                    placeholder="Confirm Password"
                    type="password"
                    value={formData.password2}
                    onChange={handleChange}
                  />
                </div>
                <button className="btn btn-info btn-block" type="submit">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
