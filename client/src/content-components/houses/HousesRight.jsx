import {ROOMS_AVAILABLE_URL, ROOMS_RAT_OWNERS_URL, ROOMS_URL} from "../../constants/urls";
import RoomCreationForm from "./RoomCreationForm";
import RoomDeletionForm from "./RoomDeletionForm";

const HousesRight = ({fetchData, rooms, setRooms}) => {

    const handleFilter = async (event) => {
        event.preventDefault();
        let url = ROOMS_URL;
        if (event.target.value === "available") {
            url = ROOMS_AVAILABLE_URL
        }
        if (event.target.value === "rat-owners") {
            url = ROOMS_RAT_OWNERS_URL
        }
        const fetchedRooms = await fetchData(url)
        setRooms(fetchedRooms)
        console.log(fetchedRooms)
    }
    return (
        <div className="content-right">
            <h4>Admin options</h4>
            <button value="available" onClick={handleFilter}>Show available rooms</button>
            <button value="rat-owners" onClick={handleFilter}>Show rooms for rat owners</button>
            <RoomCreationForm rooms={rooms} setRooms={setRooms} />
            <RoomDeletionForm rooms={rooms} setRooms={setRooms} fetchData={fetchData}/>
        </div>
    )
}

export default HousesRight
