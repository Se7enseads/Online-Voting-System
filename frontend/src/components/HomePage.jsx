import { useEffect, useState } from 'react';

function HomePage({ alert }) {
  const [showLogoutAlert, setShowLogoutAlert] = useState(alert);

  useEffect(() => {
    if (showLogoutAlert) {
      const alertTimeout = setTimeout(() => {
        setShowLogoutAlert(false);
      }, 5000);

      return () => {
        clearTimeout(alertTimeout);
      };
    }
  }, [showLogoutAlert]);

  return (
    <section className="hero is-white is-fullheight-with-navbar home-page">
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column is-4">
              <div className="centered-container">
                <h1 className="title is-italic has-text-success is-1">
                  Vote App
                </h1>
                <h2 className="subtitle has-text-dark is-4">
                  Login and start voting
                </h2>
              </div>
            </div>
            <div className="card align-items-center column is-8">
              <div className=" card-body centered-container">
                <div className="image-container has-text-centered">
                  <img
                    alt="Vote App"
                    className="img-fluid centered-image"
                    src="/images/vote2.jpg"
                    style={{ height: 'auto', maxWidth: '30%' }}
                  />
                </div>
              </div>
              <div className="card-body image-text centered-text">
                <p className="has-text-weight-semibold has-text-dark text-with-shadow">
                  Created a simple University election voting app using Flask
                  and React, where students can register themselves. Once
                  registered, students can log in and cast their votes.
                </p>
                <br />
                <p className="has-text-weight-semibold has-text-dark">
                  Candidate info tab gives you information about the candidates
                  standing for the elections.
                </p>
                <br />
                <p className="has-text-weight-semibold has-text-dark">
                  A new candidate can be registered only by the Admin. Admin can
                  log in and fill a form to register a new candidate for the
                  election.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
