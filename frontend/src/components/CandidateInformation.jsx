import React, { useEffect, useState } from 'react';

function CandidateInformation() {
  const [prez, setPrez] = useState([]);
  const [vice, setVice] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5555/api/candidate', {
      'Content-Type': 'application/json',
    })
      .then((response) => {
        // response.json()
        console.log(response);
        console.log(response.json());
      })
      .then((data) => {
        setPrez(data.prez);
        setVice(data.vice);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

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
            {prez.map((prezCandidate) => (
              <div className="col-md-4" key={prezCandidate.id}>
                <div className="card mb-4">
                  <img
                    alt={prezCandidate.first_name}
                    className="card-img-top"
                    src={prezCandidate.pic_path}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {prezCandidate.first_name} {prezCandidate.last_name}
                    </h5>
                    <p className="card-text">{prezCandidate.candidate_num}</p>
                    <p className="card-text text-dark font-italic">
                      &quot;{prezCandidate.agenda}&quot;
                    </p>
                    <p className="card-text font-weight-semibold">
                      {prezCandidate.certificate}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <h2 className="text-success">Vice-Presidential Candidates</h2>
          <div className="row">
            {vice.map((viceCandidate) => (
              <div className="col-md-4" key={viceCandidate.id}>
                <div className="card mb-4">
                  <img
                    alt={viceCandidate.first_name}
                    className="card-img-top"
                    src={viceCandidate.pic_path}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {viceCandidate.first_name} {viceCandidate.last_name}
                    </h5>
                    <p className="card-text">{viceCandidate.candidate_num}</p>
                    <p className="card-text text-dark font-italic">
                      &quot;{viceCandidate.agenda}&quot;
                    </p>
                    <p className="card-text font-weight-semibold">
                      {viceCandidate.certificate}
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
