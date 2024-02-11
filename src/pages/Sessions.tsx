import { useEffect, useState } from 'react';
import Button from '../components/UI/Button.tsx';
import SessionsList from '../components/SessionsList.tsx';
import { Session } from '../storage/upcoming-sessions.tsx';
import { SESSIONS } from '../storage/dummy-sessions.ts'; // normally, we would probably load that from a server

export default function SessionsPage() {

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

  const menuItems = [...new Set(SESSIONS.map((session) => session.category))]

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  // const [filteredItems, setFilteredItems] = useState(activeSessions);

  function filterButtonHandler(selectedCategory: string) {
    if (selectedFilters.includes(selectedCategory)){
      let filters = selectedFilters.filter((category) => category !== selectedCategory); // remove the filter
      setSelectedFilters(filters);
      // console.log(selectedCategory);
      // console.log(selectedFilters);
    } else {
      setSelectedFilters([...selectedFilters, selectedCategory]); // add the filter
      // console.log(selectedCategory);
      // console.log(selectedFilters);
    }
  } 

  useEffect(() => {
    // For search filter
      const filtered = SESSIONS.filter((session) => {
          const searchFilter = searchInput.toLowerCase() === '' ? session : session.title.toLowerCase().includes(searchInput)
          return searchFilter
      });

      // buttons filter
      if (selectedFilters.length > 0){
        let currentSessions = selectedFilters.map((selectedCategory) => {
          let sessions = filtered.filter((session) => session.category === selectedCategory);
          return sessions;
        });
        setActiveSessions(currentSessions.flat());
      } else {
        setActiveSessions([...filtered]);
      }
                
      // setActiveSessions(filtered);

      // console.log(activeSessions);
      // if (searchInput.length > 0){
      //     SESSIONS.filter((session) => {
      //         return session.title.match(searchInput);
      //     })
      // }

      // // For the buttons filter
      // if (selectedFilters.length > 0){
      //   let currentSessions = selectedFilters.map((selectedCategory) => {
      //     let sessions = activeSessions.filter((session) => session.category === selectedCategory);
      //     return sessions;
      //   });
      //   setFilteredItems(currentSessions.flat());
      // } else {
      //   setFilteredItems([...activeSessions]);
      // }
    }, [searchInput, selectedFilters]);
    
  return (
    <main id="sessions-page">
        <div className="search"> 
            <input type="search"
            placeholder="Search a mentoring session"
            onChange={changeHandler}
            value={searchInput}
            id="search"
            >
                </input>
          {/* <Button type="submit" onClick={searchHandler}>
              <FaSearch />
          </Button> */}
        </div>

        <div className="filter-wrapper">
          Filter: 
          {
          menuItems.map((category) => {
            const isActive = selectedFilters?.includes(category);
            const component = isActive ? (<Button onClick={() => filterButtonHandler(category)}>{category}</Button>) : (<Button textOnly onClick={() => filterButtonHandler(category)}>{category}</Button>);
            return component;
          })
        }
        </div>


      <header>
        <h2>Available mentoring sessions</h2>
        <p>
          From an one-on-one introduction to React's basics all the way up to a
          deep dive into state mechanics - we got just the right session for
          you!
        </p>
      </header>

      {/* Todo: Output list of sessions */}
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
        
      {/* <ul id="sessions-list">
      {SESSIONS.map((session) => {
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
      </ul> */}
    </main>
  );
}
