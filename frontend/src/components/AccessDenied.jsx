function AccessDenied() {
  return (
    <div className="mt-5 text-center">
      <img alt="Padlock" src="/images/401_permissions.svg" />
      <h2>Access Denied</h2>
      <h6>You do not have access to view this resource.</h6>
      <button
        className="btn btn-primary mt-2"
        onClick={() => navigate('/login')}
      >
        Login
      </button>
    </div>
  );
}

export default AccessDenied;
