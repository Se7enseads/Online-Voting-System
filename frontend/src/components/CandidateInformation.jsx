import { useEffect, useState } from 'react';
import Buttons from './Buttons';

function CandidateInformation2({ isAdmin }) {
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
    <div className="h-full p-4 dark:bg-slate-800">
      <h1 className="cool-font mt-20 text-3xl font-semibold dark:text-white">
        Candidate Information
      </h1>
      <p className="text-xl dark:text-white">
        Information on which candidates are standing for election and what the
        key messages of their campaign are.
      </p>

      <div className="mt-8">
        <h1 className="text-2xl font-semibold dark:text-white">
          Presidential Candidates
        </h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {prez.map((prezCandidate) => (
            <div
              key={prezCandidate.id}
              className="rounded-lg bg-white p-4 shadow-md"
            >
              {prezCandidate.last_name !== 'Vote' && (
                <div>
                  <p className="text-2xl font-semibold">
                    {prezCandidate.candidate_num}
                  </p>
                  <div className="circle-image">
                    <img
                      className="h-40 w-40 rounded-full object-cover"
                      alt="Candidate"
                      src={prezCandidate.pic_path}
                    />
                  </div>
                  <div>
                    <h2 className="mt-2 text-xl">
                      {prezCandidate.first_name} {prezCandidate.last_name}
                    </h2>
                    <p>&ldquo;{prezCandidate.agenda}&rdquo;</p>
                    <p className="mt-2 text-gray-600">
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
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-2xl font-semibold dark:text-white">
          Vice President Candidates
        </h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {vice.map((viceCandidate) => (
            <div
              key={viceCandidate.id}
              className="rounded-lg bg-white p-4 shadow-md"
            >
              {viceCandidate.last_name !== 'Vote' && (
                <div>
                  <p className="text-2xl font-semibold">
                    {viceCandidate.candidate_num}
                  </p>
                  <div className="circle-image">
                    <img
                      className="h-40 w-40 rounded-full object-cover"
                      alt="Candidate"
                      src={viceCandidate.pic_path}
                    />
                  </div>
                  <div>
                    <h2 className="mt-2 text-xl">
                      {viceCandidate.first_name} {viceCandidate.last_name}
                    </h2>
                    <p>&ldquo;{viceCandidate.agenda}&rdquo;</p>
                    <p className="mt-2 text-gray-600">
                      Highest education: {viceCandidate.certificate}
                    </p>
                    {isAdmin && (
                      <Buttons
                        id={viceCandidate.id}
                        removeCandidate={removeCandidate}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CandidateInformation2;
