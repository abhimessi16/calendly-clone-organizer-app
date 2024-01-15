import { Dispatch, SetStateAction } from "react"
import SlotDetail from "./SlotDetail"

const OrganizerSlotSelect = ({ weekDay, timeframe, selectedSlots, setSelectedSlots } : 
    {
        weekDay: string,
        timeframe:{
            start: number,
            end: number
        },
        selectedSlots: {
            [day: string]: boolean[]
        },
        setSelectedSlots: Dispatch<SetStateAction<{
            [day: string]: boolean[]
        }>>
    }) => {
        
        return (
            <div className="w-[50%] flex flex-col items-center m-5">
                <div className="p-5 grid-cols-4 grid w-fit">
                    {weekDay.length > 0 && (timeframe.start !== -1 || timeframe.end !== -1) && 
                    selectedSlots[weekDay].slice(timeframe.start, timeframe.end).map((value, index) => {
                        // console.log(`${weekDay}_${index + timeframe.start}`)
                        return (
                        <SlotDetail key={`${weekDay}_${index + timeframe.start}`} weekDay={weekDay} start={index + timeframe.start} isSelected={value} setSelectedSlots={setSelectedSlots}/>
                        )})
                    } 
                </div>
            </div>
  )
}

export default OrganizerSlotSelect