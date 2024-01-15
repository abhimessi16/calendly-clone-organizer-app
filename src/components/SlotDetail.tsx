import { Button } from "@nextui-org/react"
import { Dispatch, SetStateAction, useState } from "react"

const SlotDetail = ({ start, weekDay, isSelected, setSelectedSlots } : 
	{ 
		start: number, 
		weekDay: string,
		isSelected: boolean,
		setSelectedSlots: Dispatch<SetStateAction<{ [day: string] : boolean[]}>>
	}) => {

	const [ slotSelected, setSlotSelected ] = useState(isSelected)

	const formatTime = (hour: number) => {
		return `${(hour < 10) ? "0" : ""}${hour}:00 - 
		${(hour < 9) ? "0" : ""}${hour + 1}:00`
	}

	const handleSlotSelected = () => {
		setSlotSelected(!slotSelected)
		setSelectedSlots(slots => {
			const updatedSlots = {...slots}

			updatedSlots[weekDay] = [...slots[weekDay]]
			updatedSlots[weekDay][start] = !slotSelected

			return updatedSlots
		})
	}

    return (
      <Button className={`p-2 m-[1px] w-[100px] rounded-none border-1 ${slotSelected ? "bg-default-foreground text-white" : "bg-white"}`}
	  onClick={handleSlotSelected}>
		{formatTime(start)}
	  </Button>
    )
}

export default SlotDetail