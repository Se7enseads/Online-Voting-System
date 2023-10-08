import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(sessionStorage.getItem('token') || '');

  const updateToken = (newToken) => {
    setToken(newToken);
    sessionStorage.setItem('token', newToken);
  };

  const authContextValue = useMemo(() => {
    return { token, updateToken };
  }, [token]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
