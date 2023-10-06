import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';

function SignUp() {
  const [message, setMessage] = useState('');
  const [style, setStyle] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch('http://localhost:5555/api/sign-up', {
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      setSubmitting(false);

      if (response.ok) {
        setStyle('success');
        setTimeout(() => navigate('/login'), 3000);
        setMessage('Sign up successful.');
      } else {
        setStyle('danger');
        const data = await response.json();
        setMessage(data.message || 'An error occurred while signing up.');
      }
    } catch (error) {
      setSubmitting(false);
      setStyle('danger');
      setMessage('An error occurred while signing up.');
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    name: Yup.string().required('Name is required'),
    nat_id: Yup.string()
      .matches(
        /^\d{8}$/,
        'National ID must be 8 digits long and contain only integers',
      )
      .required('National ID is required'),
    password1: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required'),
    password2: Yup.string()
      .oneOf([Yup.ref('password1'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title mb-4 text-center">Sign Up</h3>
              {message && (
                <div className={`alert alert-${style} mb-4`}>{message}</div>
              )}
              <Formik
                initialValues={{
                  email: '',
                  name: '',
                  nat_id: '',
                  password1: '',
                  password2: '',
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="form-group mb-3">
                      <Field
                        className="form-control"
                        name="nat_id"
                        placeholder="National ID"
                        type="text"
                      />
                      <ErrorMessage
                        className="text-danger"
                        component="div"
                        name="nat_id"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <Field
                        className="form-control"
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
                    <div className="form-group mb-3">
                      <Field
                        className="form-control"
                        name="name"
                        placeholder="Name"
                        type="text"
                      />
                      <ErrorMessage
                        className="text-danger"
                        component="div"
                        name="name"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <Field
                        className="form-control"
                        name="password1"
                        placeholder="Password"
                        type="password"
                      />
                      <ErrorMessage
                        className="text-danger"
                        component="div"
                        name="password1"
                      />
                    </div>
                    <div className="form-group mb-4">
                      <Field
                        className="form-control"
                        name="password2"
                        placeholder="Confirm Password"
                        type="password"
                      />
                      <ErrorMessage
                        className="text-danger"
                        component="div"
                        name="password2"
                      />
                    </div>
                    <button
                      className={`btn btn-info btn-block ${
                        isSubmitting ? 'disabled' : ''
                      }`}
                      disabled={isSubmitting}
                      type="submit"
                    >
                      {isSubmitting ? 'Submitting...' : 'Sign Up'}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
