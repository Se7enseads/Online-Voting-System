import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function SignUp() {
  const [message, setMessage] = useState('');
  const [style, setStyle] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    fetch('http://localhost:5555/api/sign-up', {
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
          setTimeout(() => navigate('/login'), 3000);

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
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h3 className="title">Sign Up</h3>
          <div className="card">
            <div className="card-body">
              {message.length > 0 && (
                <div className={`alert alert-${style}`}>{message}</div>
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
                    <div className="form-group mb-3">
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
                    <button
                      className={`btn btn-info btn-block ${
                        isSubmitting ? 'disabled' : ''
                      }`}
                      type="submit"
                      disabled={isSubmitting}
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
