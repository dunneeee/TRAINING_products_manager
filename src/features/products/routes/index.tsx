import { Routes, Route } from 'react-router-dom';
import { Products } from './Products';
import { ProductDetail } from './ProductDetail';

export const ProductRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Products />} />
      <Route path="/detail/:productId" element={<ProductDetail />} />
    </Routes>
  );
};
