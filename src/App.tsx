
import { useEffect, useState } from 'react'
import './App.css'
import { LoggedUserContext } from './context/UserContext'
import NavigationBar from './components/NavigationBar'
import Container from './components/Container'

function App() {

  const [loggedUser, setLoggedUser] = useState("")
  const [loggedUserEmail, setLoggedUserEmail] = useState("")

  useEffect(() => {
  }, [])

  return (
    <LoggedUserContext.Provider value={{loggedUser, loggedUserEmail, setLoggedUser, setLoggedUserEmail}}>
      <NavigationBar />
      <Container />
    </LoggedUserContext.Provider>
  )
}

export default App
