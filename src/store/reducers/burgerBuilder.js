import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const  INGREDIENTS_PRICES = { //global variables written in capitals because it's constant and outside the class
    cheese: 1,
    salad: 0.9,
    bacon: 1.1,
    meat: 2
}

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: { //no need to clone ingredients, because are set for the first time
            salad: action.payload.ingredients.salad,
            cheese: action.payload.ingredients.cheese,
            bacon: action.payload.ingredients.bacon,
            meat: action.payload.ingredients.bacon
        },
        totalPrice: 4,
        error: false,
        building: false
    })
}
const fetchIngredientsFail = (state, action) => {
    return updateObject(state, {
        error: true
    })
}
const addIngredient = (state, action) => {
    const updatedIngredients = updateObject(state.ingredients, {
        [action.payload.type]: state.ingredients[action.payload.type] + 1
    });

    return updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.payload.type],
        building: true
    })
}
const removeIngredient = (state, action) => {
    const updatedIngredients = updateObject(state.ingredients, {
        [action.payload.type]: state.ingredients[action.payload.type] - 1
    });

    return updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.payload.type],
        building: true
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {

        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAIL: return fetchIngredientsFail(state, action)
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action)
        default:
            return state;
    }
}

export default reducer;