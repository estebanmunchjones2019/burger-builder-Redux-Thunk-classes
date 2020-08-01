import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseInit = (state, action) => {
    return updateObject(state, {
        purchased: false
    })
}

const purchaseStartLoading = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

const purchaseSuccess = (state, action) => {
    const newOrder = {
        ...action.payload.order.orderData,
        id: action.payload.order.orderId
    }
    return updateObject(state, {
        orders: state.orders.concat(newOrder), //no need to store it, just for demo purposes
        loading: false,
        purchased: true
    })
}

const purchaseFail = (state, action) => {
    return updateObject(state, {
        loading: false
    })
}
const fetchOrdersStart = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.payload.orders,
        loading: false
    })
}

const fetchOrdersFail = (state, action) => {
    return updateObject(state, {
        loading: false
    })
}


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action)
        case actionTypes.PURCHASE_START_LOADING: return purchaseStartLoading(state, action)
        case actionTypes.PURCHASE_SUCCESS: return purchaseSuccess(state, action)
        case actionTypes.PURCHASE_FAIL: return purchaseFail(state, action)
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action)
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action)
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action)
        default:
            return state;
    }
}
 
export default reducer;