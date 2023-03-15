import {useEffect, useState} from 'react';
import {ADD_INGREDIENT_URL} from "../constants/urls";

const AddIngredient = ({brewPotion, setBrewPotion}) => {

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        console.log(brewPotion)
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let inputPotion;

        if (inputs.potionId > 0) {
            inputPotion = await getPotion();
        } else {
            console.log(inputs)
            inputPotion = await createPotion(inputs.studentId);
        }
        console.log(inputPotion)
        if (potions.some(po => po.id === inputPotion.id)) {
            const updatedPotions = potions.map((item) => item.id === inputPotion.id ? inputPotion : item);
            setPotions(updatedPotions);
        } else {
            setPotions([...potions, inputPotion]);
        }
        setInputs({});
    }


    const getPotion = async () => {
        const url = ADD_INGREDIENT_URL.replace("${potionId}", inputs.potionId);
        const potionFetched = await fetchPotion(url)
        setBrewPotion(potionFetched)
        return potionFetched
    }

    const fetchPotion = async (url) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { "name" : inputs.ingredient} )
        };
        const response = await fetch(url, requestOptions)
        const data = await response.json()
        return data
    }

    return (
        <div className="box content-right">
            Brewing Section
            <form onSubmit={handleSubmit}>
                <label>Enter Ingredient:
                    <input
                        type="text"
                        name="ingredient"
                        value={inputs.ingredient}
                        onChange={handleChange}
                    />
                </label>
                <input type="submit" />
            </form>

        </div>
    )


}


export default AddIngredient
