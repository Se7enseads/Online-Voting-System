import { Dialog } from '@headlessui/react';
import {
  Bars3Icon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Test2NavBar({ darkMode, isAdmin, onLogout, toggleDarkMode, token }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigation = [
    { name: 'Candidates', to: '/candidates' },
    { name: 'Results', to: '/results' },
  ];

  if (token) {
    if (isAdmin) {
      navigation.push({
        name: 'Register Candidate',
        to: '/register',
      });
    } else {
      navigation.push({ name: 'Vote', to: '/profile' });
    }
  }

  const handleLogout = () => {
    onLogout();
  };

  const renderLoginLogoutButton = () => {
    if (token) {
      return (
        <button
          aria-label="Logout Button"
          className="font-semibold leading-6 text-gray-900 hover:text-teal-600 dark:text-white dark:hover:text-indigo-300"
          onClick={handleLogout}
        >
          Log out <span aria-hidden="true">&rarr;</span>
        </button>
      );
    }
    return (
      <Link
        className=" font-semibold leading-6 text-gray-900 hover:text-teal-600  dark:text-white dark:hover:text-teal-600"
        to="/login"
      >
        Log in <span aria-hidden="true">&rarr;</span>
      </Link>
    );
  };

  const renderMobileLoginLogoutButton = () => {
    if (token) {
      return (
        <button
          aria-label="Logout Button"
          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800"
          onClick={handleLogout}
        >
          Log out <span aria-hidden="true">&rarr;</span>
        </button>
      );
    }
    return (
      <Link
        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:text-teal-600"
        to="/login"
      >
        Log in <span aria-hidden="true">&rarr;</span>
      </Link>
    );
  };

  const renderNavigationItems = () => {
    if (navigation.length === 2) {
      return (
        <div className="hidden lg:flex lg:flex-1 lg:justify-center lg:space-x-12">
          {navigation.map((item) => (
            <Link
              aria-label={`Navigation Item for ${item.name}`}
              className=" font-semibold leading-6 text-gray-900 hover:text-teal-600  dark:text-white dark:hover:text-teal-600"
              key={item.name}
              to={item.to}
            >
              {item.name}
            </Link>
          ))}
        </div>
      );
    }
    return (
      <div className="hidden lg:flex lg:flex-1 lg:justify-center lg:space-x-4">
        {navigation.map((item) => (
          <Link
            aria-label={`Navigation Item for ${item.name}`}
            className=" font-semibold leading-6 text-gray-900 hover:text-teal-600  dark:text-white dark:hover:text-teal-600"
            key={item.name}
            to={item.to}
          >
            {item.name}
          </Link>
        ))}
      </div>
    );
  };

  return (
    <header className="absolute inset-x-0 top-0 z-10">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-5 lg:px-8"
      >
        <div className="flex font-semibold leading-6 text-gray-900 hover:text-teal-600  dark:text-white dark:hover:text-teal-600 lg:flex-1">
          <Link to="/">
            <img alt="Home" className="h-9 w-9" src="/favicon.png" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            aria-label="Open Menu"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
            type="button"
          >
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        {renderNavigationItems()}

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button
            aria-label="Toggle Dark Mode"
            className="-m-2.5 mr-4 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={toggleDarkMode}
            type="button"
          >
            {darkMode ? (
              <SunIcon aria-hidden="true" className="h-6 w-6" />
            ) : (
              <MoonIcon aria-hidden="true" className="h-6 w-6" />
            )}
          </button>
          {token ? (
            renderLoginLogoutButton()
          ) : (
            <>
              <Link
                aria-label="Sign up Button"
                className="mr-4 font-semibold leading-6 text-gray-900 hover:text-teal-600  dark:text-white dark:hover:text-teal-600"
                to="/sign-up"
              >
                Sign Up
              </Link>
              {renderLoginLogoutButton()}
            </>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        onClose={setMobileMenuOpen}
        open={mobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 dark:bg-slate-900 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <button
              aria-label="Close Menu"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
              type="button"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    aria-label={`Navigation Item for ${item.name}`}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-200"
                    key={item.name}
                    to={item.to}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                {token ? (
                  renderLoginLogoutButton()
                ) : (
                  <>
                    <Link
                      aria-label="Sign up button"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800"
                      to="/sign-up"
                    >
                      Sign Up
                    </Link>
                    {renderMobileLoginLogoutButton()}
                  </>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
export default Test2NavBar;
