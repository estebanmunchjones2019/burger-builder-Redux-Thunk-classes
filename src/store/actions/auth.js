import axios from '../../axios-auth';

import * as actionTypes from './actionTypes';

const API_KEY = 'AIzaSyA_p-OU93SSP8qTBlxi6NJVIrBwK9F5nTA';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            authData: authData
        }
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        payload: {
            error: error
        }
    }
}

export const auth = (email, password, isLogin) => {
    console.log('got', email, password);
    return dispatch => {
        dispatch(authStart());
        let url = `accounts:signInWithPassword?key=${API_KEY}`;
        if (!isLogin) {
            url = `accounts:signUp?key=${API_KEY}`
        }
        axios.post(url, 
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
        .then(res => {
            console.log('success response',res);
            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', res.data.localId)
            dispatch(authSuccess(res.data));
            dispatch(checkAuthTimeOut(res.data.expiresIn));
        })
        .catch(error => {
            console.log('error respose', error.response);
            dispatch(authFail(error.response));
        }) 
    }
}

export const checkAuthTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        payload: {
            authRedirectPath: path
        }
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate > new Date()) {
                const userId = localStorage.getItem('userId');
                const authData = { 
                    idToken: token,
                    localId: userId
                }
                const expiresIn = (expirationDate.getTime() - new Date().getTime()) / 1000; //in seconds
                dispatch(checkAuthTimeOut(expiresIn));
                dispatch(authSuccess(authData))
            } else {
                dispatch(logout());
            }
        }
    }
}