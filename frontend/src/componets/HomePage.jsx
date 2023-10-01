import React from 'react';

function HomePage() {
  return (
    <section className= "container-fluid">
     
        <div className="container card-body">
          <div className="row">
            <div className="col-md-4">
              <h1 className="title is-italic text-success display-1">
                Vote App
              </h1>
              <h2 className="subtitle text-dark h4">Login and start voting</h2>
              <p className="font-weight-bold text-dark text-left">
                Created a simple college election voting app using Flask and
                Bulma, where students can register themselves. Once registered,
                students can log in and cast their votes.
              </p>
              <br />
              <p className="font-weight-bold text-dark text-left">
                Candidate info tab gives you information about the candidates
                standing for the elections.
              </p>
              <br />
              <p className="font-weight-bold text-dark text-left">
                A new candidate can be registered only by the Admin. Admin can
                log in and fill a form to register a new candidate for the
                election.
              </p>
            </div>
            <div className="col-md-8">
              <img
                src="frontend/vote2.jpg"
                alt="Vote App"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
    
    </section>
  );
}

export default HomePage;