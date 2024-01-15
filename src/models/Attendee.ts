import Event from "./Event"

interface Attendee{
    name: string
    email: string
    events: Event[]
}

export default Attendee