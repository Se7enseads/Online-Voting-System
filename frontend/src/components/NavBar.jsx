import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useNavigate } from 'react-router';

function Test2NavBar({ isAdmin, onLogout, token }) {
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { href: '/candidates', name: 'Candidates' },
    { href: '/results', name: 'Results' },
    {
      href: isAdmin ? '/candidate_register' : '/profile',
      name: token ? (isAdmin ? 'Register Candidate' : 'Vote') : null,
    },
  ];

  const loginText = token ? 'Log out' : 'Log in';

  const handleLoginLogout = () => {
    if (token) {
      onLogout();
    } else {
      navigate('/login');
    }
  };

  const renderLoginLogoutButton = () => (
    <a
      className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-300"
      onClick={handleLoginLogout}
    >
      {loginText} <span aria-hidden="true">&rarr;</span>
    </a>
  );

  const renderMobileLoginLogoutButton = () => (
    <a
      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800"
      onClick={handleLoginLogout}
    >
      {loginText} <span aria-hidden="true">&rarr;</span>
    </a>
  );

  return (
    <header className="inset-x-0 top-0">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-5 lg:px-8"
      >
        <div className="flex text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-300 lg:flex-1">
          <a className="-m-1.5 p-1.5 text-xl text-white" href="/">
            <img alt="" className="h-8 w-auto" src="/favicon.png" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
            type="button"
          >
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-300"
              href={item.href}
              key={item.name}
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {token ? (
            renderLoginLogoutButton()
          ) : (
            <>
              <a
                className="mr-4 text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-300"
                href="/sign-up"
              >
                Sign Up
              </a>
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
            <a className="-m-1.5 p-1.5" href="#">
              <img alt="" className="h-8 w-auto" src="/favicon.png" />
            </a>
            <button
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
                  <a
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800"
                    href={item.href}
                    key={item.name}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                {token ? (
                  renderLoginLogoutButton()
                ) : (
                  <>
                    <a
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800"
                      href="/sign-up"
                    >
                      Sign Up
                    </a>
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
