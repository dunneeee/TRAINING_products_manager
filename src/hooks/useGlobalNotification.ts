import { useContext } from 'react';

import { NotifiContext } from '@/providers';

const useGlobalNotification = () => {
  const context = useContext(NotifiContext);

  if (!context)
    throw new Error(
      'useGlobalNotification must be used within a NotifiProvider'
    );

  return context;
};

export default useGlobalNotification;
