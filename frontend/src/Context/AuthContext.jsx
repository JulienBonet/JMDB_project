import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../api/apiClient';

const AuthContext = createContext();

// -------------------------------------------------------
// DÉCODAGE DU JWT
// -------------------------------------------------------
const decodeJwtPayload = (token) => {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;

    const base64 = base64Url
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .padEnd(Math.ceil(base64Url.length / 4) * 4, '=');

    const binary = atob(base64);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return null;
  }
};

// -------------------------------------------------------
// RÉCUPÉRATION DE LA DATE D'EXPIRATION
// -------------------------------------------------------
const getTokenExpiration = (token) => {
  const payload = decodeJwtPayload(token);

  return Number.isFinite(payload?.exp) ? payload.exp * 1000 : null;
};

export function AuthProvider({ children }) {
  // -------------------------------------------------------
  // INITIALISATION : VÉRIFICATION DU TOKEN STOCKÉ
  // -------------------------------------------------------
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('token');

    if (!storedToken) {
      localStorage.removeItem('user');
      return null;
    }

    const expiration = getTokenExpiration(storedToken);

    if (!expiration || expiration <= Date.now()) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return null;
    }

    return storedToken;
  });

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null;
    } catch {
      localStorage.removeItem('user');
      return null;
    }
  });

  const [authReady, setAuthReady] = useState(false);

  const isAuthenticated = !!token;
  const isAdmin = user?.isAdmin === 1 || user?.isAdmin === true;

  // -------------------------------------------------------
  // LOGIN
  // -------------------------------------------------------
  const login = async (name, password) => {
    const response = await api.post('/api/auth/login', { name, password });

    const receivedToken = response.data.token;
    const payload = decodeJwtPayload(receivedToken);

    if (!payload?.exp || payload.exp * 1000 <= Date.now()) {
      throw new Error('Token JWT invalide ou expiré');
    }

    const userData = {
      id: payload.id,
      name: payload.name,
      isAdmin: payload.isAdmin,
    };

    localStorage.setItem('token', receivedToken);
    localStorage.setItem('user', JSON.stringify(userData));

    setToken(receivedToken);
    setUser(userData);
  };

  // -------------------------------------------------------
  // LOGOUT
  // -------------------------------------------------------
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setToken(null);
    setUser(null);
  }, []);

  // -------------------------------------------------------
  // DÉCONNEXION AUTOMATIQUE À L'EXPIRATION
  // -------------------------------------------------------
  useEffect(() => {
    if (!token) return undefined;

    const expiration = getTokenExpiration(token);

    if (!expiration || expiration <= Date.now()) {
      logout();
      return undefined;
    }

    const remainingTime = expiration - Date.now();

    const timeoutId = window.setTimeout(logout, remainingTime);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [token, logout]);

  // -------------------------------------------------------
  // INTERCEPTEUR : GESTION DE L'EXPIRATION VIA L'API
  // -------------------------------------------------------
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 && error.response?.data?.error === 'Token expired') {
          logout();
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [logout]);

  // -------------------------------------------------------
  // AUTHENTIFICATION PRÊTE
  // -------------------------------------------------------
  useEffect(() => {
    setAuthReady(true);
  }, []);

  // -------------------------------------------------------
  // RETURN
  // -------------------------------------------------------
  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        isAdmin,
        authReady,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
