import { useState } from "react"
import Potions from "./Potions"

const RecipeContainer = ({recipe}) => {
  console.log("got recipe")
  if (!recipe) {
    return (
      <div>
        Recipe Container
      </div>
    )
  }

  return (
    <div>
      {recipe.name}
    </div>
  )
}

export default RecipeContainer
