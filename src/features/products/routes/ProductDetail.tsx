import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { ProductTypes } from '@/types';
import { NotFound } from '@/features/base';
import { Spinner, Button } from '@/components/';
import { useApi, useGlobalNotification } from '@/hooks';

import { ProductForm } from '../components';
import { useUpdateProduct, getProduct } from '../api/';

export const ProductDetail = () => {
  const { showNotification, hiddenNotification } = useGlobalNotification();

  const { execute, isError, data, isPeading } = useApi((id) =>
    getProduct(`${id}`)
  );

  const { updateProduct, isUpdatedProductPeading } = useUpdateProduct();

  const { productId } = useParams();

  const navigate = useNavigate();

  const onBack = () => navigate(-1);

  const onSubmit = async (product: Omit<ProductTypes.Instance, 'id'>) => {
    const { data, error } = await updateProduct({ ...product, id: productId });

    if (error) {
      return showNotification({
        title: 'Update product',
        message:
          'Something wrong when update product, maybe server error! Try again later.',
        type: 'error',
      });
    }

    if (data) {
      showNotification({
        title: 'Update product',
        message: 'Update product successfully! Would you like to go back?',
        type: 'success',
        isConfirm: true,
        conFirmLabel: 'Go Back',
        onConfirm: () => {
          hiddenNotification();
          onBack();
        },
      });
    }
  };

  useEffect(() => {
    if (productId) execute(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  if (isPeading)
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-white">
        <Spinner size="lg" />
      </div>
    );

  if (isError) return <NotFound />;

  return (
    <section className="wrapper flex h-screen w-full flex-wrap items-center justify-center">
      <div className="mx-auto flex flex-wrap items-center justify-between overflow-hidden">
        <h1 className="mb-4 w-full overflow-hidden text-ellipsis text-5xl font-bold">
          {data?.name}
        </h1>
        <div className="w-1/2 max-w-md">
          <ProductForm
            product={data}
            id="product-detail-form"
            onSubmitProduct={onSubmit}
          />
          <div className="mt-10 flex">
            <Button className="mr-2 w-full" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button
              className="ml-2 w-full"
              form="product-detail-form"
              type="submit"
              loading={isUpdatedProductPeading}
              disabled={isUpdatedProductPeading}
            >
              Save
            </Button>
          </div>
        </div>
        <div className="w-1/2">
          <img
            src={data?.image}
            className="rounded-lg object-cover"
            alt={data?.name}
          />
        </div>
      </div>
    </section>
  );
};
