import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Test2NavBar({ isAdmin, onLogout, token }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { to: '/candidates', name: 'Candidates' },
    { to: '/results', name: 'Results' },
    {
      to: token ? (isAdmin ? '/candidate_register' : '/profile') : null,
      name: token ? (isAdmin ? 'Register Candidate' : 'Vote') : null,
    },
  ];

  const handleLogout = () => {
    onLogout();
  };

  const renderLoginLogoutButton = () => {
    if (token) {
      return (
        <a
          aria-label="Logout Button"
          className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-300"
          onClick={handleLogout}
        >
          Log out <span aria-hidden="true">&rarr;</span>
        </a>
      );
    } else {
      return (
        <Link
          className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-300"
          to="/login"
        >
          Log in <span aria-hidden="true">&rarr;</span>
        </Link>
      );
    }
  };

  const renderMobileLoginLogoutButton = () => {
    if (token) {
      return (
        <a
          aria-label="Logout Button"
          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800"
          onClick={handleLogout}
        >
          Log out <span aria-hidden="true">&rarr;</span>
        </a>
      );
    } else {
      return (
        <Link
          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800"
          to="/login"
        >
          Log in <span aria-hidden="true">&rarr;</span>
        </Link>
      );
    }
  };

  const renderNavigationItems = () => {
    if (navigation.length === 2) {
      return (
        <div className="hidden lg:flex lg:flex-1 lg:justify-center lg:space-x-12">
          {navigation.map((item) => (
            <Link
              aria-label={`Navigation Item for ${item.name}`}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-300"
              to={item.to}
              key={item.name}
            >
              {item.name}
            </Link>
          ))}
        </div>
      );
    } else {
      return (
        <div className="hidden lg:flex lg:flex-1 lg:justify-center lg:space-x-4">
          {navigation.map((item) => (
            <Link
              aria-label={`Navigation Item for ${item.name}`}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-300"
              to={item.to}
              key={item.name}
            >
              {item.name}
            </Link>
          ))}
        </div>
      );
    }
  };

  return (
    <header className="inset-x-0 top-0">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-5 lg:px-8"
      >
        <div className="flex text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-300 lg:flex-1">
          <Link className="-m-1.5 p-1.5 text-xl text-white" to={'/'}>
            <img alt="Home" className="h-8 w-auto" src="/favicon.png" />
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
          {token ? (
            renderLoginLogoutButton()
          ) : (
            <>
              <Link
                aria-label="Sign up Button"
                className="mr-4 text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-300"
                to={'/sign-up'}
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
            <Link className="-m-1.5 p-1.5" to="/" aria-label="Home Button">
              <img alt="" className="h-8 w-auto" src="/favicon.png" />
            </Link>
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
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800"
                    to={item.to}
                    key={item.name}
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
                      to={'/sign-up'}
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
