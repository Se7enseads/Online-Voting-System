import React from 'react';

function HomePage() {
  return (
    <section className="hero is-white is-fullheight-with-navbar">
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column is-4 ">
              <h1 className="title is-italic has-text-success is-1">
                Vote App
              </h1>
              <h2 className="subtitle has-text-dark is-4">
                Login and start voting
              </h2>
              <p className="has-text-left has-text-weight-semibold has-text-dark">
                Created a simple college election voting app using Flask and Bulma, where students can register themselves. Once registered, students can log in and cast their votes.
              </p>
              <br />
              <p className="has-text-left has-text-weight-semibold has-text-dark">
                Candidate info tab gives you information about the candidates standing for the elections.
              </p>
              <br />
              <p className="has-text-left has-text-weight-semibold has-text-dark">
                A new candidate can be registered only by the Admin. Admin can log in and fill a form to register a new candidate for the election.
              </p>
            </div>
            <div className="column is-8 ">
              <img src="static/images/1.jpeg" alt="Vote App" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
