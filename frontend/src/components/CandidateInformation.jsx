function CandidateInformation({ prez, vice }) {
  return (
    <div className="hero is-fullheight-with-navbar">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-12">
              <div className="card">
                <div className="card-content">
                  <h1 className="title has-text-success">
                    Candidate Information
                  </h1>
                  <h2 className="subtitle is-5 has-text-dark has-text-centered has-text-weight-bold">
                    Information on which candidates are standing for election
                    <br />
                    and what the key messages of their campaign are.
                  </h2>
                  <div className="column is-9">
                    <h1 className="title has-text-success">
                      Presidential Candidates
                    </h1>
                    <div className="tile is-ancestor">
                      {prez.map((prezCandidate) => (
                        <div className="tile is-parent" key={prezCandidate.id}>
                          {prezCandidate.last_name !== 'Vote' && (
                            <div className="card">
                              <div className="card-content has-text-centered">
                                <div className="circle-image">
                                  <img
                                    alt="Candidate"
                                    className="is-rounded"
                                    src={prezCandidate.pic_path}
                                  />
                                </div>
                                <div className="card-text">
                                  <h1 className="title is-5 has-text-dark">
                                    {prezCandidate.first_name}{' '}
                                    {prezCandidate.last_name}
                                  </h1>
                                  <p className="subtitle is-3 has-text-dark">
                                    {prezCandidate.candidate_num}
                                  </p>
                                  <p className="title is-5 has-text-dark is-italic">
                                    &ldquo;{prezCandidate.agenda}&rdquo;
                                  </p>
                                  <p className="subtitle has-text-dark has-text-weight-semibold">
                                    {prezCandidate.certificate}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <h1 className="title has-text-success">
                      Vice-Presidential Candidates
                    </h1>
                    <div className="tile is-ancestor">
                      {vice.map((viceCandidate) => (
                        <div className="tile is-parent" key={viceCandidate.id}>
                          {viceCandidate.last_name !== 'Vote' && (
                            <div className="card">
                              <div className="card-content has-text-centered">
                                <div className="circle-image">
                                  <img
                                    alt="Candidate"
                                    className="is-rounded"
                                    src={viceCandidate.pic_path}
                                  />
                                </div>
                                <div className="card-text">
                                  <h1 className="title is-5 has-text-dark">
                                    {viceCandidate.first_name}{' '}
                                    {viceCandidate.last_name}
                                  </h1>
                                  <p className="subtitle is-3 has-text-dark">
                                    {viceCandidate.candidate_num}
                                  </p>
                                  <p className="title is-5 has-text-dark is-italic">
                                    "{viceCandidate.agenda}"
                                  </p>
                                  <p className="subtitle has-text-dark has-text-weight-semibold">
                                    {viceCandidate.certificate}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateInformation;
