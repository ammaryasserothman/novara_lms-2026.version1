import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { CURRENT_USER } from '../data/mockData';

/**
 * Interface representing the shape of the authentication context.
 */
interface AuthContextType {
  /** The currently logged-in user, or null if unauthenticated. */
  user: User | null;
  /** Boolean flag indicating if a user is currently logged in. */
  isAuthenticated: boolean;
  /** Flag for async operations (login/signup). */
  isLoading: boolean;
  /** Error message string, if any operation failed. */
  error: string | null;
  /**
   * Authenticates a user with email and password.
   * @param email User email
   * @param password User password
   */
  login: (email: string, password: string) => Promise<void>;
  /**
   * Registers a new user.
   * @param userData Object containing registration details
   */
  signup: (userData: { email: string; password: string; name: string; role?: 'student' | 'instructor'; avatar?: string; bio?: string; title?: string; phone?: string; address?: string }) => Promise<void>;
  /** Logs out the current user and clears session storage. */
  logout: () => void;
  /**
   * Updates attributes of the current user.
   * @param updates Partial user object to merge
   */
  updateUser: (updates: Partial<User>) => void;
  /** Clears the current error state. */
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('novara_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('novara_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('novara_user');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    // Prevent unused var warning
    console.log(password ? "Password provided" : "No password");
    setIsLoading(true);
    setError(null);

    // Mock Login Delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      // For prototype, accept 'demo@novara.edu' or just default to CURRENT_USER if email matches
      // For simplicity in this "Frontend Only" scope, we'll just log them in as the Mock User
      // regardless of input, or we can be slightly strict. Let's be open for smooth demo.

      console.log(`Logging in with ${email}`);
      const mockUser = { ...CURRENT_USER, email: email };
      setUser(mockUser);

    } catch (err) {
      console.error(err);
      setError('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: { email: string; password: string; name: string; role?: 'student' | 'instructor'; avatar?: string; bio?: string; title?: string; phone?: string; address?: string }) => {
    setIsLoading(true);
    setError(null);

    // Mock Signup Delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const newUser: User = {
        ...CURRENT_USER,
        id: `u-${Date.now()}`,
        name: userData.name,
        email: userData.email,
        role: userData.role || 'student',
        avatar: userData.avatar || CURRENT_USER.avatar,
        bio: userData.bio || CURRENT_USER.bio,
        title: userData.title || CURRENT_USER.title,
        phone: userData.phone || CURRENT_USER.phone,
        address: userData.address || CURRENT_USER.address,
      };

      setUser(newUser);
    } catch (err) {
      console.error(err);
      setError('Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('novara_user');
  };

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      error,
      login,
      signup,
      logout,
      updateUser,
      clearError
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};