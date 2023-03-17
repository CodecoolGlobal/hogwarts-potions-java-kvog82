const Room = ({room}) => {
    const students = room.students

    return (
        <div>
            <span className="house">Students in Room  {room.number}</span>
            {students.length === 0 ? <div className="potion">Room is empty.</div> :
                <div>
                    {students.map((student) => (
                        <span key={student.id}>
                        <span className="potion">
                            {student.name}
                            {student.pet === "OWL" ? <span> &#x1F989; </span> : ""}
                            {student.pet === "RAT" ? <span> &#x1F400; </span> : ""}
                            {student.pet === "CAT" ? <span> &#x1F408; </span> : ""}
                        </span><br></br>
                        </span>
                    ))}
                </div>
            }
        </div>
    )
}

export default Room
