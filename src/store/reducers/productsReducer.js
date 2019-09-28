import get from 'lodash.get';
import { SET_PRODUCTS, SET_BOOKINGS_FAILED } from '../actionTypes';

const INITIAL_STATE = {
  products: []
};

const productsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...INITIAL_STATE,
        products: get(action, 'products.data', [])
      };

    default:
      return state;
  }
};

export default productsReducer;
