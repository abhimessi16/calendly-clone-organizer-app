import { Button } from "@nextui-org/react"
import { useContext, useEffect, useState } from "react"
import { LoggedUserContext } from "../context/UserContext"
import Organizer from "../models/Organizer"
import OrganizerForm from "./OrganizerForm"
import OrganizerSlotSelect from "./OrganizerSlotSelect"
import Slot from "../models/Slot"

const OrganizerSchedule = () => {

    let weekDays = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]

    const selectedSlotsInitializer = () => {
        let slots: { [day: string]: boolean[]} = {}
        for(let day in weekDays){
            let slotStatus = new Array(24).fill(false)
            slots[weekDays[day]] = slotStatus
        }
        return slots
    }

    const { loggedUser, loggedUserEmail } = useContext(LoggedUserContext)

    const [ organizer, setOrganizer ] = useState<Organizer>({
        name: "",
        email: "",
        slots: []
    })

    const [ timeframe, setTimeframe ] = useState<{
        start: number,
        end: number
    }>({
        start: 9,
        end: 18
    })

    const [ weekDay, setWeekDay ] = useState("")

    const [ selectedSlots , setSelectedSlots ] = useState<{
        [day: string]: boolean[]
    }>(selectedSlotsInitializer)

    const updateSelectedSlots = (slots: Slot[]) => {

        for(let i = 0; i < slots.length; i++){
            setSelectedSlots(prev => {
                const updated = {...prev}
                updated[slots[i].day] = [...prev[slots[i].day]]
                updated[slots[i].day][slots[i].start] = true
                return updated
            })
        }

    }

    const userLoggedUpdateOrganizer = async () => {

        let response: Response = await fetch("http://localhost:8080/api/v1/organizer/" + loggedUserEmail,
        {method: 'GET', credentials: "include"})

        if(!response.ok){
            console.log(`No organizer present with email ${loggedUserEmail}`)
            return
        }

        let data: Organizer = await response.json()

        if(data.name === loggedUser && data.email === loggedUserEmail){
            setOrganizer(data)
            updateSelectedSlots(data.slots)
        }else{
            throw new Error(`Organizer has been compromised!`)
        }
    }

    const handleSchedule = async () => {
        // update the organizer by calling relevant endpoint
        
        let api_url = "http://localhost:8080/api/v1/organizer"
        let method = ''
        let body = {}
        let endpoint = ''

        let slots = []

        for(let day in weekDays){
            for(let i = 0; i < 24; i++){
                if(selectedSlots[weekDays[day]][i]){
                    slots.push({
                        start: i,
                        end: i + 1,
                        day: weekDays[day].toUpperCase()
                    })
                }
            }
        }

        if(loggedUserEmail === organizer.email){
            method = 'PUT'
            body = slots
            endpoint = '/' + organizer.email
        }else{
            method = 'POST'
            body = {
                name: loggedUser,
                email: loggedUserEmail,
                slots: slots
            }
            endpoint = '/add'
        }

        console.log(method, body, endpoint)

        let response: Response = await fetch(api_url + endpoint,
        {method: method, credentials: "include", headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }, body: JSON.stringify(body)})
        
          console.log(response);
          
        if(!response.ok){
            alert("There was an error!")
            return
        }

        let data: Organizer = await response.json()
        console.log(data)
        setOrganizer(data)
        updateSelectedSlots(data.slots)

        alert(`Slots are ${method === 'PUT' ? "updated" : "created"}!`)

    }

	useEffect(() => {	
		// make an api call to check if user is an organizer
		// if yes then set the Organizer and values
        userLoggedUpdateOrganizer()
        // selectedSlotsInitializer()
        console.log(selectedSlots)
        console.log(organizer);
        
        console.log('logged user update')
	}, [loggedUser])

    // useEffect(() => {
    //     if(weekDay.length > 0){
    //         setSelectedSlots(prev => {
    //             const updatedSlots = {...prev}
    //             updatedSlots[weekDay] = [...prev[weekDay]]
    //             for(let i = 0; i < 24; i++){
    //                 if(timeframe.start > i || timeframe.end <=  i){
    //                     updatedSlots[weekDay][i] = false
    //                 }
    //             }
    //             return updatedSlots
    //         })
    //     }
    //     console.log("updating")
    // }, [timeframe])

    return (
        <>
            <div className="flex flex-row items-center justify-center w-full">
                
                <OrganizerForm organizer={organizer} weekDay={weekDay} setWeekDay={setWeekDay} setTimeframe={setTimeframe}/>
                <OrganizerSlotSelect weekDay={weekDay} timeframe={timeframe} selectedSlots={selectedSlots} setSelectedSlots={setSelectedSlots}/>
            </div>
            <Button className="font-medium m-2"
            onClick={handleSchedule}>
                {organizer.name.length > 0 ? "Update" : "Create"} your schedule
            </Button>
        </>
  )
}

export default OrganizerSchedule