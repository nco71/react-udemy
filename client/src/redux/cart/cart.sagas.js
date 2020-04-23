import { all, call, takeLatest, put, select } from 'redux-saga/effects';
import {selectCartItems} from '../cart/cart.selectors';
import {selectCurrentUser} from '../user/user.selectors';

import UserActionTypes from '../user/user.types';
import CartActionTypes from '../cart/cart.types';
import { 
  finishUpdateCart
 } from './cart.actions';
 import { updateCartItem } from '../cart/cart.utils';
 import { updateCartItemsDocument } from '../../firebase/firebase.utils';


export function* clearCartOnSignOut() {
   yield startUpdateSync([]);
}

export function* onAddItem() {
  yield takeLatest(CartActionTypes.ADD_ITEM,startAddItem)
}

export function* onRemoveItem() {
  yield takeLatest(CartActionTypes.REMOVE_ITEM,startRemoveItem)
}

export function* onClearItemFromCart() {
  yield takeLatest(CartActionTypes.CLEAR_ITEM_FROM_CART,startClearItemCart)
}

export function* onSignInSuccessSyncCart() {
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS,startSyncCart)
}

export function* startSyncCart({payload: user}){
  console.log(user.cart)
  yield put(finishUpdateCart(user.cart))
}

export function* startAddItem( {payload: item} ){
  let cartItems = yield select(selectCartItems);
  let updatedCartItems = updateCartItem(cartItems,item,1);
   yield startUpdateSync(updatedCartItems);
  }

export function* startRemoveItem( {payload: item} ){
  let cartItems = yield select(selectCartItems);
  let updatedCartItems = updateCartItem(cartItems,item,-1);
   yield startUpdateSync(updatedCartItems);
  }

export function* startClearItemCart( {payload: item} ){
  let cartItems = yield select(selectCartItems);
  let updatedCartItems = updateCartItem(cartItems,item, -item.quantity);
   yield startUpdateSync(updatedCartItems);
  }

export function* startUpdateSync(updatedCart) {
  let currentUser = yield select(selectCurrentUser)
  if (currentUser) {
    try {
      yield updateCartItemsDocument(currentUser.id, updatedCart)
      yield put(finishUpdateCart(updatedCart))
    } catch (error) {
      console.log(error)
    }
  }
  else {
    yield put(finishUpdateCart(updatedCart))
  }
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut)
}

export function* cartSagas() {
  yield all([
    call(onSignOutSuccess),
    call(onSignInSuccessSyncCart),
    call(onRemoveItem),
    call(onAddItem),
    call(onClearItemFromCart)
    ]);
}