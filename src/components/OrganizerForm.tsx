import { Dispatch, SetStateAction, useContext, useState } from "react"
import Organizer from "../models/Organizer"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Slider, SliderValue } from "@nextui-org/react"
import { LoggedUserContext } from "../context/UserContext"

const OrganizerForm = ({ organizer, weekDay, setWeekDay, setTimeframe } : {
    organizer: Organizer,
    weekDay: string,
    setWeekDay : Dispatch<SetStateAction<string>>,
    setTimeframe: Dispatch<SetStateAction<{
        start: number,
        end: number
    }>>}) => {

        const { loggedUser, loggedUserEmail } = useContext(LoggedUserContext)

        let dayNames = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]
        const [startEnd, setStartEnd] = useState([9, 18])

        const handleSliderChange = (value: number | number[]) => {
            if(typeof value == 'number'){
                setStartEnd([0, value])
            }else if(Array.isArray(value) && value.every(item => typeof item == 'number')){
                setStartEnd(value)
                setTimeframe({
                    start: value[0],
                    end: value[1]
                })
            }else{
                console.log("Invalid slider values!")
            }
        }

        const timeValueFormat = (value: SliderValue) => {
            // return `${(value. < 10) ? "" : ""}`
            let valueStr = value.toString().split(',')
            return `${(Number(valueStr[0]) < 10) ? "0" : ""}${valueStr[0]}:00 - 
                ${(Number(valueStr[1]) < 10) ? "0" : ""}${valueStr[1]}:00`
        }

        return (<>
            <div className="p-2 m-5 flex flex-col items-center justify-center w-[30%]">
                <Input label="Name:" 
                labelPlacement="inside"
                className="p-2 w-[300px]" disabled
                value={loggedUser}></Input>
                <Input label="Email:" 
                labelPlacement="inside"
                className="p-2 w-[300px]" disabled
                value={loggedUserEmail}></Input>
                <Dropdown>
                    <DropdownTrigger>
                        <Button className="m-2 w-[150px]">{weekDay.length == 0 ? "Select Day" : weekDay}</Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        {dayNames.map((value, index) => (
                            <DropdownItem key={index} onClick={() => setWeekDay(value)}>{value}</DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
                <Slider label="Select schedule"
                step={1}
                minValue={0}
                maxValue={24}
                value={startEnd}
                onChange={handleSliderChange}
                className="max-w-md p-2 font-medium"
                getValue={timeValueFormat}
                color="foreground"></Slider>
                <p className="text-sm">Note: Here 24:00 shows the start of next day.</p>
            </div>
            <p className="w-[20%] text-small p-2 text-pretty text-slate-400 border-1 rounded-lg justify-start">
                Select individual week day and the timings during which you will be available on that day.
                You can then select the slots for attendees to book. Repeat for each weekday.
            </p>
            </>
        )
}

export default OrganizerForm