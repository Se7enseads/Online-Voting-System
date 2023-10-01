import React from 'react';

function Profile({ name, prez, vice, voter }) {
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
                    className="img-fluid"
                    src="static/images/3.jpg"
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
                                key={prezCandidate.roll_num}
                                value={prezCandidate.roll_num}
                              >
                                {prezCandidate.first_name}{' '}
                                {prezCandidate.last_name} (
                                {prezCandidate.roll_num})
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
                                key={viceCandidate.roll_num}
                                value={viceCandidate.roll_num}
                              >
                                {viceCandidate.first_name}{' '}
                                {viceCandidate.last_name} (
                                {viceCandidate.roll_num})
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
                    className="img-fluid"
                    src="static/images/4.jpg"
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
