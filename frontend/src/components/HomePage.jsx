import React from 'react';

function HomePage() {
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
            <div className="column is-8">
              <div className="centered-container">
                <div className="image-container has-text-centered">
                  <img
                    src="public/images/vote2.jpg"
                    alt="Vote App"
                    className="img-fluid centered-image" // Add a custom class
                    style={{ maxWidth: '30%', height: 'auto' }}
                  />
                </div>
              </div>
              <div className="image-text centered-text">
                <p className="has-text-weight-semibold has-text-dark">
                  Created a simple college election voting app using Flask and
                  Bulma, where students can register themselves. Once
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
