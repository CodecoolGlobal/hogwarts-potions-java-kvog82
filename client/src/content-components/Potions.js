import RecipeContainer from "./BrewingForm";
import React from "react";
import { useState } from "react";
import {ADD_INGREDIENT_URL, POTIONS_URL} from "../constants/urls";

const Potions = ({ potions, setPotions, students, brewPotion, setBrewPotion, brewPotionId, setBrewPotionId }) => {

  const handleNewPotionClick = async (event) => {
    event.preventDefault();
    let inputPotion = await createPotion(event.target.value);
    setBrewPotionId(inputPotion.id)
    setBrewPotion(inputPotion)
    setPotions([...potions, inputPotion]);
    setInputs({});
  }

  const handleUpdatePotionClick = (event) => {
    event.preventDefault();
    setBrewPotionId(event.target.value)
    let existingPotion = potions.find(x => x.id === event.target.value)
    setBrewPotion([...brewPotion, existingPotion])
  }
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const createPotion = async (studentId) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentId)
    };
    const response = await fetch(POTIONS_URL + "/brew", requestOptions)
    const data = await response.json()

    return data
  }


  return (
    <>
      <div>
       Start brewing a new potion.
        <label>Select Student:
          <select name="studentId" id="studentId" value={inputs.studentId || ""} onChange={handleChange}>
            <option value={0}>
              Please select
            </option>
            {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
            ))}
          </select>
          <button value={inputs.studentId} onClick={handleNewPotionClick}>Start Brewing</button>
        </label>

      </div>

      {potions.map((potion) => (
        <div className="potion" key={potion.id}>
          <span className="potion-headline">
          {potion.id} | {(potion.name ? potion.name : "No name yet (not finished) ")}
            {(potion.name ? " " : <button value={potion.id} onClick={handleUpdatePotionClick}>Continue Brewing</button>)}
            <br></br>
          </span>
          Brewed by: {potion.brewingStudent.name} |
          Status: {potion.brewingStatus} <br></br>
          Ingredients: {potion.ingredients.map((ingredient, index) => (
            <span key={ingredient.id}>
            {( index ? ', ' : '') + ingredient.name}
            </span>
          ))}
          <br></br>
          {(potion.recipe ? ('Recipe: ' + potion.recipe.name) : '')}
        </div>
      ))}
    </>
  )
}

export default Potions
