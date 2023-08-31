import { createContext, useContext } from 'react';

type DropDownContext = {
  active: boolean;
  onClose?: () => void;
};

export const DropDownContext = createContext<DropDownContext | null>(null);

export const useDropDownContext = () => {
  const context = useContext(DropDownContext);
  if (!context)
    throw new Error('DropDownContext must be used within a DropDown');
  return context;
};
