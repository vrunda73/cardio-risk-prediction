import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import type { User } from '../types';
import { getCurrentUser, logoutUser } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('cardiosense_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('cardiosense_token'),
  );
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback((newToken: string, newUser: User) => {
    localStorage.setItem('cardiosense_token', newToken);
    localStorage.setItem('cardiosense_user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } finally {
      setToken(null);
      setUser(null);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    if (!token) return;
    try {
      setIsLoading(true);
      const freshUser = await getCurrentUser();
      setUser(freshUser);
      localStorage.setItem('cardiosense_user', JSON.stringify(freshUser));
    } catch {
      // Token may be invalid — clear auth state
      setToken(null);
      setUser(null);
      localStorage.removeItem('cardiosense_token');
      localStorage.removeItem('cardiosense_user');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  // On mount, verify token validity silently
  useEffect(() => {
    if (token && !user) {
      refreshUser();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
