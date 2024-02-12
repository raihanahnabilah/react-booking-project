import { useEffect, useRef } from "react";
import { useSessionsContext } from "../storage/upcoming-sessions"
import Modal, { ModalHandle } from "./UI/Modal";
import Button from "./UI/Button";
import { FaRegTrashAlt } from "react-icons/fa";
import '../index.scss';

type SessionCartModalProps = {
    onClose: () => void; 
};

export default function SessionCartModal({ onClose }: SessionCartModalProps){
    const sessionCtx = useSessionsContext()
    const modalRef = useRef<ModalHandle>(null);


    useEffect(() => {
        modalRef.current?.open();
    }, []);

    return (
        <Modal ref={modalRef}>
            <h2>Your upcoming session</h2>
            <ul>
                {sessionCtx.sessions && sessionCtx.sessions.map((session) => {
                    return (
                    <li key={session.id}>
                        <div className="upcoming-session">
                            <h3>{session.title}</h3>
                            <p>{session.summary}</p>
                            <Button textOnly onClick={() => sessionCtx.deleteSession(session.id)}><FaRegTrashAlt /></Button>
                        </div>
                    </li>
                    )
                    })
                }
                {sessionCtx.sessions.length == 0 && <p>You have not registered to any upcoming sessions.</p>}
            </ul>
            <Button onClick={onClose}>Close</Button>
      </Modal>
        
    );
}
