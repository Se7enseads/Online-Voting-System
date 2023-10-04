import React, { useEffect, useState } from 'react';

function Profile() {
  const [prez, setPrez] = useState([]);
  const [vice, setVice] = useState([]);
  const [voter, setVoter] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5555/api/user/1`, {
      'Content-Type': 'application/json',
    })
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:5555/api/candidate', {
      'Content-Type': 'application/json',
    })
      .then((response) => response.json())
      .then((data) => {
        setPrez(data.prez);
        setVice(data.vice);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="title">Welcome, {name}!</h1>
          {voter ? (
            <h1 className="subtitle has-text-success">
              Your vote has been cast.
            </h1>
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
                    style={{ maxWidth: '400px', maxHeight: '400px' }}
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
                      <br />
                      <form action="/profile" method="POST">
                        <div className="form-group">
                          <label className="label" htmlFor="president">
                            President
                          </label>
                          <select className="form-control" name="president">
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
                          <button className="btn btn-success">Cast Vote</button>
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
                    style={{ maxWidth: '400px', maxHeight: '400px' }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
