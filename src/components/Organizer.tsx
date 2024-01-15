import { Button } from "@nextui-org/react"
import { useContext, useEffect, useState } from "react"
import { LoggedUserContext } from "../context/UserContext"
import OrganizerSchedule from "./OrganizerSchedule"
import User from "../models/User"

const Organizer = () => {
    
	const { loggedUser, setLoggedUser, setLoggedUserEmail } = useContext(LoggedUserContext)
	const [ state, setState ] = useState(false)

	const handleGoogleSignIn = async () => {

		let form = document.createElement("form")
		form.setAttribute("method", "get")
		form.setAttribute("action", "http://localhost:8080/login")

		document.body.appendChild(form)
		form.submit()

		setState(true)
	}

	const handleSetLoggedUser = async () => {
		let response = await fetch("http://localhost:8080/check/user",
		{method: 'GET', credentials: "include"})

		if(response.redirected){
			return
		}
		
		if (!response.ok) {
			throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
		  }

		console.log(response)

		let data: User = await response.json()
		console.log(data)
		setLoggedUser(data.name)
		setLoggedUserEmail(data.email)
		console.log(loggedUser)
	}

	useEffect(() => {
		handleSetLoggedUser()
	}, [state])


	return (
		<div className="flex flex-col items-center justify-center">
			<h1 className="text-lg font-medium m-2">Let people connect with you.</h1>
			{(loggedUser.length == 0) ? <Button className="font-medium m-2"
			onClick={handleGoogleSignIn}>
			Sign in with Google</Button> :
			<OrganizerSchedule /> }
    	</div>
  )
}

export default Organizer