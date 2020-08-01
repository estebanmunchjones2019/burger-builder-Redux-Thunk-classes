import React from 'react';

import classes from './Order.module.css';

const order = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }
    const ingredientSOutput = ingredients.map((ingredient) => {
    return (
        <span className={classes.span}
            key={ingredient.name}>
            {ingredient.name} ({ingredient.amount})
        </span>
    )})
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientSOutput}</p>
            <p>Price: <strong>USD {props.totalPrice.toFixed(2)}</strong></p>
        </div>
    )
}

export default order;