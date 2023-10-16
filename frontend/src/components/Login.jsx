import '@dotlottie/player-component';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';

function Login({ token, updateToken }) {
  const navigate = useNavigate();

  const handleLogin = async (values, { resetForm, setSubmitting }) => {
    try {
      const response = await fetch('http://localhost:5555/api/login', {
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      setSubmitting(false);

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message, {
          autoClose: 1000,
          position: toast.POSITION.TOP_CENTER,
        });
        resetForm('');
        setTimeout(() => {
          updateToken(data.access_token);
        }, 2000);
      } else {
        const data = await response.json();
        toast.error(data.message, {
          autoClose: false,
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      setSubmitting(false);

      toast.error(data.message, {
        autoClose: false,
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    if (token && token !== 'undefined' && token !== '') {
      navigate('/');
    } else {
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

  return (
    <div className="h-screen bg-gray-100 p-4 align-middle dark:bg-slate-900">
      <ToastContainer />
      <div className="flex h-full flex-col items-center justify-center md:flex-row">
        <div className="hidden justify-center md:flex md:w-1/2">
          <dotlottie-player
            autoplay
            background="transparent"
            direction="1"
            loop
            mode="normal"
            speed="1"
            src="/images/login.lottie"
            style={{ height: '300px', width: '300px' }}
          />
        </div>
        <div className="mx-auto mt-10 max-w-md rounded-md bg-white p-3 shadow-md dark:bg-slate-900 hover:dark:shadow-2xl">
          <h3 className="mb-4 text-2xl font-semibold dark:text-white">Login</h3>
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
                    <Field
                      className="w-full rounded-md border border-gray-300 px-3 py-2 no-underline focus:border-blue-500 focus:outline-none dark:border-none dark:bg-gray-800 dark:text-white"
                      id="email"
                      name="email"
                      placeholder="Enter Email"
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
              <p className="text-gray-600">
                Don&apos;t have an account?
                <Link
                  className="ml-2 text-blue-500 hover:underline dark:text-white"
                  to="/sign-up"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
