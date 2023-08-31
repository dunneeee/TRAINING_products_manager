import { Icons } from '@/constants';
import { Button, Modal } from '..';
import { useState } from 'react';

const Icon = ({ children }: { children: React.ReactNode }) => {
  return <div className="">{children}</div>;
};

const ICONS = {
  success: (
    <Icon>
      <div aria-label="icon-check" className="">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-[28px] border-4 border-emerald-50 bg-emerald-100 p-3">
          <Icons.Check className="h-10 w-10" />
        </div>
      </div>
    </Icon>
  ),
  error: (
    <Icon>
      <Icons.Trash />
    </Icon>
  ),
};

export type NotificationProps = {
  show?: boolean;
  onClose?: () => void;
  onConfirm?: () => void | Promise<void>;
  title?: string;
  message?: string;
  type?: keyof typeof ICONS;
  isConfirm?: boolean;
  conFirmLabel?: string;
  isProcessing?: boolean;
};

export const Notification = ({
  message = '',
  onClose,
  show = false,
  title = '',
  type = 'error',
  isConfirm = false,
  conFirmLabel = 'Confirm',
  isProcessing = false,
  onConfirm,
}: NotificationProps) => {
  const [currentProcessing, setCurrentProcessing] = useState(isProcessing);

  return (
    <Modal show={show} size="sm" onClose={onClose}>
      <Modal.Header divider={false}>
        <div className="">{ICONS[type]}</div>
      </Modal.Header>
      <Modal.Body className="mb-5">
        <h3 className="mb-1 text-lg font-bold">{title}</h3>
        <p className="leading-5 text-gray-600">{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <div className="mb-6 mt-8 flex">
          {isConfirm ? (
            <Button variant="outline" onClick={onClose} className="mr-2 w-1/2">
              Cancel
            </Button>
          ) : (
            <Button
              variant={type === 'error' ? 'danger' : 'primary'}
              onClick={onClose}
              className="w-full"
            >
              Close
            </Button>
          )}
          {isConfirm && (
            <Button
              variant={type === 'error' ? 'danger' : 'primary'}
              onClick={async () => {
                setCurrentProcessing(true);
                onConfirm && (await onConfirm());
                setCurrentProcessing(false);
              }}
              className="ml-2 w-1/2"
              loading={currentProcessing}
              disabled={currentProcessing}
            >
              {conFirmLabel}
            </Button>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  );
};
