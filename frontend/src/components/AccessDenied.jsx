import { useNavigate } from 'react-router';

function AccessDenied() {
  const navigate = useNavigate();

  return (
    <div>
      <img alt="Padlock" src="/images/401_permissions.svg" />
      <h2>Access Denied</h2>
      <h6>You do not have access to view this resource.</h6>
      <button onClick={() => navigate('/login')}>Login</button>
    </div>
  );
}

export default AccessDenied;
