import { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';
import { getCurrentPlayer, setCurrentPlayer, removeCurrentPlayer } from '@/utils/helpers';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user on mount
  useEffect(() => {
    const savedUser = getCurrentPlayer();
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const hashPassword = async (password) => {
    const saltRounds = 10; // 10-12 is good for browser
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  const createAccount = async (userData) => {
    const { username, avatar, password } = userData;
    const hashedPassword = await hashPassword(password);

    const newUser = {
      id: username,
      avatar,
      password: hashedPassword,
      totalScore: 0,
      gamesPlayed: 0,
      gamesWon: 0,
      averageScore: 0,
      bestScore: 0,
      createdAt: new Date().toISOString(),
      lastPlayed: new Date().toISOString(),
    };
    
    setUser(newUser);
    setCurrentPlayer(newUser);

    return newUser;
  };

  const login = async (userData, password) => {
    const isValidPassword = await bcrypt.compare(password, userData.password);

    if (!isValidPassword) {
      throw new Error();
    }

    const { id, avatar, createdAt } = userData;
    const loggedInUser = {
      id,
      avatar,
      createdAt,
      lastLogin: new Date().toISOString(),
    };

    setUser(loggedInUser);
    setCurrentPlayer(loggedInUser);

    return loggedInUser;
  };

  // Logout
  const logout = () => {
    setUser(null);
    removeCurrentPlayer();
  };

  // Value to provide
  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    createAccount,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
