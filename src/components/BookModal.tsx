import { FormEvent, useEffect, useRef, useState } from 'react';
import Modal, { ModalHandle } from './UI/Modal.tsx';
import Input from './UI/Input.tsx';
import Button from './UI/Button.tsx';
import { Session, useSessionsContext } from '../storage/upcoming-sessions.tsx';
import '../index.scss';

type BookModalProps = {
  session: Session;
  onClose: () => void; 
};

export default function BookModal({ session, onClose }: BookModalProps) {
  const modalRef = useRef<ModalHandle>(null);
  const ctx = useSessionsContext();
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    modalRef.current?.open();
  }, []);

  function addSessionHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // find the session first -- prevent from booking
    const sessionExists = ctx.sessions.filter((sessionFound) => sessionFound.id.includes(session.id));
    if (sessionExists.length > 0) {
      setIsBooked(true)
      return 
    }

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data); 
    ctx.addSession(session);
    onClose();
  }

  return (
    <Modal ref={modalRef}>
        <div className="control">
            <h2>Book a session</h2>
            <h4>For class: "{session.title}"</h4>
            { isBooked && (<p className="warning">You've booked this session! You cannot book a session twice!</p>)}
            <form onSubmit={addSessionHandler}>
              <Input id="name" label="Your name" type="text" className={isBooked ? "form-warning" : undefined} required/>
              <Input id="email" label="Your email" type="email" className={isBooked ? "form-warning" : undefined}  required/>
            <div className="actions">
                <Button textOnly onClick={onClose}>Cancel</Button>
                <Button>Book</Button>
            </div>
            </form>
        </div>
    </Modal>
  );
}
