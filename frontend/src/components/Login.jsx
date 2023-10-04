import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [style, setStyle] = useState('');

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required'),
  });

  const handleLogin = (values, { setSubmitting, resetForm }) => {
    fetch('http://localhost:5555/api/login', {
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then((response) => {
        setSubmitting(false);

        if (response.ok) {
          setStyle('success');

          setTimeout(() => {
            resetForm();
            navigate('/profile');
          }, 3000);

          return response.json();
        }
        setStyle('danger');
        return response.json();
      })
      .then((data) => {
        setMessage(data.message);
      })
      .catch(() => {
        setMessage('An error occurred while logging in.');
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-4">
          <h3 className="card-title text-center">Login</h3>
          <div className="card">
            <div className="card-body">
              {message.length > 0 && (
                <div className={`alert alert-${style}`}>{message}</div>
              )}
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                  remember: false,
                }}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="email">Your Email</label>
                      <Field
                        className="form-control"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-group mb-2">
                      <label htmlFor="password">Your Password</label>
                      <Field
                        className="form-control"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-check">
                      <Field
                        className="form-check-input"
                        type="checkbox"
                        id="remember"
                        name="remember"
                      />
                      <label htmlFor="remember" className="form-check-label">
                        Remember me
                      </label>
                    </div>
                    <button
                      className="btn btn-info btn-block btn-primary mb-3"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Logging In...' : 'Login'}
                    </button>
                  </Form>
                )}
              </Formik>
              <div>
                <p>
                  Don't have an account?
                  <Link to="/sign-up">Create an account</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
