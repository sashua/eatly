import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Button } from './Button';

interface ModalDialogProps {
  open: boolean;
  title?: string;
  acceptText?: string;
  cancelText?: string;
  children?: React.ReactNode;
  onAccept?: () => void;
  onClose?: () => void;
}

export function ModalDialog({
  open,
  title,
  acceptText,
  cancelText,
  children,
  onAccept,
  onClose = () => undefined,
}: ModalDialogProps) {
  return (
    <Transition as={Fragment} show={open}>
      <Dialog className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="transition"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" aria-hidden={true} />
        </Transition.Child>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="transition"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            leave="transition"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-90"
          >
            <Dialog.Panel className="mx-auto max-w-xl space-y-8 rounded-2xl bg-white px-8 pb-6 pt-8">
              {title && (
                <Dialog.Title className="text-2xl font-bold">
                  {title}
                </Dialog.Title>
              )}
              {children && <div>{children}</div>}
              {(acceptText || cancelText) && (
                <div className="flex justify-end gap-4">
                  {acceptText && (
                    <Button variant="solid" onClick={onAccept}>
                      {acceptText}
                    </Button>
                  )}
                  {cancelText && (
                    <Button variant="bordered" onClick={onClose}>
                      {cancelText}
                    </Button>
                  )}
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
