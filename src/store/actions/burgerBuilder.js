import axios from '../../axios-orders';

import * as actionTypes from './actionTypes';

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        payload: {
            ingredients: ingredients
        }
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAIL
    }
}

export const initIngredients  = () => {
        return dispatch => { 
            axios.get('https://myburger-6cf58.firebaseio.com/ingredients.json')
            .then(res => {
                dispatch(setIngredients(res.data));
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed());
            })
        }
}

export const addIngredient = (type) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload : {
            type: type
        }
    }
}

export const removeIngredient = (type) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload : {
            type: type
        }
    }
}

