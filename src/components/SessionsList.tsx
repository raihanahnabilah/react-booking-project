import { useEffect, useState } from "react";
import { SESSIONS } from "../storage/dummy-sessions";
import Button from "./UI/Button";
import { Session } from "../storage/upcoming-sessions";
import { FaSearch } from "react-icons/fa";


export default function SessionsList(){

    const [searchInput, setSearchInput] = useState<string>("");
    const [activeSessions, setActiveSessions] = useState<Session[]>(SESSIONS);

    const changeHandler = (e: any) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    console.log(e.target.value);
    // const filtered = SESSIONS.filter((session) => {
    //         return searchInput.toLowerCase() === '' ? session : session.title.toLowerCase().includes(searchInput)
    //     })
    // setActiveSessions(filtered);
    }

    // const searchHandler = () => {
    //     const filtered = SESSIONS.filter((session) => {
    //         return searchInput.toLowerCase() === '' ? session : session.title.toLowerCase().includes(searchInput)
    //     })
    //     setActiveSessions(filtered);
    // }

    useEffect(() => {
        const filtered = SESSIONS.filter((session) => {
            return searchInput.toLowerCase() === '' ? session : session.title.toLowerCase().includes(searchInput)
        })
        setActiveSessions(filtered);
        console.log(activeSessions);
        // if (searchInput.length > 0){
        //     SESSIONS.filter((session) => {
        //         return session.title.match(searchInput);
        //     })
        // }
      }, [searchInput, activeSessions]);

    return (
        <>
        <div className="search"> 
            <input type="search"
            placeholder="Search here"
            onChange={changeHandler}
            value={searchInput}
            id="search"
            >
                </input>
          {/* <Button type="submit" onClick={searchHandler}>
              <FaSearch />
          </Button> */}
        </div>

        <ul id="sessions-list">
        {activeSessions.map((session) => {
        // {SESSIONS.filter((session) => {
        //     return searchInput.toLowerCase() === '' ? session : session.title.toLowerCase().includes(searchInput)
        // }).map((session) => {
          return (
            <li key={session.id}>
              <div className="session-item">
                <img src={session.image}/>
                <div className="session-data">
                  <h3>{session.title}</h3>
                  <p>{session.summary}</p>
                  <div className="actions">
                    <Button to={`/sessions/${session.id}`}>Learn more</Button>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
        {activeSessions.length == 0 && (
            <p>No results found!</p>
        )}
        </ul>
        </>
    )
}