import { ThemeProvider as NextThemeProvider } from 'next-themes';
import React, {
  ReactNode,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

interface ThemeProviderProps {
  children: ReactNode;
  value?: {
    theme: string;
    setTheme: Dispatch<SetStateAction<string>>;
  };
}

export const ThemeContext = createContext({
  theme: '',
  setTheme: (() => {}) as Dispatch<SetStateAction<string>>,
});

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  value,
}) => {
  const [theme, setTheme] = useState(value?.theme || '');
  const contextValue = value || { theme, setTheme };

  return (
    <ThemeContext.Provider value={contextValue}>
      <NextThemeProvider attribute="class">{children}</NextThemeProvider>
    </ThemeContext.Provider>
  );
};
