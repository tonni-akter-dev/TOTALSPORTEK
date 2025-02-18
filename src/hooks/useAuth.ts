import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/config/api';

interface User {
  email: string;
  role: string;
}

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
          credentials: 'include',
        });
        const data = await response.json();
        
        if (response.ok) {
          setIsAuthenticated(true);
          setUser(data.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = () => {
    // Clear authentication token
    localStorage.removeItem('token');
    // Clear user email
    localStorage.removeItem('userEmail');
    // Reset any other authentication-related state
  };

  return { isAuthenticated, loading, user, logout };
};

export default useAuth; 