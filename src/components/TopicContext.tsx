'use client';

import React, { createContext, useState, ReactNode } from 'react';

type UserContextType = {
  lastTopicUrl: string | null;
  setLastTopicUrl: (url: string | null) => void;
};

const TopicContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode;
};

export const TopicProvider = ({ children }: UserProviderProps) => {
  const [lastTopicUrl, setLastTopicUrl] = useState<string | null>(null);
  const updateLastTopicUrl = (url: string | null) => {
    setLastTopicUrl(url);
  };

  return (
    <TopicContext.Provider
      value={{ lastTopicUrl, setLastTopicUrl: updateLastTopicUrl }}
    >
      {children}
    </TopicContext.Provider>
  );
};

export default TopicContext;
