import axios from 'axios';
import { USER_SERVER } from '../components/Config.js';

export const LOGIN_USER = 'LOGIN_USER';
export const REGISTER_USER = 'REGISTER_USER';
export const AUTH_USER = 'AUTH_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const ADD_TO_CART = 'ADD_TO_CART';
export const GET_CART_ITEMS = 'GET_CART_ITEMS';
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
export const ON_SUCCESS_BUY = 'ON_SUCCESS_BUY';

export function registerUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
                .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(){
    const request = axios.get(`${USER_SERVER}/auth`)
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function addToCart(id, quantity){

    let body = {
        productId : id,
        somequantity : quantity,
    }

    const request = axios.post(`${USER_SERVER}/addToCart`, body)
        .then(response => response.data);

    return {
        type : ADD_TO_CART,
        payload : request,
    }
}

export function getCartItems(cartItems, userCart) {
    const request = axios.get(`/api/product/products_by_id?id=${cartItems}&type=array`)
        .then(response => {
            userCart.forEach(cartItem => {
                response.data.forEach((productDetail, index) => {
                    if(cartItem.id === productDetail._id) {
                        response.data[index].quantity = cartItem.quantity
                    }
                })
            })

            return response.data;
        });

    return {
        type : GET_CART_ITEMS,
        payload : request
    }
}

export function removeCartItem(productId) {
    const request = axios.get(`/api/users/removeFromCart?id=${productId}`)
        .then(response => {
            response.data.cart.forEach(item => {
                response.data.productInfo.forEach((product, index) => {
                    if(item.id === product._id) {
                        response.data.productInfo[index].quantity = item.quantity
                    }
                })
            })

            return response.data;
        });

    return {
        type : REMOVE_CART_ITEM,
        payload : request,
    }
}

export function onSuccessBuy(data) {
    const request = axios.post(`/api/users/successBuy`, data)
        .then(response => 
            response.data
        )
    return {
        type : ON_SUCCESS_BUY,
        payload : request
    }
}

 
const user = (state = {}, action) => {
    switch(action.type){
        case REGISTER_USER:
            return {...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        case AUTH_USER:
            return {...state, userData: action.payload }
        case LOGOUT_USER:
            return {...state }
        case ADD_TO_CART:
            return {...state, userData : {
                ...state.userData,
                cart : action.payload
            }}
        case GET_CART_ITEMS:
            return {...state, cartDetail : action.payload }
        case REMOVE_CART_ITEM:
            return {
                ...state, 
                cartDetail : action.payload.productInfo,
                userData : {
                    ...state.userData,
                    cart : action.payload.cart
                }
            }
        case ON_SUCCESS_BUY:
            return {
                ...state,
                cartDetail : action.payload.cartDetail,
                userData : {
                    ...state.userData,
                    cart : action.payload.cart
                }
            }
        default:
            return state;
    }
}

export default user;