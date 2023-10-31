import '@dotlottie/player-component';
import { useEffect, useState } from 'react';

import Buttons from '../utils/Buttons';

function CandidateInformation2({ isAdmin, url }) {
  const [prez, setPrez] = useState([]);
  const [vice, setVice] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${url}/api/candidate`, {
      'Content-Type': 'application/json',
    })
      .then((response) => response.json())
      .then((data) => {
        setPrez(data.prez);
        setVice(data.vice);
        setIsLoading(false); // Data has been loaded
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

  const renderLoading = () => {
    return (
      <div>
        <dotlottie-player
          autoplay
          background="transparent"
          direction="1"
          loop
          mode="normal"
          speed="1"
          src="/images/loading.lottie"
          style={{ height: '300px', width: '300px' }}
        />
      </div>
    );
  };

  return (
    <div className="h-full p-4 dark:bg-slate-900">
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
        {isLoading ? (
          renderLoading()
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {prez.length === 0 ? (
              <div>
                <p> No presidential candidates available.</p>
              </div>
            ) : (
              prez.map((prezCandidate) => (
                <div
                  className="w-4/6 rounded p-3 shadow-lg"
                  key={prezCandidate.id}
                >
                  <div>
                    <p className="text-2xl font-semibold">
                      {prezCandidate.candidate_num}
                    </p>
                    <img
                      alt="Candidate"
                      className="h-40 rounded object-cover"
                      src={prezCandidate.pic_path}
                    />
                    <div>
                      <h2 className="mt-2 w-full text-xl">
                        {prezCandidate.certificate}.{prezCandidate.first_name}
                        {prezCandidate.last_name}
                      </h2>
                      <p className="w-full text-2xl text-gray-400">
                        &ldquo; {prezCandidate.agenda} &rdquo;
                      </p>
                      {isAdmin && (
                        <Buttons
                          id={prezCandidate.id}
                          removeCandidate={removeCandidate}
                          url={url}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <div className="mt-8">
        <h1 className="text-2xl font-semibold dark:text-white">
          Vice President Candidates
        </h1>
        {isLoading ? (
          renderLoading()
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {vice.length === 0 ? (
              <div>No vice-presidential candidates available.</div>
            ) : (
              vice.map((viceCandidate) => (
                <div
                  className="rounded-lg bg-white p-4 shadow-md"
                  key={viceCandidate.id}
                >
                  <div>
                    <p className="text-2xl font-semibold">
                      {viceCandidate.candidate_num}
                    </p>
                    <div className="circle-image">
                      <img
                        alt="Candidate"
                        className="h-40 w-40 rounded-full object-cover"
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
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CandidateInformation2;
