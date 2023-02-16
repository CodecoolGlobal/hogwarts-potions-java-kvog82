import RecipeContainer from "./RecipeContainer";
import React from "react";
import { useState } from "react";

const Potions = ({ potions }) => {
    const [hasRender, setRender] = useState(false);
    const onShow = React.useCallback(() => setRender(true), []);


    
    if (potions.length === 1) {
        const ingredients = potions[0].ingredients
        return (
            <div className="potion">
              {potions[0].id} | {potions[0].name} <br></br> 
              Brewed by: {potions[0].brewingStudent.name} | 
              Status: {potions[0].brewingStatus} |
              Ingredients: {ingredients.map((ingredient, index) => (
                <span key= {ingredient.id}>
                {( index ? ', ' : '') + ingredient.name}
                </span>
              ))}
              <span className="recipe-link">
              <button onClick={onShow}>Show Recipe `{'>>'}`</button>
                {hasRender && <RecipeContainer recipe={potions[0].recipe} />}
              </span>
            </div>
        )
    } 


  return (
    <>
      {potions.map((potion) => (
        console.log(potion.name)
      ))}
    </>
  )
}

export default Potions
