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

// export function* onSignInSuccessSyncCart({payload: user}) {
//   yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS,startSyncCart(user))
// }

// export function* startSyncCart(user){
//   console.log(user);
//    yield startUpdateSync([]);
// }

export function* startAddItem( {payload: item} ){
  let cartItems = yield select(selectCartItems);
  let updatedCartItems = updateCartItem(cartItems,item,1);
  console.log(updatedCartItems);
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
    // call(onSignInSuccessSyncCart),
    call(onAddItem)
    ]);
}