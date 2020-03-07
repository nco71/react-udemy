import React from 'react';
import { connect } from 'react-redux';

import { selectCartItemsCount } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import { createStructuredSelector } from 'reselect';


import './cart-icon.styles.scss';

const CartIcon = ({ itemCount, dispatch }) => (
  <div className='cart-icon' onClick={() => {dispatch(toggleCartHidden())}}>
    <ShoppingIcon className='shopping-icon' />
    <span className='item-count'>{itemCount}</span>
  </div>
);

const mapStateToProps = createStructuredSelector  ({
  itemCount:  selectCartItemsCount
});

export default connect(
  mapStateToProps
  )(CartIcon);
