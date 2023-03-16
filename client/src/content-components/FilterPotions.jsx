import React from "react";
import {POTIONS_URL} from "../constants/urls";

const FilterPotions = ({students, inputs, setInputs, potions, setPotions}) => {
    const handleFilter = async (event) => {
        event.preventDefault();
        let fetchedPotions = await getStudentPotions(event.target.value);
        setPotions(fetchedPotions)
    }

    const getStudentPotions = async (id) => {
        let url = POTIONS_URL + "/" + id;
        let response = await fetch(url)
        return await response.json()
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    return (
        <div>
            <div className="potion">
                Filter potions:
                <label>
                    <select name="student" id="student" value={inputs.student || ""} onChange={handleChange}>
                        <option value="">Select student</option>
                        {students.map((student) => (
                            <option key={student.id} value={student.id}>
                                {student.name}
                            </option>
                        ))}
                    </select>
                    <button value={inputs.student} onClick={handleFilter}>Filter</button>
                </label>

            </div>
        </div>
    )
}

export default FilterPotions
