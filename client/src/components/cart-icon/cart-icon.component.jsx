import React from 'react';
import { connect } from 'react-redux';

import { selectCartItemsCount } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import { createStructuredSelector } from 'reselect';

import {
  CartContainer,
  ShoppingIcon,
  ItemCountContainer
} from './cart-icon.styles';


const CartIcon = ({ itemCount, dispatch }) => (
  <CartContainer onClick={() => {dispatch(toggleCartHidden())}}>
    <ShoppingIcon />
    <ItemCountContainer>{itemCount}</ItemCountContainer>
  </CartContainer>
);

const mapStateToProps = createStructuredSelector  ({
  itemCount:  selectCartItemsCount
});

export default connect(
  mapStateToProps
  )(CartIcon);
