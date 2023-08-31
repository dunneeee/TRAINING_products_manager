import { useRoutes } from 'react-router-dom';
import { commonRoutes } from './commonRoutes';

export const AppRoutes = () => {
  const element = useRoutes(commonRoutes);
  return element;
};
