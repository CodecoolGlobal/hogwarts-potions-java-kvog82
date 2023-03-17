import React, {useState} from 'react';
import {ADD_INGREDIENT_URL} from "../../constants/urls";
import Ingredients from "./Ingredients";
import BrewingHelp from "./brewingSection/BrewingHelp";
import PotionForm from "./brewingSection/PotionForm";

const BrewingForm = ({potions, setPotions, students, brewPotion, setBrewPotion, brewPotionId, setBrewPotionId}) => {
  let ingredients;
  const [input, setInput] = useState("");
  if (brewPotion) {
    ingredients = brewPotion.ingredients;
    if (brewPotion.brewingStatus === "REPLICA" || brewPotion.brewingStatus === "DISCOVERY") {
      setBrewPotion(null)
      setBrewPotionId(0)
    }
  }

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

  const stopBrewing = (event) => {
    setBrewPotionId(0);
    setBrewPotion(null);
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
      <h4>Brewing Section</h4>
      <div className="potion">
        {brewPotionId === 0 ?
            <PotionForm potions={potions} setPotions={setPotions} students={students} />
            :
            <div >
              <form onSubmit={handleSubmit}>
                <label>Enter new Ingredient for Potion {brewPotionId}:
                  <input
                    type="text"
                    name="ingredient"
                    value={input}
                    onChange={handleChange}
                  />
                </label>
                  <input type="submit" />
              </form>
              <div>
              <button onClick={stopBrewing}>Stop brewing</button>
              </div>
            </div>
        }
      </div>
      {!ingredients ? " " : <Ingredients ingredients={ingredients} />}
      {ingredients && ingredients.length > 0 ? <BrewingHelp potionId={brewPotionId} /> : ""}
    </div>
  )
}

export default BrewingForm
