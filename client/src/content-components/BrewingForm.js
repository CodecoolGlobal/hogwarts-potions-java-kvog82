import {useEffect, useState} from 'react';
import {ADD_INGREDIENT_URL} from "../constants/urls";

const BrewingForm = ({potions, setPotions, students}) => {
  const baseUrl = "http://localhost:8080/potions"
  const [potion, setPotion] = useState([])
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
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
    if (potions.some(po => po.id === inputPotion.id)) {
      const updatedPotions = potions.map((item) => item.id === inputPotion.id ? inputPotion : item);
      setPotions(updatedPotions);
    } else {
      setPotions([...potions, inputPotion]);
    }
    setInputs({});
  }

  const createPotion = async (studentId) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentId)
  };
  const response = await fetch(baseUrl + "/brew", requestOptions)
  const data = await response.json()
    setPotion(await data)
    return data
  }

  const getPotion = async () => {
    const url = ADD_INGREDIENT_URL.replace("${potionId}", inputs.potionId);
    const potionFetched = await fetchPotion(url)
    setPotion(potionFetched)
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
      </label>
      <label>Enter Potion Id:
        <input
          type="number"
          name="potionId"
          value={inputs.potionId || ""}
          onChange={handleChange}
        />
      </label>
      <label>Enter Ingredient:
        <input
          type="text"
          name="ingredient"
          value={inputs.ingredient || ""}
          onChange={handleChange}
        />
      </label>
        <input type="submit" />
    </form>

    </div>
  )


  }


export default BrewingForm
