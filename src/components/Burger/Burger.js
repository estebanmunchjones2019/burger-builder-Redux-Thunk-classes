import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => { 
    let transformedIngredients = Object.keys(props.ingredients) //Object.keys return ['salad', 'meat',...]
        .map( igKey => {
            return [...Array(props.ingredients[igKey])] //return [null,null] if salad: 2
                .map((_ , i) => { //for every null, I return a BurgerIngredient component
                    return <BurgerIngredient key={igKey + i} type={igKey}/>
                })
        }) //returns [[<BurgerIngredient type="salad" />, <BugerIngredient type="salad" />], [<BurgerIngredient type="meat" />], ...]
        .reduce((arr, el) => {
            return arr.concat(el); //even if inner arrays are empty, length of external array is always equal to number of ingredients
        }, []); //the reduce flattens the arrays
    
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please, start adding ingredients!</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
                {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

export default burger;