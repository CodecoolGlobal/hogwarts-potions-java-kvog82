import Recipe from "./Recipe";

const Recipes = ({recipes}) => {
    console.log(recipes)
    return (
        <div>
            {recipes.map((recipe) => (
                <Recipe key={recipe.id} recipe={recipe} />
            ))}
        </div>
    )
}

export default Recipes
