import { useEffect, useState } from 'react';

import Buttons from './Buttons';

function CandidateInformation({ isAdmin }) {
  const [prez, setPrez] = useState([]);
  const [vice, setVice] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5555/api/candidate', {
      'Content-Type': 'application/json',
    })
      .then((response) => response.json())
      .then((data) => {
        setPrez(data.prez);
        setVice(data.vice);
      })
      .catch((error) => {
        return `Error fetching data: ${error}`;
      });
  }, []);

  const removeCandidate = (id) => {
    const updatedPrez = prez.filter((prezCandidate) => prezCandidate.id !== id);
    const updatedVice = vice.filter((viceCandidate) => viceCandidate.id !== id);
    setPrez(updatedPrez);
    setVice(updatedVice);
  };

  return (
    <div>
      <div>
        <h1>Candidate Information</h1>
        <h2>
          Information on which candidates are standing for election
          <br />
          and what the key messages of their campaign are.
        </h2>
        <div>
          <h1>Presidential Candidates</h1>
          <div>
            {prez.map((prezCandidate) => (
              <div key={prezCandidate.id}>
                {prezCandidate.last_name !== 'Vote' && (
                  <div>
                    <div>
                      <p>{prezCandidate.candidate_num}</p>
                      <div className="circle-image">
                        <img alt="Candidate" src={prezCandidate.pic_path} />
                      </div>
                      <div>
                        <h1>
                          {prezCandidate.first_name} {prezCandidate.last_name}
                        </h1>
                        {/* <p className="subtitle is-3 ">
                                    {prezCandidate.candidate_num}
                                  </p> */}
                        <p>&ldquo;{viceCandidate.agenda}&rdquo;</p>
                        <p className="subtitle">
                          Highest education: {prezCandidate.certificate}
                        </p>
                        {isAdmin && (
                          <Buttons
                            id={prezCandidate.id}
                            removeCandidate={removeCandidate}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <h1>Vice-Presidential Candidates</h1>
          <div>
            {vice.map((viceCandidate) => (
              <div key={viceCandidate.id}>
                {viceCandidate.last_name !== 'Vote' && (
                  <div>
                    <div>
                      <div>
                        <img alt="Candidate" src={viceCandidate.pic_path} />
                      </div>
                      <div>
                        <h1>
                          {viceCandidate.first_name} {viceCandidate.last_name}
                        </h1>
                        <p>{viceCandidate.candidate_num}</p>
                        <p>&ldquo;{viceCandidate.agenda}&rdquo;</p>
                        <p>{viceCandidate.certificate}</p>
                        {isAdmin && (
                          <Buttons
                            id={viceCandidate.id}
                            removeCandidate={removeCandidate}
                          />
                        )}
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
  );
}

export default CandidateInformation;
