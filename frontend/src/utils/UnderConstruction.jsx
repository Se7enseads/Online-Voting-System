import React from 'react';

function UnderConstructionPage() {
  return (
    <div className="flex min-h-screen items-center justify-center dark:bg-slate-900 dark:text-white">
      <div className="max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        <div className="text-center">
          <h1 className="cool-font mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            Under Construction
          </h1>
          <p className="mb-8 text-gray-600 dark:text-gray-300">
            We&apos;re working on something awesome. Check back soon!
          </p>
        </div>
      </div>
    </div>
  );
}

export default UnderConstructionPage;
