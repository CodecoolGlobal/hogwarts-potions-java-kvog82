const Room = ({room}) => {
    const students = room.students

    return (
        <div>
            Students in Room  {room.number}
            {students.length === 0 ? <div>Room is empty.</div> :
                <div>
                    {students.map((student) => (
                        <div key={student.id}>
                            {student.name}
                            {student.pet === "OWL" ? <span> &#x1F989; </span> : ""}
                            {student.pet === "RAT" ? <span> &#x1F400; </span> : ""}
                            {student.pet === "CAT" ? <span> &#x1F408; </span> : ""}
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default Room
