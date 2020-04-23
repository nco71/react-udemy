export const updateCartItem = (cartItems, cartItemToUpdate, quantity) => {

 console.log("updating cart items");
 console.log(cartItems,cartItemToUpdate,quantity);
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToUpdate.id
  );

  if (existingCartItem) {
    if (existingCartItem.quantity === - quantity) {
      return cartItems.filter(cartItem=>
        cartItem.id !== existingCartItem.id)
    }
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToUpdate.id
        ? { ...cartItem, quantity: cartItem.quantity + quantity }
        : cartItem
    );
  }
  return [...cartItems, { ...cartItemToUpdate, quantity: 1 }];
};