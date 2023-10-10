import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';

function SignUp() {
  const [message, setMessage] = useState('');
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
        setTimeout(() => navigate('/login'), 3000);
        setMessage('Sign up successful.');
      } else {
        const data = await response.json();
        setMessage(data.message || 'An error occurred while signing up.');
      }
    } catch (error) {
      setSubmitting(false);
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
    <div className="h-screen bg-white text-black dark:bg-slate-900 dark:text-white">
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md rounded-lg bg-gray-100 p-4 shadow-md dark:bg-gray-800">
          <h3 className="mb-2 text-2xl font-semibold">Sign Up</h3>
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
                <div className="mb-4">
                  <Field
                    className="w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring dark:bg-gray-700"
                    name="nat_id"
                    placeholder="National ID"
                    type="text"
                  />
                  <ErrorMessage
                    className="text-red-600"
                    component="div"
                    name="nat_id"
                  />
                </div>
                <div className="mb-4">
                  <Field
                    className="w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring dark:bg-gray-700"
                    name="email"
                    placeholder="Email"
                    type="email"
                  />
                  <ErrorMessage
                    className="text-red-600"
                    component="div"
                    name="email"
                  />
                </div>
                <div className="mb-4">
                  <Field
                    className="w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring dark:bg-gray-700"
                    name="name"
                    placeholder="Name"
                    type="text"
                  />
                  <ErrorMessage
                    className="text-red-600"
                    component="div"
                    name="name"
                  />
                </div>
                <div className="mb-4">
                  <Field
                    className="w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring dark:bg-gray-700"
                    name="password1"
                    placeholder="Password"
                    type="password"
                  />
                  <ErrorMessage
                    className="text-red-600"
                    component="div"
                    name="password1"
                  />
                </div>
                <div className="mb-4">
                  <Field
                    className="w-full rounded border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring dark:bg-gray-700"
                    name="password2"
                    placeholder="Confirm Password"
                    type="password"
                  />
                  <ErrorMessage
                    className="text-red-600"
                    component="div"
                    name="password2"
                  />
                </div>
                <button
                  className={`w-full rounded bg-blue-500 px-4 py-2 text-white ${
                    isSubmitting ? 'cursor-not-allowed opacity-50' : ''
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
  );
}

export default SignUp;
