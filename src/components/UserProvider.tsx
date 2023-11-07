'use client';

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';

type UserContextType = {
  user: string | null;
  theme: string | null; // Add the 'theme' variable
  setUserId: (id: string | null) => void;
  setThemeColor: (theme: string | null) => void; // Add the 'setThemeColor' function
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUserId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userId') || null;
    }
    return null;
  });

  const [theme, setThemeColor] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || null;
    }
    return null;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('userId', user || '');
      localStorage.setItem('theme', theme || '');
    }
  }, [user, theme]); // Include 'theme' in the dependency array

  return (
    <UserContext.Provider value={{ user, theme, setUserId, setThemeColor }}>
      {children}
    </UserContext.Provider>
  );
}
