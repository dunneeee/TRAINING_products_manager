import { NotifiContext } from '@/providers';
import { useContext } from 'react';

const useGlobalNotification = () => {
  const context = useContext(NotifiContext);

  if (!context)
    throw new Error(
      'useGlobalNotification must be used within a NotifiProvider'
    );

  return context;
};

export default useGlobalNotification;
