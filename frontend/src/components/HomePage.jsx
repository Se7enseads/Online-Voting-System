import '@dotlottie/player-component';

function HomePage() {
  return (
    <section className="flex min-h-screen items-center justify-center dark:bg-slate-900">
      <div className="mx-auto max-w-4xl p-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-300">
              Vote App
            </h1>
            <h2 className="mt-4 text-2xl text-gray-700 dark:text-gray-300">
              Login and start voting
            </h2>
            <div className="cool-font mt-6 text-gray-700 dark:text-gray-300">
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
          <div className="hidden justify-center md:flex">
            <dotlottie-player
              autoplay
              background="transparent"
              direction="1"
              hover
              loop
              mode="normal"
              speed="1"
              src="/images/election.lottie"
              style={{ height: '300px', width: '300px' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
