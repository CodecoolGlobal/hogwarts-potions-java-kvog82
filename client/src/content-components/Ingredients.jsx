const Ingredients = ({ingredients}) => {
    return (
        <div>
            {ingredients.map((ingredient) => <div key={ingredient.name}>{ingredient.name}</div>)}
        </div>
    )
}

export default Ingredients
