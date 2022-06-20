import { GET_NUMBER_CART, ADD_CART, DECREASE_QUANTITY, INCREASE_QUANTITY, DELETE_CART } from '../actions/action';

const initState = {
    numberCart: 0,
    Carts: [],
    products: []
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT':
            let product = action.payload
            return {
                ...state, products: product
            }
        case GET_NUMBER_CART:
            return {
                ...state
            }
        case ADD_CART:
            if (state.numberCart === 0) {
                state.Carts.push(action.payload)
            }
            else {
                state.Carts.push(action.payload)
            }
            return {
                ...state,
                Carts: [...state.Carts],
                numberCart: state.numberCart + 1
            }
        default:
            return state
    }
}

export default rootReducer;