import axios from '../../axios-orders';

import * as actionTypes from './actionTypes';

export const purchaseSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_SUCCESS,
        payload: {
            order: {
                orderId: id,
                orderData: orderData
            }
        }
    }
}

export const purchaseFail = (error) => {
    return {
        type: actionTypes.PURCHASE_FAIL,
        payload: {
            error: error
        }
    }
}

export const purchaseStartLoading = () => {
    return {
        type: actionTypes.PURCHASE_START_LOADING
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const purchaseStart = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseStartLoading());
        axios.post(`/orders.json?auth=${token}`, orderData)
        .then(res => {
            dispatch(purchaseSuccess(res.data.name, orderData));
        })
        .catch(error => {
            dispatch(purchaseFail(error));
        })
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        payload: {
            orders
        }
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        payload: {
            error: error //error is passed as payload but is not used in the end
        }
    }
}

export const fetchOrdersStart = () => {
    return {
       type: actionTypes.FETCH_ORDERS_START 
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth='+ token + '&orderBy="userId"&equalTo="' + userId + '"' ;
        axios.get(`/orders.json${queryParams}`)
        .then(res => {
            const fetchedOrders = [];
            for (let key in res.data){ 
                fetchedOrders.push({
                    ...res.data[key], 
                    id: res.data[key].name
                })
            }
            dispatch(fetchOrdersSuccess(fetchedOrders))
        })
        .catch(error => {
            dispatch(fetchOrdersFail(error))
        })
    }
}


