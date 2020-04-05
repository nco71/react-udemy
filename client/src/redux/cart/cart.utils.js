import  { updateCartItemsDocument, addNewCartItemsDocument } from '../../firebase/firebase.utils'
import {selectCurrentUser} from '../user/user.selectors';

export const addItemToCart = (cartItems, cartItemToAdd ) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id ===cartItemToAdd.id
  );
  if (existingCartItem) {

  let originalCartItem = cartItems.filter(cartItem => 
    cartItem.id === cartItemToAdd.id 
  )

    let updatedCart = cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    
    if(selectCurrentUser)
     {
      try {
        updateCartItemsDocument(selectCurrentUser.id, cartItemToAdd.id, originalCartItem.quantity + 1 )
      }
      catch(error) {
        alert(error.alert)
        return cartItems;
      }
    }; 

    return updatedCart;
  }
  
  if (  selectCurrentUser )  {
    try {
    addNewCartItemsDocument(selectCurrentUser.id, cartItemToAdd.id, 1); 
    }
    catch (error) {
        alert(error.alert)
        return cartItems;
      }
  }
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map(cartItem =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};