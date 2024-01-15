import { Divider } from "@nextui-org/react"
import AppDetails from "./AppDetails"
import Organizer from "./Organizer"

const Container = () => {
  return (
    <div className="flex flex-row items-center justify-center my-[15vh] h-[60vh]">
        <div className="w-[30%]"><AppDetails/></div>
        <Divider orientation="vertical" className="h-[100%] w-[2px]"/>
        <div className="w-[70%]"><Organizer /></div>
    </div>
  )
}

export default Container