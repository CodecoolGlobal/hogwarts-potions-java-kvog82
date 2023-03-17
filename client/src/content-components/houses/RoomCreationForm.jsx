import React, {useState} from "react";
import {ROOMS_URL} from "../../constants/urls";

const RoomCreationForm = ({rooms, setRooms}) => {
    const [inputs, setInputs] = useState({});
    const [room, setRoom] = useState({
        house : "",
        number: [],
        students: []
    });

    const handleChange = (event) => {
        console.log(inputs)
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const lastRoom = rooms[rooms.length -1]
        const lastRoomNumber = lastRoom.number
        const newRoom = {
            house: inputs.house,
            number: lastRoomNumber+1,
            students: []
        };
        try {
            const response = await fetch(ROOMS_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newRoom),
            });
            const savedRoom = await response.json();
            setRoom(savedRoom);
            setRooms([...rooms, savedRoom]);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            Create a new empty room:
            <form onSubmit={handleSubmit}>
                <label>House: <span>&nbsp;</span>
                    <select name="house" id="house" value={inputs.house || ""} onChange={handleChange}>
                        <option value="GRYFFINDOR">Gryffindor</option>
                        <option value="HUFFLEPUFF">Hufflepuff</option>
                        <option value="RAVENCLAW">Ravenclaw</option>
                        <option value="SLYTHERIN">Slytherin</option>
                    </select>
                </label>
                <input className="submit" type="submit" value="Create" />
            </form>
        </div>
    )
}

export default RoomCreationForm
