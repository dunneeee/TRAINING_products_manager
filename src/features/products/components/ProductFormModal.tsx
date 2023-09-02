import { ProductTypes } from '@/types';
import { Icons } from '@/constants';
import { Button, Modal } from '@/components';

import { ProductForm } from '.';

type ProductFormModalProps = {
  productEdit?: ProductTypes.Instance;
  show?: boolean;
  onClose?: () => void;
  onSubmitProduct?: (product: Omit<ProductTypes.Instance, 'id'>) => void;
  isFormProcessing?: boolean;
};

export const ProductFormModal = ({
  isFormProcessing,
  onClose,
  onSubmitProduct,
  productEdit,
  show,
}: ProductFormModalProps) => {
  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>
        <div className="flex items-center gap-x-2">
          {productEdit && (
            <div aria-label="icon-check" className="">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-[28px] border-4 border-emerald-50 bg-emerald-100 p-3">
                <Icons.Check className="h-10 w-10" />
              </div>
            </div>
          )}
          <h3 className="text-lg font-semibold leading-7">
            {productEdit ? 'Products Information' : 'Add new product'}
          </h3>
        </div>
      </Modal.Header>
      <Modal.Body>
        <ProductForm
          product={productEdit}
          id="product-form"
          onSubmitProduct={onSubmitProduct}
        />
      </Modal.Body>
      <Modal.Footer>
        <div className="flex justify-end py-2">
          <Button className="font-semibold" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="ml-2"
            type="submit"
            form="product-form"
            disabled={isFormProcessing}
            loading={isFormProcessing}
          >
            Confirm
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
