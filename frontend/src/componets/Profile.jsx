import React from 'react';

function Profile({ name, voter, prez, vice }) {
  return (
    <div>
      <h1 className="title">Welcome, {name}!</h1>
      {voter ? (
        <h1 className="subtitle has-text-success">Your vote has been cast.</h1>
      ) : (
        <div>
          <h2 className="subtitle">
            You can cast your vote here.<br />
          </h2>
          <div className="columns">
            <div className="column is-4">
              <img src="static/images/3.jpg" alt="President Candidates" />
            </div>
            <div className="column is-4">
              <div className="box">
                <h3 className="title has-text-dark">Voting Form</h3>
                Do take a look at the <a href="/candidates"><u>candidates</u></a> standing in the election before casting your vote.
                <br /><br />
                <form method="POST" action="/profile">
                  <div className="field">
                    <label className="label">President</label>
                    <div className="select">
                      <select name="president">
                        {prez.map((prezCandidate) => (
                          <option key={prezCandidate.roll_num} value={prezCandidate.roll_num}>
                            {prezCandidate.first_name} {prezCandidate.last_name} ({prezCandidate.roll_num})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Vice-President</label>
                    <div className="select">
                      <select name="vice-president">
                        {vice.map((viceCandidate) => (
                          <option key={viceCandidate.roll_num} value={viceCandidate.roll_num}>
                            {viceCandidate.first_name} {viceCandidate.last_name} ({viceCandidate.roll_num})
                          </option>
                        ))}
                      </select>
                    </div>
                    <br /><br />
                    <div className="field">
                      <button className="button is-success">Cast Vote</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="column is-4">
              <img src="static/images/4.jpg" alt="Vice-President Candidates" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
