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
      const response = await fetch('http://localhost:10000/api/sign-up', {
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
    <div>
      <div>
        <div>
          <div>
            <div>
              <h3>Sign Up</h3>
              {message && <div>{message}</div>}
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
                    <div>
                      <Field
                        name="nat_id"
                        placeholder="National ID"
                        type="text"
                      />
                      <ErrorMessage component="div" name="nat_id" />
                    </div>
                    <div>
                      <Field name="email" placeholder="Email" type="email" />
                      <ErrorMessage component="div" name="email" />
                    </div>
                    <div>
                      <Field name="name" placeholder="Name" type="text" />
                      <ErrorMessage component="div" name="name" />
                    </div>
                    <div>
                      <Field
                        name="password1"
                        placeholder="Password"
                        type="password"
                      />
                      <ErrorMessage component="div" name="password1" />
                    </div>
                    <div>
                      <Field
                        name="password2"
                        placeholder="Confirm Password"
                        type="password"
                      />
                      <ErrorMessage component="div" name="password2" />
                    </div>
                    <button
                      className={`${isSubmitting ? 'disabled' : ''}`}
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
