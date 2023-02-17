import { useState } from 'react';

const BrewingForm = () => {
  const baseUrl = "http://localhost:8080/potions"
  const [potion, setPotion] = useState([])
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(inputs)
    alert(inputs.potionId);
    if (inputs.potionId > 0 ) {
      getPotion();
    }
    
  }

  const getPotion = async () => {
    const potionFetched = await fetchPotion("/" + inputs.potionId + "/add")
    setPotion(potionFetched)
    console.log("fetched Potion" + potionFetched.name)
  }

  const fetchPotion = async (url) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( { "name" : inputs.ingredient} )
  };
  console.log(requestOptions)
  const response = await fetch(baseUrl + url, requestOptions)
  const data = await response.json()
  return data
  }

  return (
    <div className="box content-right">
        Brewing Section
    <form onSubmit={handleSubmit}>
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
