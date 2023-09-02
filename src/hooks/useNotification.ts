import { useState } from 'react';

import { Notification, NotificationProps } from '@/components';

const useNotification = () => {
  const [notiProps, setNotiProps] = useState<NotificationProps>();

  const showNotification = (props: Omit<NotificationProps, 'show'>) => {
    setNotiProps({
      ...props,
      show: true,
    });
  };

  const onClose = () => {
    setNotiProps(undefined);
  };

  const NotificationComponent = Notification;

  return {
    showNotification,
    onClose,
    NotificationComponent,
    ...notiProps,
  };
};

export default useNotification;
