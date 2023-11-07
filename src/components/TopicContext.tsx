'use client';

import React, { createContext, useState, ReactNode } from 'react';

type UserContextType = {
  lastTopicUrl: string | null;
  setLastTopicUrl: (url: string | null) => void; // Update the type of url
};

const TopicContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode;
};

export const TopicProvider = ({ children }: UserProviderProps) => {
  const [lastTopicUrl, setLastTopicUrl] = useState<string | null>(null); // Specify the type here
  console.log(lastTopicUrl);

  const updateLastTopicUrl = (url: string | null) => {
    // Specify the type here
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
