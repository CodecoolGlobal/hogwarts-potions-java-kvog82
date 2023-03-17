import React, {useState} from "react";
import {POTIONS_URL} from "../../../constants/urls";

const PotionForm = ({potions, setPotions, students}) => {
    const [potion, setPotion] = useState({
        brewingStudentId : "",
        ingredients: []
    });
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const ingredientsList = Object.values(inputs)
            .filter((value, index) => index >= 1 && index <= 5)
            .map(name => ({ name }));
        const cleanedIngredients = ingredientsList.filter(ingredient => ingredient !== "");
        const newPotion = {
            brewingStudentId: inputs.brewingStudentId,
            ingredients: cleanedIngredients
        };
        try {
            const response = await fetch(POTIONS_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPotion),
            });
            const savedPotion = await response.json();
            setPotion(savedPotion);
            setPotions([...potions, savedPotion]);
            setInputs({});
        } catch (err) {
            console.log(err);
        }
    };

      return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Student:
                    <select name="brewingStudentId" id="brewingStudentId" value={inputs.brewingStudentId || ""} onChange={handleChange}>
                        <option value="">Select student</option>
                        {students.map((student) => (
                            <option key={student.id} value={student.id}>
                                {student.name}
                            </option>
                        ))}
                    </select>
                </label><br></br>
                <label>Ingredient 1:
                    <input
                        type="text"
                        name="ingredient1"
                        value={inputs.ingredient1 || ""}
                        onChange={handleChange}
                    />
                </label><br></br>
                <label>Ingredient 2:
                    <input
                        type="text"
                        name="ingredient2"
                        value={inputs.ingredient2 || ""}
                        onChange={handleChange}
                    />
                </label><br></br>
                <label>Ingredient 3:
                    <input
                        type="text"
                        name="ingredient3"
                        value={inputs.ingredient3 || ""}
                        onChange={handleChange}
                    />
                </label><br></br>
                <label>Ingredient 4:
                    <input
                        type="text"
                        name="ingredient4"
                        value={inputs.ingredient4 || ""}
                        onChange={handleChange}
                    />
                </label><br></br>
                <label>Ingredient 5:
                    <input
                        type="text"
                        name="ingredient5"
                        value={inputs.ingredient5 || ""}
                        onChange={handleChange}
                    />
                </label><br></br>

                <input type="submit" />
            </form>
        </div>
      )
}

export default PotionForm
