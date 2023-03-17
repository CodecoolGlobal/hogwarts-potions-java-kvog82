import React, {useState} from "react";
import {ADD_INGREDIENT_URL, GET_POTION_HELP_URL} from "../constants/urls";
import Recipes from "./Recipes";

const BrewingHelp = ({potionId}) => {
    const [recipes, setRecipes] = useState([]);

    const handleClick = async (event) => {
        event.preventDefault();
        let fetchedRecipes = await getRecipes();

        setRecipes(fetchedRecipes);
    }
    const getRecipes = async () => {
        const url = GET_POTION_HELP_URL.replace("${potionId}", potionId);

        const response = await fetch(url)
        const data = await response.json()
        return data
    }

    return (
        <div className="potion">
            <button value={potionId} onClick={handleClick}>Get help</button><br></br>
            {recipes.length === 0 ? "No recipes with the same ingredients." : <Recipes recipes={recipes} />}
        </div>
    )
}

export default BrewingHelp
