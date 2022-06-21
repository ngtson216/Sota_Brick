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
            Object.assign(action.payload, { quantity: action.quantity, maxQ: action.maxQ })
            if (state.numberCart === 0) {
                state.Carts.push(action.payload);
                state.numberCart++
                alert('Add to cart successfully')
            }
            else {
                let check = false;
                state.Carts.map((item, key) => {
                    if (item._id === action.payload._id) {
                        if ((item.quantity + action.payload.quantity) <= action.maxQ) {
                            state.Carts[key].quantity = item.quantity + action.payload.quantity;
                            state.Carts[key].maxQ = action.payload.maxQ;
                            alert('Add to cart successfully')
                        }
                        else {
                            alert('The product quantity is out of stock')
                        }
                        check = true;
                    }
                });
                if (!check) {
                    state.Carts.push(action.payload);
                    state.numberCart++
                    alert('Add to cart successfully')
                }
            }
            return {
                ...state,
                Carts: [...state.Carts],
                numberCart: state.numberCart
            }
        case INCREASE_QUANTITY:
            if (state.Carts[action.payload].quantity < state.Carts[action.payload].maxQ) {
                state.Carts[action.payload].quantity++
            }
            else alert('Reach the maximum number of products')
            return {
                ...state,
                Carts: [...state.Carts],
            }
        case DECREASE_QUANTITY:
            if (state.Carts[action.payload].quantity > 0)
                state.Carts[action.payload].quantity--
            return {
                ...state,
                Carts: [...state.Carts],
            }
        case DELETE_CART:
            function arrayRemove(arr, value) {
                return arr.filter(function (ele) {
                    return ele !== value;
                });
            }
            let newCart = arrayRemove(state.Carts, state.Carts[action.payload])
            state.numberCart--
            return {
                ...state,
                Carts: [...newCart],
                numberCart: state.numberCart
            }
        default:
            return state
    }
}

export default rootReducer;