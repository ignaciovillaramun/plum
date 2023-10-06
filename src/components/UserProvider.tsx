'use client';

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';

type UserContextType = {
  userId: string | null;
  setUserId: (id: string | null) => void;
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
  const [userId, setUserId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userId') || null;
    }
    return null;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('userId', userId || '');
    }
  }, [userId]);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
}
