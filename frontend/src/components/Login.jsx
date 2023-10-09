import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';

function Login({ token, updateToken }) {
  const navigate = useNavigate();
  const [style, setStyle] = useState('');

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
    fetch('http://localhost:10000/api/login', {
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
          return response.json();
        }

        setStyle('danger');
        return response.json();
      })
      .then((data) => {
        if (style === 'success') {
          toast.success(data.message, {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
          resetForm();
          navigate('/');
        } else {
          toast.error(data.message, {
            autoClose: false,
            position: toast.POSITION.TOP_CENTER,
          });
        }
        updateToken(data.access_token);
      })
      .catch(() => {
        toast.error('An error occurred while logging in.', {
          autoClose: false,
          position: toast.POSITION.TOP_CENTER,
        });
        setStyle('danger');
      });
  };

  return (
    <div className="h-screen bg-gray-100 p-4 dark:bg-slate-900">
      <div className="mx-auto mt-10 max-w-md rounded-md bg-white p-3 shadow-md dark:bg-slate-900 dark:shadow-2xl">
        <h3 className="mb-4 text-2xl font-semibold dark:text-white">Login</h3>
        {token && token !== 'undefined' && token !== '' ? (
          <p className="text-green-600">You are already logged in</p>
        ) : (
          <div>
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
                  <div className="mb-4">
                    <label
                      className=" block text-gray-700 dark:text-slate-50"
                      htmlFor="email"
                    >
                      Your Email
                    </label>
                    <Field
                      className="w-full rounded-md border border-gray-300 px-3 py-2 no-underline focus:border-blue-500 focus:outline-none dark:border-none dark:bg-gray-800 dark:text-white"
                      id="email"
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
                    <label
                      className="block text-gray-700 dark:text-gray-100"
                      htmlFor="password"
                    >
                      Your Password
                    </label>
                    <Field
                      className="w-full rounded-md border border-gray-300 px-3 py-2 no-underline focus:border-blue-500 focus:outline-none dark:border-none dark:bg-gray-800 dark:text-white"
                      id="password"
                      name="password"
                      placeholder="Password"
                      type="password"
                    />
                    <ErrorMessage
                      className="text-red-600"
                      component="div"
                      name="password"
                    />
                  </div>
                  <button
                    className="w-full rounded-md bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting ? 'Logging In...' : 'Login'}
                  </button>
                </Form>
              )}
            </Formik>
            <div className="mt-4">
              <p className="text-gray-600 dark:text-slate-900">
                Don't have an account?
                <Link
                  className="ml-2 text-blue-500 hover:underline dark:text-white"
                  to="/sign-up"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
