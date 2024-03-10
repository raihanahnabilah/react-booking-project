import { useNavigate, useParams } from 'react-router-dom';
import { MdArrowBack } from "react-icons/md";
import { SESSIONS } from '../storage/dummy-sessions.ts';
import Button from '../components/UI/Button.tsx';
import { ModalHandle } from '../components/UI/Modal.tsx';
import { useEffect, useRef, useState } from 'react';
import { useSessionsContext } from '../storage/upcoming-sessions.tsx';
import BookModal from '../components/BookModal.tsx';
import '../index.scss';

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
  const ctx = useSessionsContext();

  const [showModal, setShowModal] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  function openBookSessionHandler() {
    setShowModal(true);
  }

  function closeBookSessionHandler() {
    setShowModal(false);
  }
  
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
              <Button onClick={openBookSessionHandler} disabled={isBooked}>Book Session</Button>
            </p>
          </div>
        </header>
        <p id="content">{loadedSession.description}</p>
      </article>
    </main>
  );
}
