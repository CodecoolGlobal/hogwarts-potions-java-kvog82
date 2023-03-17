import React, {useEffect, useState} from "react";
import {
    GET_POTION_HELP_URL,
    POTIONS_URL,
    ROOM_URL,
    ROOMS_AVAILABLE_URL, ROOMS_RAT_OWNERS_URL,
    ROOMS_URL,
    STUDENTS_URL
} from "../constants/urls";
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
        <div className="content-left">
            houses
            <table>
                <tbody>
                <tr>
                    <th>House</th>
                    <th>Rooms</th>
                    <th>Room Students (click on room)</th>
                </tr>
                <tr>
                    <td>Gryffindor</td>
                    <td>
                        {rooms.map((room) => (
                            <div key={room.id}>{room.house === "GRYFFINDOR" ? <button value={room.id} onClick={handleClick}>Room {room.number}</button> : ""}</div>
                        ))}
                    </td>
                    <td align="center" className="houses" rowSpan="4">{room ? <Room room={room}/> : "" }</td>
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
