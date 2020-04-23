import CartActionTypes from './cart.types';

const INITIAL_STATE = {
  hidden: Text,
  cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden
      };
    case CartActionTypes.ADD_ITEM:
        return {
          ...state
        };
    // case CartActionTypes.REMOVE_ITEM:
    // case CartActionTypes.CLEAR_ITEM_FROM_CART:
    // case CartActionTypes.CLEAR_CART:
    case CartActionTypes.FINISH_UPDATE_CART:
      return {
        ...state,
        cartItems: action.payload
      };

    default:
      return state;
  }
};

export default cartReducer;
