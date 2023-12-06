// SelectedLabelContext.tsx
import { createContext, ReactNode, useContext, useState } from 'react';

interface SelectedLabelContextProps {
  selectedLabel: string;
  setSelectedLabel: (label: string) => void;
}

export const SelectedLabelContext = createContext<
  SelectedLabelContextProps | undefined
>(undefined);

export const SelectedLabelProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedLabel, setSelectedLabel] = useState<string>('');

  return (
    <SelectedLabelContext.Provider value={{ selectedLabel, setSelectedLabel }}>
      {children}
    </SelectedLabelContext.Provider>
  );
};

export const useSelectedLabel = () => {
  const context = useContext(SelectedLabelContext);

  if (!context) {
    throw new Error(
      'useSelectedLabel must be used within a SelectedLabelProvider'
    );
  }

  return context;
};
