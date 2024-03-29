import React, {useEffect, useState} from "react";
import {ROOM_URL, ROOMS_URL} from "../../constants/urls";
import Room from "./Room";

const HousesLeft = ({fetchData, rooms, setRooms}) => {

    const [room, setRoom] = useState(null);

    useEffect (() => {
        const getRooms = async () => {
            const roomsFetched = await fetchData(ROOMS_URL)
            setRooms(roomsFetched)
        }
        getRooms()
    }, [])

    const handleClick = async (event) => {
        event.preventDefault();
        let roomId = event.target.value;
        const url = ROOM_URL.replace("${roomId}", roomId);
        const fetchedRoom = await fetchData(url)
        setRoom(fetchedRoom)
    }

    return (
        <div className="content-left">
            <span className="section-headline">Take a look around Hogwarts!</span>
            <p>We have four houses here in Hogwarts. As you may know, our sorting hat decides
                which student is living in which house. Click on a room to see its residents.</p>
            <table>
                <tbody>
                <tr>
                    <th>House</th>
                    <th>Rooms</th>
                </tr>
                <tr>
                    <td className="house">Gryffindor</td>
                    <td>
                        {rooms.map((room) => (
                            <div key={room.id}>{room.house === "GRYFFINDOR" ? <button className="button-room" value={room.id} onClick={handleClick}>Room {room.number}</button> : ""}</div>
                        ))}
                    </td>
                    <td align="center" className="room-students" rowSpan="4">{room ? <Room room={room}/> : "" }</td>
                </tr>
                <tr>
                    <td className="house">Hufflepuff</td>
                    <td>
                        {rooms.map((room) => (
                            <div key={room.id}>{room.house === "HUFFLEPUFF" ? <button className="button-room" value={room.id} onClick={handleClick}>Room {room.number}</button> : ""}</div>
                        ))}
                    </td>
                </tr>
                <tr>
                    <td className="house">Ravenclaw</td>
                    <td>
                        {rooms.map((room) => (
                            <div key={room.id}>{room.house === "RAVENCLAW" ? <button className="button-room" value={room.id} onClick={handleClick}>Room {room.number}</button> : ""}</div>
                        ))}
                    </td>
                </tr>
                <tr>
                    <td className="house">Slytherin</td>
                    <td>
                        {rooms.map((room) => (
                            <div key={room.id}>{room.house === "SLYTHERIN" ? <button className="button-room" value={room.id} onClick={handleClick}>Room {room.number}</button> : ""}</div>
                        ))}
                    </td>
                </tr>
                </tbody>
            </table>

        </div>
    )
}

export default HousesLeft
