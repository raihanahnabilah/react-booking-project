import { Outlet } from 'react-router-dom';
import Button from '../components/UI/Button';
import { useState, useEffect } from 'react';
import SessionsContextProvider from '../storage/upcoming-sessions';
import SessionCartModal from '../components/SessionCartModal';
import { ThemeContext } from '../storage/theme-context';
import '../index.scss';

export default function Root() {
  const [ showModal, setShowModal ] = useState(false);
  
  function openCartHandler() {
    setShowModal(true);
  }

  function closeCartHandler() {
    setShowModal(false);
  }

  const [theme, setTheme] = useState('dark');
  const isCurrentDark = theme === 'dark';

  const handleThemeChange = () => {
    setTheme(isCurrentDark ? 'light' : 'dark');
  }

  useEffect(() => {
    var element = document.body;
    if (isCurrentDark) {
      element.classList.add("body-dark-mode");
      element.classList.remove("body-light-mode");
    } else {
      element.classList.add("body-light-mode");
      element.classList.remove("body-dark-mode");
    }
  }, [isCurrentDark]);

  const [isActive, setActive] = useState("home")

    
  return (
    <>
    <SessionsContextProvider>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div className={`${theme}-theme`}>
          <header id="main-header">
            <div id="main-header-content">
              <h1>ReactMentoring</h1>
              <nav>
                <ul id="navigation">
                  <li>
                    <Button className={isActive  === "home" ? "active-page" : ""} onClick={() => setActive("home")}  textOnly to="/react-booking-project/">Our Mission</Button>
                  </li>
                  <li>
                    <Button className={isActive  === "sessions" ? "active-page" : ""} onClick={() => setActive("sessions")} textOnly to="/react-booking-project/sessions">Our Sessions</Button>
                  </li>
                  <li>
                    <Button onClick={openCartHandler}>Your Upcoming Sessions</Button> {/** This should be like a modal */}
                    { showModal && 
                      (<SessionCartModal onClose={closeCartHandler}/>)
                    }  
                  </li>
                  <li>
                    <div className="toggle-btn-section">
                      <div className={`toggle-checkbox m-vertical-auto`}>
                        <input
                          className="toggle-btn__input"
                          type="checkbox"
                          name="checkbox"
                          onChange={handleThemeChange}
                          checked={theme === 'light'}
                        />
                        <button type="button" className={`toggle-btn__input-label`} onClick={handleThemeChange}></button>
                      </div>
                    </div>
                  </li>
                </ul>
              </nav>    
            </div>    
          </header>
          <Outlet />
          </div>
        </ThemeContext.Provider>
      </SessionsContextProvider>
    </>
  );
}
