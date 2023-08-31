import { createContext, useContext } from 'react';

type ModalContextType = {
  isOpen: boolean;
  onClose?: () => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('ModalContext must be used within ModalProvider');
  }

  return context;
};
