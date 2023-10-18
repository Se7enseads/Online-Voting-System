import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useAuth } from '../utils/AuthContext';
import AccessDenied from '../utils/AccessDenied';

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
        navigate('/login');
        updateToken('');
        setIsAuthenticated(false);
        return `Error fetching data: ${error}`;
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
        return `Error casting vote: ${error}`;
      });
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          {voter ? (
            <>
              {alertVisible && <div>Your vote has been cast successfully.</div>}
              <div style={{ padding: '20px', width: '50%' }}>
                <div>
                  <h1>Welcome, {name}!</h1>
                  <h1>Your vote has already been cast!</h1>
                </div>
              </div>
            </>
          ) : (
            <div>
              <h1>Welcome, {name}!</h1>
              <h2>
                You can cast your vote here.
                <br />
              </h2>
              <div>
                <div>
                  <img
                    alt="President Candidates"
                    src="/images/profile1.jpeg"
                    style={{ maxHeight: '400px', maxWidth: '400px' }}
                  />
                </div>
                <div>
                  <div>
                    <div>
                      <h3>Voting Form</h3>
                      Do take a look at the{' '}
                      <a href="/candidates">
                        <u>candidates</u>
                      </a>{' '}
                      standing in the election before casting your vote.
                      <br />
                      <form onSubmit={handleSubmit}>
                        <div>
                          <label htmlFor="president">President</label>
                          <select
                            id="president"
                            name="president"
                            onChange={(e) =>
                              setSelectedChoices({
                                ...selectedChoices,
                                president: e.target.value,
                              })
                            }
                            value={selectedChoices.president}
                          >
                            <option value="">Select a President</option>
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
                        <div>
                          <label htmlFor="vice-president">Vice-President</label>
                          <select
                            id="vice-president"
                            name="vice-president"
                            onChange={(e) =>
                              setSelectedChoices({
                                ...selectedChoices,
                                vicePresident: e.target.value,
                              })
                            }
                            value={selectedChoices.vicePresident}
                          >
                            <option value="">Select a Vice President</option>
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
                        <div>
                          <button type="submit">Cast Vote</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div>
                  <img
                    alt="Vice-President Candidates"
                    src="/images/profile2.jpeg"
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
  );
}

export default Profile;
