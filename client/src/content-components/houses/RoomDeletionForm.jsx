import React, {useState} from "react";
import {ROOM_URL, ROOMS_URL} from "../../constants/urls";

const RoomDeletionForm = ({rooms, setRooms, fetchData}) => {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        console.log(inputs)
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let deleteRoom = rooms.find(room => room.number === parseInt(inputs.roomNumber));
        if (deleteRoom) {
            const url = ROOM_URL.replace("${roomId}", deleteRoom.id);
            try {
                await fetch(url, {method: "DELETE"});
                let newRooms = await fetchData(ROOMS_URL)
                let cleanedRooms = newRooms.filter(function( room ) {
                    return room.house !== null;
                });
                setRooms(cleanedRooms)
            } catch (err) {
            }
        }
    };

    return (
        <div>
            Delete room:
            <form onSubmit={handleSubmit}>
                <label>Room number:
                    <input
                        type="number"
                        name="roomNumber"
                        value={inputs.roomNumber || ""}
                        onChange={handleChange}
                    />
                </label><br></br>
                <input type="submit" />
            </form>
        </div>
    )
}

export default RoomDeletionForm
