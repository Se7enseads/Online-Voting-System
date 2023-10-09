import React, { useEffect, useState } from 'react';

function HomePage({ alert }) {
  const [showLogoutAlert, setShowLogoutAlert] = useState(alert);

  useEffect(() => {
    if (showLogoutAlert) {
      const alertTimeout = setTimeout(() => {
        setShowLogoutAlert(false);
      }, 5000);

      return () => {
        clearTimeout(alertTimeout);
      };
    }
  }, [showLogoutAlert]);

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-slate-900">
      <div className="mx-auto max-w-4xl p-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-300">
              Vote App
            </h1>
            <h2 className="mt-4 text-2xl text-gray-700 dark:text-gray-300">
              Login and start voting
            </h2>
            <div className="mt-6 text-gray-700 dark:text-gray-300">
              <p className="mb-4">
                Created a simple University election voting app using Flask and
                React, where students can register themselves. Once registered,
                students can log in and cast their votes.
              </p>
              <p className="mb-4">
                Candidate info tab gives you information about the candidates
                standing for the elections.
              </p>
              <p>
                A new candidate can be registered only by the Admin. Admin can
                log in and fill a form to register a new candidate for the
                election.
              </p>
            </div>
          </div>
          <div>
            <div className="flex justify-center">
              <iframe
                title="Election Animation"
                src="https://lottie.host/?file=cdf99cf4-80f5-40dd-9ea4-ce7cc913f237/rJyNGG2UWA.lottie"
                className="h-72 w-96"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
