import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useAuth } from '../utils/AuthContext';
import AccessDenied from './AccessDenied';

function Profile() {
  const [prez, setPrez] = useState([]);
  const [vice, setVice] = useState([]);
  const [name, setName] = useState('');
  const [voter, setVoter] = useState(false);
  const [selectedChoices, setSelectedChoices] = useState({
    president: '',
    vicePresident: '',
  });
  const { token, updateToken } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
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
        setName(data.name);
        setPrez(data.prez);
        setVice(data.vice);
        setVoter(data.voter);
        setIsAuthenticated(true);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        navigate('/login');
        updateToken('');
        setIsAuthenticated(false);
      });
  }, [token, navigate, updateToken]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      president: selectedChoices.president,
      vicePresident: selectedChoices.vicePresident,
    };

    fetch('http://localhost:5555/api/profile', {
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then((response) => response.json())
      .then(() => {
        setVoter(true);
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
        }, 5000);
      })
      .catch((error) => {
        console.error('Error casting vote:', error);
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          {isAuthenticated ? (
            <>
              <h1 className="title">Welcome, {name}!</h1>
              {voter ? (
                <>
                  {alertVisible && (
                    <div className="alert alert-success mt-3">
                      Your vote has been cast successfully.
                    </div>
                  )}
                  <h1 className="subtitle has-text-success">
                    Your vote has been cast.
                  </h1>
                </>
              ) : (
                <div>
                  <h2 className="subtitle">
                    You can cast your vote here.
                    <br />
                  </h2>
                  <div className="row">
                    <div className="col-md-4">
                      <img
                        alt="President Candidates"
                        className="img-fluid rounded"
                        src="public/images/profile1.jpeg"
                        style={{ maxHeight: '400px', maxWidth: '400px' }}
                      />
                    </div>
                    <div className="col-md-4">
                      <div className="card">
                        <div className="card-body">
                          <h3 className="title has-text-dark">Voting Form</h3>
                          Do take a look at the{' '}
                          <a href="/candidates">
                            <u>candidates</u>
                          </a>{' '}
                          standing in the election before casting your vote.
                          <br />
                          <form onSubmit={handleSubmit}>
                            <div className="form-group">
                              <label className="label" htmlFor="president">
                                President
                              </label>
                              <select
                                className="form-control"
                                name="president"
                                onChange={(e) =>
                                  setSelectedChoices({
                                    ...selectedChoices,
                                    president: e.target.value,
                                  })
                                }
                                value={selectedChoices.president}
                              >
                                {prez.map((prezCandidate) => (
                                  <option
                                    key={prezCandidate.candidate_num}
                                    value={prezCandidate.candidate_num}
                                  >
                                    {prezCandidate.first_name}{' '}
                                    {prezCandidate.last_name} (
                                    {prezCandidate.candidate_num})
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="form-group">
                              <label className="label" htmlFor="vice-president">
                                Vice-President
                              </label>
                              <select
                                className="form-control"
                                name="vice-president"
                                onChange={(e) =>
                                  setSelectedChoices({
                                    ...selectedChoices,
                                    vicePresident: e.target.value,
                                  })
                                }
                                value={selectedChoices.vicePresident}
                              >
                                {vice.map((viceCandidate) => (
                                  <option
                                    key={viceCandidate.candidate_num}
                                    value={viceCandidate.candidate_num}
                                  >
                                    {viceCandidate.first_name}{' '}
                                    {viceCandidate.last_name} (
                                    {viceCandidate.candidate_num})
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="form-group">
                              <button className="btn btn-success" type="submit">
                                Cast Vote
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <img
                        alt="Vice-President Candidates"
                        className="img-fluid rounded"
                        src="public/images/profile2.jpeg"
                        style={{ maxHeight: '400px', maxWidth: '400px' }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <AccessDenied />
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
