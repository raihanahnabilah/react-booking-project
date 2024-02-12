import { forwardRef, useContext, useImperativeHandle, useRef } from "react";
import ReactDOM from "react-dom";
import { ThemeContext } from "../../storage/theme-context";

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

    const { theme, setTheme } = useContext(ThemeContext);

    return ReactDOM.createPortal(
        <div className={`${theme}-theme`}>
            <dialog ref={modal} className="modal">
                {children}
            </dialog>
        </div>,
        document.getElementById("modal-root")!
    );
});

export default Modal;