import { createContext } from 'react';

import { useNotification } from '@/hooks';
import { NotificationProps } from '@/components';

type NotifiContextType = {
  showNotification: (props: Omit<NotificationProps, 'show'>) => void;
  hiddenNotification: () => void;
};

export const NotifiContext = createContext<NotifiContextType | null>(null);

export const NotifiProvider = ({ children }: { children: React.ReactNode }) => {
  const { NotificationComponent, showNotification, onClose, ...notifiProps } =
    useNotification();

  const hiddenNotification = () => {
    onClose();
  };

  return (
    <NotifiContext.Provider value={{ showNotification, hiddenNotification }}>
      <NotificationComponent {...notifiProps} onClose={onClose} />
      {children}
    </NotifiContext.Provider>
  );
};
