import React from 'react';

function HomePage() {
  return (
    <section className="home-page">
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <h1 className="title text-success">Vote App</h1>
            <h2 className="subtitle text-dark h4">Login and start voting</h2>
            <div className="card text-dark shadow">
              <div className="card-body unique-background-color text-center">
                {' '}
                {/* Center text within card-body */}
                <p className="font-weight-bold">
                  Created a simple college election voting app using Flask and
                  Bulma, where students can register themselves. Once
                  registered, students can log in and cast their votes.
                </p>
                <p className="font-weight-bold">
                  Candidate info tab gives you information about the candidates
                  standing for the elections.
                </p>
                <p className="font-weight-bold">
                  A new candidate can be registered only by the Admin. Admin can
                  log in and fill a form to register a new candidate for the
                  election.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <img
          alt="Vote App"
          className="img-fluid enlarged-image"
          src="images/vote1.jpg"
        />
      </div>
    </section>
  );
}

export default HomePage;
