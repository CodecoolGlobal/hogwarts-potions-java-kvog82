import React, {useState} from "react";
import {ADD_INGREDIENT_URL, GET_POTION_HELP_URL} from "../constants/urls";
import Recipes from "./Recipes";

const BrewingHelp = ({potionId}) => {
    const [recipes, setRecipes] = useState([]);
    const [noSuccess, setNoSuccess] = useState(false);

    const handleClick = async (event) => {
        event.preventDefault();
        let fetchedRecipes = await getRecipes();
        if (fetchedRecipes.length === 0) {
            setNoSuccess(true);
        }
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
            {noSuccess ? "There are no recipes with the same ingredients." : ""}
            {recipes.length === 0 ? "" : <Recipes recipes={recipes} />}
        </div>
    )
}

export default BrewingHelp
