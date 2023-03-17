import React from "react";

const Ingredients = ({ingredients}) => {
    return (
        <div className="potion">
            Ingredients: <>&nbsp;</>
            {ingredients.map((ingredient, index) => (
                <span key={ingredient.id}>
            {( index ? ', ' : '') + ingredient.name}
            </span>
            ))}
        </div>
    )
}

export default Ingredients
