import Event from "./Event"

interface Slot{
    start: number
    end: number
    day: string
    event?: Event
}

export default Slot