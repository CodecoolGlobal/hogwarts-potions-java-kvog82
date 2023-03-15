import {useEffect, useState} from 'react';
import {ADD_INGREDIENT_URL} from "../constants/urls";

const BrewingForm = ({potions, setPotions, students, brewPotion, setBrewPotion, brewPotionId}) => {

  const [input, setInput] = useState("");
  console.log(brewPotionId)
  console.log(brewPotion)
  const handleChange = (event) => {
    setInput(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let inputPotion = await addIngredient();

    if (potions.some(po => po.id === inputPotion.id)) {
      const updatedPotions = potions.map((item) => item.id === inputPotion.id ? inputPotion : item);
      setPotions(updatedPotions);
      setBrewPotion(inputPotion)
    } else {
      setPotions([...potions, inputPotion]);
      setBrewPotion(inputPotion)
    }
    setInput("");
  }


  const addIngredient = async () => {
    const url = ADD_INGREDIENT_URL.replace("${potionId}", brewPotionId);
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( { "name" : input} )
  };
  const response = await fetch(url, requestOptions)
  const data = await response.json()
  return data
  }

  return (
    <div className="box content-right">
        Brewing Section
        {brewPotionId === 0 ? "Please select a potion to brew" :
            <div>
              <form onSubmit={handleSubmit}>
                <label>Enter new Ingredient for Potion:
                  <input
                    type="text"
                    name="ingredient"
                    value={input}
                    onChange={handleChange}
                  />
                </label>
                  <input type="submit" />
              </form>
            </div>
        }
      {brewPotion.id}
    </div>
  )


  }


export default BrewingForm
