import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';

import AccessDenied from '../utils/AccessDenied';
import { useAuth } from '../utils/AuthContext';

function RegisterCandidate() {
  const [message, setMessage] = useState('');
  const [style, setStyle] = useState('');
  const { token } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    fetch('http://localhost:5555/api/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.admin === true) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, [token]);

  const handleSubmit = (values, { setSubmitting }) => {
    fetch('http://localhost:5555/api/candidate_register', {
      body: JSON.stringify(values),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then((response) => {
        if (response.ok) {
          setMessage('Candidate registered successfully.');
          setStyle('bg-green-500 text-white');
          setTimeout(() => navigate('/'), 2000);
        } else {
          setMessage('Failed to register candidate.');
          setStyle('bg-red-500 text-white');
        }
      })
      .catch(() => {
        setMessage('An error occurred while registering the candidate.');
        setStyle('bg-red-500 text-white');
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const validationSchema = Yup.object().shape({
    agenda: Yup.string().required('Candidate Agenda is required'),
    candidate_num: Yup.string()
      .matches(/^\d{5}$/, 'Candidate Number must be exactly 5 digits')
      .required('Candidate Number is required'),
    certificate: Yup.string().required('Certificate is required'),
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    pic_path: Yup.string()
      .test('valid-pic-path', 'Invalid pic_path', (value) => {
        // Check if the value is empty or if it meets the criteria for URL or "/images/" path
        return !value || /^(https?:\/\/.{1,50}|\/images\/.{1,50})$/.test(value);
      })
      .nullable(),
    position: Yup.string().required('Position is required'),
  });

  return (
    <div className="flex min-h-screen items-center justify-center dark:bg-slate-900">
      {isAuthenticated ? (
        <div className="mt-10 max-w-md p-4">
          <h3 className="mb-4 text-2xl font-bold dark:text-white">
            Register a new candidate
          </h3>
          <div className="rounded bg-white p-4 shadow-md">
            {message.length > 0 && (
              <div className={`rounded p-2 ${style}`}>{message}</div>
            )}
            <Formik
              initialValues={{
                agenda: '',
                candidate_num: '',
                certificate: '',
                first_name: '',
                last_name: '',
                pic_path: '',
                position: '',
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="candidate_num"
                    >
                      Candidate Number
                    </label>
                    <Field
                      className="mt-1 w-full rounded border p-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                      id="candidate_num"
                      name="candidate_num"
                      type="text"
                    />
                    <ErrorMessage
                      className="mt-1 text-sm text-red-500"
                      component="div"
                      name="candidate_num"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="first_name"
                    >
                      First Name
                    </label>
                    <Field
                      className="mt-1 w-full rounded border p-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                      id="first_name"
                      name="first_name"
                      type="text"
                    />
                    <ErrorMessage
                      className="mt-1 text-sm text-red-500"
                      component="div"
                      name="first_name"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="last_name"
                    >
                      Last Name
                    </label>
                    <Field
                      className="mt-1 w-full rounded border p-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                      id="last_name"
                      name="last_name"
                      type="text"
                    />
                    <ErrorMessage
                      className="mt-1 text-sm text-red-500"
                      component="div"
                      name="last_name"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="certificate"
                    >
                      Certificate
                    </label>
                    <Field
                      className="mt-1 w-full rounded border p-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                      id="certificate"
                      name="certificate"
                      placeholder="Phd, Diploma ..."
                      type="text"
                    />
                    <ErrorMessage
                      className="mt-1 text-sm text-red-500"
                      component="div"
                      name="certificate"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="position"
                    >
                      Position
                    </label>
                    <Field
                      as="select"
                      className="mt-1 w-full rounded border p-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                      id="position"
                      name="position"
                    >
                      <option>Select a Position</option>
                      <option value="President">President</option>
                      <option value="Vice-President">Vice-President</option>
                    </Field>
                    <ErrorMessage
                      className="mt-1 text-sm text-red-500"
                      component="div"
                      name="position"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="pic_path"
                    >
                      Add path to candidate&apos;s picture
                    </label>
                    <Field
                      className="mt-1 w-full rounded border p-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                      id="pic_path"
                      name="pic_path"
                      placeholder="/images/... or URL"
                      type="text"
                    />
                    <ErrorMessage
                      className="mt-1 text-sm text-red-500"
                      component="div"
                      name="pic_path"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="agenda"
                    >
                      Agenda
                    </label>
                    <Field
                      as="textarea"
                      className="mt-1 w-full rounded border p-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                      id="agenda"
                      name="agenda"
                      placeholder="For a better tomorrow"
                      rows="4"
                    />
                    <ErrorMessage
                      className="mt-1 text-sm text-red-500"
                      component="div"
                      name="agenda"
                    />
                  </div>
                  <button
                    className={`rounded bg-indigo-500 p-2 text-white ${
                      isSubmitting
                        ? 'cursor-not-allowed opacity-60'
                        : 'hover:bg-indigo-600'
                    }`}
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting ? 'Submitting...' : 'Register Candidate'}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      ) : (
        <AccessDenied />
      )}
    </div>
  );
}

export default RegisterCandidate;
