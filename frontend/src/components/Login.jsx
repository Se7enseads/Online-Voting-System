import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { useAuth } from '../utils/AuthContext';

function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [style, setStyle] = useState('');
  const { token, updateToken } = useAuth();

  useEffect(() => {
    if (token && token !== 'undefined' && token !== '') {
      navigate('/');
    } else if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required'),
  });

  const handleLogin = (values, { resetForm, setSubmitting }) => {
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
            navigate('/');
          }, 3000);

          return response.json();
        }
        setStyle('danger');
        return response.json();
      })
      .then((data) => {
        updateToken(data.access_token);
        setMessage(data.message);
      })
      .catch(() => {
        setMessage('An error occurred while logging in.');
        setStyle('danger');
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-4">
          <h3 className="card-title text-center">Login</h3>
          {token && token !== 'undefined' && token !== '' ? (
            'you are already logged in'
          ) : (
            <div className="card">
              <div className="card-body">
                {message.length > 0 && (
                  <div className={`alert alert-${style}`}>{message}</div>
                )}
                <Formik
                  initialValues={{
                    email: '',
                    password: '',
                  }}
                  onSubmit={handleLogin}
                  validationSchema={validationSchema}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="form-group">
                        <label htmlFor="email">Your Email</label>
                        <Field
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="Email"
                          type="email"
                        />
                        <ErrorMessage
                          className="text-danger"
                          component="div"
                          name="email"
                        />
                      </div>
                      <div className="form-group mb-2">
                        <label htmlFor="password">Your Password</label>
                        <Field
                          className="form-control"
                          id="password"
                          name="password"
                          placeholder="Password"
                          type="password"
                        />
                        <ErrorMessage
                          className="text-danger"
                          component="div"
                          name="password"
                        />
                      </div>
                      <button
                        className="btn btn-info btn-block btn-primary mb-3"
                        disabled={isSubmitting}
                        type="submit"
                      >
                        {isSubmitting ? 'Logging In...' : 'Login'}
                      </button>
                    </Form>
                  )}
                </Formik>
                <div>
                  <p>
                    Don&apos;t have an account?
                    <Link to="/sign-up">Create an account</Link>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
