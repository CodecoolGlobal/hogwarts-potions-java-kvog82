import React from "react";
import { useState } from "react";
import {POTIONS_URL} from "../../../constants/urls";
import Ingredients from "../Ingredients";
import FilterPotions from "./FilterPotions";

const
    Potions = ({ potions, setPotions, students, setBrewPotion, setBrewPotionId }) => {
  const [inputs, setInputs] = useState({});
  const handleNewPotionClick = async (event) => {
    event.preventDefault();
    if (event.target.value === "") {
      alert("Please select a student!")
    } else {
      let inputPotion = await createPotion(event.target.value);
      setBrewPotionId(inputPotion.id)
      setBrewPotion(inputPotion)
      setPotions([...potions, inputPotion]);
      setInputs({});
    }
  }

  const handleUpdatePotionClick = (event) => {
    event.preventDefault();
    setBrewPotionId(event.target.value)
    let existingPotion = potions.find(x => x.id === event.target.value)
    setBrewPotionId(event.target.value)
    setBrewPotion(existingPotion)
  }

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
      <FilterPotions students={students} inputs={inputs} setInputs={setInputs} setPotions={setPotions} />
      <div className="potion">
       Start brewing a new potion.
        <label>Select Student:
          <select name="studentId" id="studentId" value={inputs.studentId || ""} onChange={handleChange}>
            <option value="">Select student</option>
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
            {(potion.brewingStatus === "DISCOVERY" ? <span> (Discovery &#x1F9D9;) </span> : "")}
            {(potion.brewingStatus === "REPLICA" ? " (Replica)" : "")}
            <br></br>
          </span>
          Brewed by: {potion.brewingStudent.name} <br></br>
          {(potion.recipe ? ('Recipe: ' + potion.recipe.name) : '')}
          <Ingredients ingredients={potion.ingredients} />
        </div>
      ))}
    </>
  )
}

export default Potions
