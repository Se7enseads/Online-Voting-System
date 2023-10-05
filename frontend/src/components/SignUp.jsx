import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignUp = () => {
  const [message, setMessage] = useState('');
  const [style, setStyle] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch('http://localhost:5555/api/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
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
        <div className="col-md-6">
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
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="form-group mb-3">
                      <Field
                        className="form-control"
                        type="text"
                        name="nat_id"
                        placeholder="National ID"
                      />
                      <ErrorMessage
                        name="nat_id"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <Field
                        className="form-control"
                        type="email"
                        name="email"
                        placeholder="Email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <Field
                        className="form-control"
                        type="text"
                        name="name"
                        placeholder="Name"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <Field
                        className="form-control"
                        type="password"
                        name="password1"
                        placeholder="Password"
                      />
                      <ErrorMessage
                        name="password1"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-group mb-4">
                      <Field
                        className="form-control"
                        type="password"
                        name="password2"
                        placeholder="Confirm Password"
                      />
                      <ErrorMessage
                        name="password2"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="text-center">
                      <button
                        className={`btn btn-primary btn-block ${
                          isSubmitting ? 'disabled' : ''
                        }`}
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
