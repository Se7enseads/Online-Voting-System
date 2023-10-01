import React from 'react';

function CandidateInformation({ prez, vice }) {
  return (
    <section className="container mt-5">
      <h1 className="display-4 text-success">Candidate Information</h1>
      <p className="lead text-dark font-weight-bold text-center">
        Information on which candidates are standing for election <br />
        and what the key messages of their campaign are.
      </p>
      <div className="row">
        <div className="col-md-12">
          <h2 className="text-success">Presidential Candidates</h2>
          <div className="row">
            {prez.map((prezCandidate, index) => (
              <div className="col-md-4" key={index}>
                <div className="card mb-4">
                  <img
                    src={prezCandidate.pic_path}
                    className="card-img-top"
                    alt={prezCandidate.first_name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {prezCandidate.first_name} {prezCandidate.last_name}
                    </h5>
                    <p className="card-text">{prezCandidate.roll_num}</p>
                    <p className="card-text text-dark font-italic">
                      "{prezCandidate.agenda}"
                    </p>
                    <p className="card-text font-weight-semibold">
                      {prezCandidate.batch}
                    </p>
                    <p className="card-text font-weight-semibold">
                      {prezCandidate.course}, {prezCandidate.department}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <h2 className="text-success">Vice-Presidential Candidates</h2>
          <div className="row">
            {vice.map((viceCandidate, index) => (
              <div className="col-md-4" key={index}>
                <div className="card mb-4">
                  <img
                    src={viceCandidate.pic_path}
                    className="card-img-top"
                    alt={viceCandidate.first_name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {viceCandidate.first_name} {viceCandidate.last_name}
                    </h5>
                    <p className="card-text">{viceCandidate.roll_num}</p>
                    <p className="card-text text-dark font-italic">
                      "{viceCandidate.agenda}"
                    </p>
                    <p className="card-text font-weight-semibold">
                      {viceCandidate.batch}
                    </p>
                    <p className="card-text font-weight-semibold">
                      {viceCandidate.course}, {viceCandidate.department}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CandidateInformation;
