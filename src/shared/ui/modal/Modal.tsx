import { FC, ReactNode } from 'react';

interface ModalProps {
  modalId: string;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ modalId, children }) => {
  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box">
        {children}
      </div>
    </dialog>
)
}

export default Modal;