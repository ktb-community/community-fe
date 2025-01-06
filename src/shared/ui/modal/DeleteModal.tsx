import { FC, useRef } from 'react';
import Modal from '@/shared/ui/modal/Modal.tsx';
import Button from '@/shared/ui/button/Button.tsx';

interface DeleteModalProps {
  modalId: string;
  modalTitle: string;
  modalText: string;
  onDelete: () => void;
}

const DeleteModal: FC<DeleteModalProps> = ({ modalId, modalTitle, modalText, onDelete }) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const handleOnDelete = () => {
    onDelete();
    closeBtnRef.current?.click();
  }

  return (
    <Modal modalId={modalId}>
      <div className="flex flex-col justify-center items-center">
        <h3 className="font-bold text-lg">{modalTitle}</h3>
        <p className="py-1">{modalText}</p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button ref={closeBtnRef} className="btn">닫기</button>
          </form>
          <Button name="삭제" onClick={handleOnDelete}></Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;