import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import '@dotlottie/player-component';

function SignUp() {
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
        const data = await response.json();
        toast.success(data.message, {
          autoClose: 2000,
          position: toast.POSITION.TOP_CENTER,
        });
        navigate('/login');
      } else {
        const data = await response.json();
        toast.error(data.message, {
          autoClose: false,
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      setSubmitting(false);

      toast.error('An error occurred while signing up.');
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
    <div className="h-screen bg-gray-100 text-black dark:bg-slate-900 dark:text-white">
      <ToastContainer />
      <div className="flex min-h-screen items-center justify-center">
        <div className="hidden md:flex md:w-1/2">
          <dotlottie-player
            src="/images/sign-up.lottie"
            background="transparent"
            speed="1"
            style={{ width: '300px', height: '300px' }}
            direction="1"
            mode="normal"
            loop
            autoplay
          />
        </div>
        <div className="w-full max-w-md rounded-lg bg-white p-4 shadow-md dark:bg-slate-900 hover:dark:shadow-2xl">
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
                    className="w-full rounded-md border border-gray-300 px-3 py-2 no-underline focus:border-blue-500 dark:border-none dark:bg-gray-800 dark:text-white dark:focus:outline"
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
                    className="w-full rounded-md border border-gray-300 px-3 py-2 no-underline focus:border-blue-500 dark:border-none dark:bg-gray-800 dark:text-white dark:focus:outline"
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
                    className="w-full rounded-md border border-gray-300 px-3 py-2 no-underline focus:border-blue-500 dark:border-none dark:bg-gray-800 dark:text-white dark:focus:outline"
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
                    className="w-full rounded-md border border-gray-300 px-3 py-2 no-underline focus:border-blue-500 dark:border-none dark:bg-gray-800 dark:text-white dark:focus:outline"
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
                    className="w-full rounded-md border border-gray-300 px-3 py-2 no-underline focus:outline-none dark:border-none dark:bg-gray-800 dark:text-white dark:focus:outline"
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
