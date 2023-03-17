import Ingredients from "../Ingredients";

const Recipe = ({recipe}) => {
  return (
    <div>
      <span className="potion-headline">Recipe {recipe.name} by {recipe.brewer.name}</span>  <br></br>
      <Ingredients ingredients={recipe.ingredients} />
    </div>
  )
}

export default Recipe
