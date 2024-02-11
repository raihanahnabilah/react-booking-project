import { ReactNode, createContext, useContext, useReducer } from "react";

export type Session = {
    id: string;
    title: string;
    category: string;
    summary: string;
    description: string;
    duration: number;
    date: string;
    image: string;
}

// the type that we want to store
export type SessionsState = {
    sessions: Session[];
}

// the initial state
const initialState: SessionsState = {
    sessions: []
}

// the functions
type SessionsContextValue = SessionsState & {
    addSession: (sessionData: Session) => void,
    deleteSession: (id: string) => void
}

const SessionsContext = createContext<SessionsContextValue>({} as SessionsContextValue);

// to use the sessions context
export function useSessionsContext() {
    const sessionCtx = useContext(SessionsContext);
    return sessionCtx;
}

type SessionsContextProviderProps = {
    children: ReactNode;
}

type AddSessionAction = {
    type: "ADD_SESSION"
    payload: Session
}

type DeleteSessionAction = {
    type: "DELETE_SESSION"
    payload: string
}

type Action = AddSessionAction | DeleteSessionAction;

function sessionsReducer(state: SessionsState, action: Action): SessionsState {
    if (action.type === "ADD_SESSION") {
        return {
            ...state,
            sessions: [
                ...state.sessions,
                {
                    id: action.payload.id,
                    title: action.payload.title,
                    category: action.payload.category,
                    summary: action.payload.summary,
                    description: action.payload.description,
                    duration: action.payload.duration,
                    date: action.payload.date,
                    image: action.payload.image,
                }
            ]
        }
    }

    if (action.type === "DELETE_SESSION") {
        return {
            ...state,
            sessions: state.sessions.filter(
                (session) => session.id !== action.payload
            )
        }
    }

    return state;
}

export default function SessionsContextProvider({ children }: SessionsContextProviderProps) {
    const [sessionsState, dispatch] = useReducer(sessionsReducer, initialState)

    const ctx: SessionsContextValue = {
        sessions: sessionsState.sessions,
        addSession(sessionData) {
            dispatch({ type: "ADD_SESSION", payload: sessionData });
        },
        deleteSession(sessionId) {
            dispatch({ type: "DELETE_SESSION", payload: sessionId })
        }
    };

    return (
        <SessionsContext.Provider value={ctx}> {children} </SessionsContext.Provider>
    )
}
