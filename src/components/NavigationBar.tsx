
import {
    Navbar,
    NavbarContent,
    NavbarItem,
    NavbarBrand,
    Link,
    Button
} from "@nextui-org/react"
import { useContext } from "react"
import { LoggedUserContext } from "../context/UserContext"

const NavigationBar = () => {

    const { loggedUser } = useContext(LoggedUserContext)

    return (
        <>
            <Navbar maxWidth="full" className="border-b-1 border-gray-300">
                <NavbarContent justify="start">
                    <NavbarBrand className="text-3xl font-extralight">Calendly Clone</NavbarBrand>
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem className="text-black hover:bg-gray-100 active:bg-gray-300 hover:cursor-pointer p-2 h-full flex items-center">
                        <Link href="http://localhost:4200" color="foreground" className="text-lg">Attend Events</Link>
                    </NavbarItem>
                    {loggedUser.length > 0 && (<>
                    <NavbarItem className="text-cyan-800 p-2 h-full flex items-center">
                        <p className="text-lg font-medium">{loggedUser}</p>
                    </NavbarItem>
                    <NavbarItem className="text-black p-2 h-full flex items-center">
                        <Button>Logout</Button>
                    </NavbarItem>
                    </>)}
                </NavbarContent>
            </Navbar>
        </>
    )
}

export default NavigationBar

