import { Button } from '@/components';
import { ProductFormModal, ProductsTable } from '../components';
import { useGlobalNotification, useToggle } from '@/hooks';
import { useEffect, useState } from 'react';
import { ProductTypes } from '@/types';
import { useCreateProduct, useDeleteProduct, useFeatchProducts } from '../api';
import { useUpdateProduct } from '../api/updateProduct';

export const Products = () => {
  const { showNotification } = useGlobalNotification();
  const {
    isOpen: isProductFormOpen,
    open: openForm,
    close: closeForm,
  } = useToggle();

  const [productEdit, setProductEdit] = useState<
    ProductTypes.Instance | undefined
  >(undefined);

  const {
    products,
    setData: setProductData,
    featchProducts,
  } = useFeatchProducts();

  const { createProduct, isPeading: isCreateProductPeading } =
    useCreateProduct();

  const { isUpdatedProductPeading, updateProduct } = useUpdateProduct();

  const { deleteProduct } = useDeleteProduct();

  const isFormProcessing = isCreateProductPeading || isUpdatedProductPeading;

  const handleAddNewBtnClick = () => {
    setProductEdit(undefined);
    openForm();
  };

  const handleEditBtnClick = (product: ProductTypes.Instance) => {
    setProductEdit(product);
    openForm();
  };

  const handleDeleteProduct = (product: ProductTypes.Instance) => {
    showNotification({
      message: 'Are you sure you want to delete this product?',
      title: 'Delete product',
      type: 'error',
      isConfirm: true,
      onConfirm: async () => {
        const { data, error } = await deleteProduct(product.id);

        if (error)
          showNotification({
            message: 'Delete product failed!',
            title: 'Oops!',
            type: 'error',
          });
        else if (data) {
          setProductData((prev) => {
            if (prev) {
              return prev.filter((item) => item.id !== product.id);
            }
          });
          showNotification({
            message: 'Delete product successfully!',
            title: 'Success!',
            type: 'success',
          });
        }
      },
    });
  };

  const handleSubmitEditProduct = async (
    product: Omit<ProductTypes.Instance, 'id'>
  ) => {
    const { data, error } = await updateProduct({
      ...product,
      id: productEdit?.id,
    });
    if (error)
      showNotification({
        message: 'Update product failed!',
        title: 'Oops!',
        type: 'error',
      });
    else if (data) {
      setProductData((prev) => {
        if (prev) {
          return prev.map((item) => {
            if (item.id === productEdit?.id) {
              return data;
            }
            return item;
          });
        }
      });
      showNotification({
        message: 'Update product successfully!',
        title: 'Success!',
        type: 'success',
      });
    }
    closeForm();
  };

  const handleSubmitCreateProduct = async (
    product: Omit<ProductTypes.Instance, 'id'>
  ) => {
    const { data, error } = await createProduct(product);
    if (error)
      showNotification({
        message: 'Create product failed!',
        title: 'Oops!',
        type: 'error',
      });
    else if (data) {
      setProductData((prev) => {
        if (prev) {
          return [data, ...prev];
        }
      });
      showNotification({
        message: 'Create product successfully!',
        title: 'Success!',
        type: 'success',
      });
    }
    closeForm();
  };

  const handleSubmitForm = productEdit
    ? handleSubmitEditProduct
    : handleSubmitCreateProduct;

  useEffect(() => {
    featchProducts().then(({ data, error }) => {
      if (error) {
        showNotification({
          message: 'Featch products failed!',
          title: 'Oops!',
          type: 'error',
        });
      } else if (data) {
        setProductData(data);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="wrapper">
      <ProductFormModal
        show={isProductFormOpen}
        isFormProcessing={isFormProcessing}
        onClose={closeForm}
        onSubmitProduct={handleSubmitForm}
        productEdit={productEdit}
      />
      <h1 className="my-10 text-6xl font-bold">Management</h1>
      <div className="flex">
        <Button
          className="ml-auto justify-self-end"
          variant="reverse"
          onClick={handleAddNewBtnClick}
        >
          Add New Product
        </Button>
      </div>
      <ProductsTable
        className="mt-4"
        onEditProduct={handleEditBtnClick}
        onDeleteProduct={handleDeleteProduct}
        products={products}
      />
    </section>
  );
};
