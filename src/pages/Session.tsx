import { useNavigate, useParams } from 'react-router-dom';
import { MdArrowBack } from "react-icons/md";

import { SESSIONS } from '../storage/dummy-sessions.ts';
import Button from '../components/UI/Button.tsx';
import Modal, { ModalHandle } from '../components/UI/Modal.tsx';
import { FormEvent, useEffect, useRef, useState } from 'react';
import Input from '../components/UI/Input.tsx';
import { Session, useSessionsContext } from '../storage/upcoming-sessions.tsx';
import BookModal from '../components/BookModal.tsx';

export default function SessionPage() {
  const params = useParams<{ id: string }>();

  const sessionId = params.id;
  const loadedSession = SESSIONS.find((session) => session.id === sessionId);

  if (!loadedSession) {
    return (
      <main id="session-page">
        <p>No session found!</p>
      </main>
    );
  }

  const history = useNavigate();
  const modalRef = useRef<ModalHandle>(null);
  const ctx = useSessionsContext();

  // const { addSession } = useSessionsContext();
  const form = useRef<HTMLFormElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  // function addSessionHandler(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);
  //   const data = Object.fromEntries(formData);

  //   const extractedData = data as unknown as { id: string; title: string; summary: string; description: string; duration: number; date: string; image: string };
  //   addSession({ id: extractedData.id, title: extractedData.title, summary: extractedData.summary, description: extractedData.description, duration: extractedData.duration, date: extractedData.date, image: extractedData.image });
  //   console.log(extractedData);

  //   form.current?.reset();
  //   setShowModal(false);
  // }

  function openBookSessionHandler() {
    setShowModal(true);
    // modalRef.current?.open();
    // if (modalRef.current) {
    //   modalRef.current.open();
    // }
  }

  function closeBookSessionHandler() {
    setShowModal(false);
  }

  // To open the modal
  // useEffect(() => {
  //   if (modalRef.current) {
  //     modalRef.current.open();
  //   }
  // }, [])
  
  useEffect(() => {
    const sessionExists = ctx.sessions.filter((sessionFound) => sessionFound.id.includes(loadedSession.id));
    if (sessionExists.length > 0) {
      setIsBooked(true)
    } else {
      setIsBooked(false)
    }
  }, [ctx.sessions.length]);


  return (
    <main id="session-page">
      {showModal && <BookModal session={loadedSession} onClose={closeBookSessionHandler}/>}
      {/* {showModal && (
              <Modal ref={modalRef}>
                <div className="control">
                  <h2>Book a session</h2>
                  <h4>For class: "{loadedSession.title}"</h4>
                  <form ref={form} onSubmit={addSessionHandler}>
                    <Input id="name" label="Your name" type="text" />
                    <Input id="email" label="Your email" type="text" />
                    <div className="actions">
                      <Button textOnly onClick={handleCloseBookSession}>Cancel</Button>
                      <Button>Book</Button>
                    </div>
                  </form>
                </div>
              </Modal>
            )} */}
      <article>
        <div style={{ marginBottom: "20px" }}>
          <Button textOnly onClick={() => history(-1)}>
            <MdArrowBack/> Back to all sessions
          </Button>
        </div>
        <header>
          <img
            src={loadedSession.image}
            alt={loadedSession.title}
          />
          <div>
            <h2>{loadedSession.title}</h2>
            <time dateTime={new Date(loadedSession.date).toISOString()}>
              {new Date(loadedSession.date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </time>
            {isBooked && <p className="warning">You've booked this session.</p>}
            <p>
              {/* Todo: Add button that opens "Book Session" dialog / modal */}
              <Button onClick={openBookSessionHandler} disabled={isBooked}>Book Session</Button>
            </p>
          </div>
        </header>
        <p id="content">{loadedSession.description}</p>
      </article>
    </main>
  );
}
