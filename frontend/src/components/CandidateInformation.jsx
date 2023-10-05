function CandidateInformation({ prez, vice }) {
  return (
    <div className="hero has-background-white-ter is-fullheight-with-navbar">
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column is-12">
              <h1 className="title has-text-success">Candidate Information</h1>
              <h2 className="subtitle is-5 has-text-dark has-text-centered has-text-weight-bold">
                Information on which candidates are standing for election
                <br />
                and what the key messages of their campaign are.
              </h2>
              <br />
              <br />
              <div className="column id-9">
                <h1 className="title has-text-success">
                  Presidential Candidates
                </h1>
                <br />
                <div className="tile is-ancestor">
                  {prez.map((prezCandidate) => (
                    <div className="tile is-parent" key={prezCandidate.id}>
                      {prezCandidate.last_name !== 'Vote' && (
                        <article className="tile is-child box notification is-white">
                          <h1 className="title is-5 has-text-dark">
                            {prezCandidate.first_name} {prezCandidate.last_name}
                          </h1>
                          <div className="card-content">
                            <p className="subtitle is-3 has-text-dark">
                              {prezCandidate.roll_num}
                            </p>
                            <p className="title is-5 has-text-dark is-italic">
                              &rdquo;{prezCandidate.agenda}&ldquo;
                            </p>
                            <p className="subtitle has-text-dark has-text-weight-semibold">
                              {prezCandidate.batch}
                            </p>
                            <p className="subtitle has-text-dark has-text-weight-semibold">
                              {prezCandidate.course}, {prezCandidate.department}
                            </p>
                          </div>
                          <figure className="image">
                            <img
                              alt="Candidate"
                              className="is-rounded"
                              src={prezCandidate.pic_path}
                            />
                          </figure>
                        </article>
                      )}
                    </div>
                  ))}
                </div>
                <h1 className="title has-text-success">
                  Vice-Presidential Candidates
                </h1>
                <br />
                <div className="tile is-ancestor">
                  {vice.map((viceCandidate) => (
                    <div className="tile is-parent" key={viceCandidate.id}>
                      {viceCandidate.last_name !== 'Vote' && (
                        <article className="tile is-child box notification is-white">
                          <h1 className="title is-5 has-text-dark">
                            {viceCandidate.first_name} {viceCandidate.last_name}
                          </h1>
                          <div className="card-content">
                            <p className="subtitle is-3 has-text-dark">
                              {viceCandidate.roll_num}
                            </p>
                            <p className="title is-5 has-text-dark is-italic">
                              &rdquo;{viceCandidate.agenda}&ldquo;
                            </p>
                            <p className="subtitle has-text-dark has-text-weight-semibold">
                              {viceCandidate.batch}
                            </p>
                            <p className="subtitle has-text-dark has-text-weight-semibold">
                              {viceCandidate.course}, {viceCandidate.department}
                            </p>
                          </div>
                          <figure className="image">
                            <img
                              alt="Candidate"
                              className="is-rounded"
                              src={viceCandidate.pic_path}
                            />
                          </figure>
                        </article>
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
  );
}

export default CandidateInformation;
