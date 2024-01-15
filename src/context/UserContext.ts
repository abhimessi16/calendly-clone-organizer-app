
import { createContext, Dispatch, SetStateAction } from "react";

interface LoggedUser{
    loggedUser: string
    loggedUserEmail: string
    setLoggedUser: Dispatch<SetStateAction<string>>
    setLoggedUserEmail: Dispatch<SetStateAction<string>>
}

export const LoggedUserContext = createContext<LoggedUser>({
    loggedUser: "",
    loggedUserEmail: "",
    setLoggedUser: () => {},
    setLoggedUserEmail: () => {}
})
