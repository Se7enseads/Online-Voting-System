import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AccessDenied from '../utils/AccessDenied';
import { useAuth } from '../utils/AuthContext';

function Profile({ url }) {
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
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    fetch(`${url}/api/profile`, {
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

    fetch('/api/api/profile', {
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
        toast.success('Your vote has been cast successfully!', {
          autoClose: 5000,
          position: 'top-center',
        });
      })
      .catch((error) => {
        toast.error(`Error casting vote: ${error}`, {
          autoClose: 5000,
          position: 'top-center',
        });
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white text-black dark:bg-slate-900 dark:text-white">
      <div className="w-4/5">
        {isAuthenticated ? (
          <>
            {voter ? (
              <div className="w-full p-4">
                <h1 className="text-3xl font-bold">Welcome, {name}!</h1>
                <h1>Your vote has already been cast!</h1>
              </div>
            ) : (
              <div>
                <h1 className="text-3xl font-bold">Welcome, {name}!</h1>
                <h2>You can cast your vote here.</h2>
                <div className="flex">
                  <div className="w-1/2 p-4">
                    <div>
                      <div>
                        <h3 className="text-lg font-semibold">Voting Form</h3>
                        Do take a look at the{' '}
                        <a className="underline" href="/candidates">
                          candidates
                        </a>{' '}
                        standing in the election before casting your vote.
                        <form onSubmit={handleSubmit}>
                          <div className="mb-4">
                            <label htmlFor="president">President</label>
                            <select
                              className="w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800"
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
                          <div className="mb-4">
                            <label htmlFor="vice-president">
                              Vice-President
                            </label>
                            <select
                              className="w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800"
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
                            <button
                              className="rounded bg-blue-500 p-2 text-white hover:bg-blue-700 dark:bg-blue-700"
                              type="submit"
                            >
                              Cast Vote
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <AccessDenied />
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Profile;
