import { forwardRef, useImperativeHandle, useRef } from "react";
import ReactDOM from "react-dom";

export type ModalHandle = {
    open: () => void;
}

type ModalProps = {
    children: React.ReactNode;
};


const Modal = forwardRef<ModalHandle, ModalProps>(function Modal({ children }, ref) {

    const modal = useRef<HTMLDialogElement>(null);

    // this is to expose the open() method when accessed outside
    useImperativeHandle(ref, () => {
        return  {
            open() {
                modal.current?.showModal();
            }
        };
    });

    return ReactDOM.createPortal(
        <dialog ref={modal} className="modal">
            {children}
        </dialog>,
        document.getElementById("modal-root")!
    );
});

export default Modal;