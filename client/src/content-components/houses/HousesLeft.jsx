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
            Take a look around Hogwarts!
            <p>Click on a room to see its residents.</p>
            <table>
                <tbody>
                <tr>
                    <th>House</th>
                    <th>Rooms</th>
                </tr>
                <tr>
                    <td>Gryffindor</td>
                    <td>
                        {rooms.map((room) => (
                            <div key={room.id}>{room.house === "GRYFFINDOR" ? <button value={room.id} onClick={handleClick}>Room {room.number}</button> : ""}</div>
                        ))}
                    </td>
                    <td align="center" rowSpan="4">{room ? <Room room={room}/> : "" }</td>
                </tr>
                <tr>
                    <td>Hufflepuff</td>
                    <td>
                        {rooms.map((room) => (
                            <div key={room.id}>{room.house === "HUFFLEPUFF" ? <button value={room.id} onClick={handleClick}>Room {room.number}</button> : ""}</div>
                        ))}
                    </td>
                </tr>
                <tr>
                    <td>Ravenclaw</td>
                    <td>
                        {rooms.map((room) => (
                            <div key={room.id}>{room.house === "RAVENCLAW" ? <button value={room.id} onClick={handleClick}>Room {room.number}</button> : ""}</div>
                        ))}
                    </td>
                </tr>
                <tr>
                    <td>Slytherin</td>
                    <td>
                        {rooms.map((room) => (
                            <div key={room.id}>{room.house === "SLYTHERIN" ? <button value={room.id} onClick={handleClick}>Room {room.number}</button> : ""}</div>
                        ))}
                    </td>
                </tr>
                </tbody>
            </table>

        </div>
    )
}

export default HousesLeft
