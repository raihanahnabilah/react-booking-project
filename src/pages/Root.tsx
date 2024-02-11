import { Outlet, useLocation } from 'react-router-dom';
import Button from '../components/UI/Button';
import Modal, { ModalHandle } from '../components/UI/Modal';
import { useRef, useState } from 'react';
import SessionsContextProvider, { useSessionsContext } from '../storage/upcoming-sessions';
import SessionCartModal from '../components/SessionCartModal';

export default function Root() {

  // TODO: If I am at the current "/"

  // TODO: Create the modal!!
  const [ showModal, setShowModal ] = useState(false);
  

  function openCartHandler() {
    setShowModal(true);
    // modalRef.current?.open();
    // if (modalRef.current) {
    //   modalRef.current.open();
    // }
  }

  function closeCartHandler() {
    setShowModal(false);
  }


  return (
    <>
    <SessionsContextProvider>
      <main id="main-header">
        <h1>ReactMentoring</h1>
        <nav>
          <ul id="navigation">
            <li>
              <Button textOnly to="/">Our Mission</Button>
            </li>
            <li>
              <Button textOnly to="/sessions">Our Sessions</Button>
            </li>
            <li>
              <Button onClick={openCartHandler}>Your Upcoming Sessions</Button> {/** This should be like a modal */}
              { showModal && 
                (<SessionCartModal onClose={closeCartHandler}/>)
              }  
            </li>
          </ul>
        </nav>        
      </main>
      <Outlet />
      </SessionsContextProvider>
    </>
  );
}
