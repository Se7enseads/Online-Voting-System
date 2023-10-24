import { useNavigate } from 'react-router';

function AccessDenied() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <img
        alt="Padlock"
        className="h-20 w-20"
        src="/images/401_permissions.svg"
      />
      <h2 className="mt-4 text-2xl">Access Denied</h2>
      <h6 className="mt-2 text-sm">
        You do not have access to view this resource.
      </h6>
      <button
        className="mt-4 rounded bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
        onClick={() => navigate('/login')}
      >
        Login
      </button>
    </div>
  );
}

export default AccessDenied;
