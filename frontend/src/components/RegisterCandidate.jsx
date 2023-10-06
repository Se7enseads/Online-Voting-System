import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';

import { useAuth } from '../utils/AuthContext';
import AccessDenied from './AccessDenied';

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
        data.admin ? setIsAuthenticated(true) : setIsAuthenticated(false);
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
          setStyle('success');
          setTimeout(() => navigate('/'), 2000);
        } else {
          setMessage('Failed to register candidate.');
          setStyle('danger');
        }
      })
      .catch(() => {
        setMessage('An error occurred while registering the candidate.');
        setStyle('danger');
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
    pic_path: Yup.string(),
    position: Yup.string().required('Position is required'),
  });

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          {isAuthenticated ? (
            <>
              <h3 className="title">Register a new candidate</h3>
              <div className="card">
                <div className="card-body">
                  {message.length > 0 && (
                    <div className={`alert alert-${style}`}>{message}</div>
                  )}
                  <Formik
                    initialValues={{
                      agenda: '',
                      candidate_num: '',
                      certificate: '',
                      first_name: '',
                      last_name: '',
                      pic_path: '',
                      position: 'President',
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <div className="form-group">
                          <label htmlFor="candidate_num">
                            Candidate Number
                          </label>
                          <Field
                            className="form-control"
                            id="candidate_num"
                            name="candidate_num"
                            type="text"
                          />
                          <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="candidate_num"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="first_name">First Name</label>
                          <Field
                            className="form-control"
                            id="first_name"
                            name="first_name"
                            type="text"
                          />
                          <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="first_name"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="last_name">Last Name</label>
                          <Field
                            className="form-control"
                            id="last_name"
                            name="last_name"
                            type="text"
                          />
                          <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="last_name"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="certificate">Certificate</label>
                          <Field
                            className="form-control"
                            id="certificate"
                            name="certificate"
                            type="text"
                          />
                          <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="certificate"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="position">Position</label>
                          <Field
                            as="select"
                            className="form-control"
                            id="position"
                            name="position"
                          >
                            <option value="President">President</option>
                            <option value="Vice-President">
                              Vice-President
                            </option>
                          </Field>
                          <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="position"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="pic_path">
                            Add path to candidate&apos;s picture
                          </label>
                          <Field
                            className="form-control"
                            id="pic_path"
                            name="pic_path"
                            type="text"
                          />
                          <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="pic_path"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="agenda">Agenda</label>
                          <Field
                            as="textarea"
                            className="form-control"
                            id="agenda"
                            name="agenda"
                            rows="4"
                          />
                          <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="agenda"
                          />
                        </div>

                        <button
                          className="btn btn-info btn-block"
                          disabled={isSubmitting}
                          type="submit"
                        >
                          {isSubmitting
                            ? 'Submitting...'
                            : 'Register Candidate'}
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </>
          ) : (
            <AccessDenied />
          )}
        </div>
      </div>
    </div>
  );
}

export default RegisterCandidate;
