import CartActionTypes from './cart.types';

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export const addItem = item => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item
});

export const removeItem = item => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item
});

export const clearItemFromCart = item => ({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item
});

export const finishUpdateCart = item => ({
  type: CartActionTypes.FINISH_UPDATE_CART,
  payload: item
});

export const clearCart = item => ({
  type: CartActionTypes.CLEAR_CART,
  payload: item
});