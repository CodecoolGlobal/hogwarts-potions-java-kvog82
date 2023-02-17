import RecipeContainer from "./BrewingForm";
import React from "react";
import { useState } from "react";

const Potions = ({ potions }) => {
    



  return (
    <>
      {potions.map((potion) => (
        <div className="potion" key={potion.id}>
          <span className="potion-headline">
          {potion.id} | {(potion.name ? potion.name : 'No name yet (brewing)')} <br></br> 
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
