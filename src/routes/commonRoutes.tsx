import { ProductRoutes } from '@/features';
import { RouteObject } from 'react-router-dom';

export const commonRoutes: RouteObject[] = [
  {
    path: '/*',
    element: <ProductRoutes />,
  },
];
