import get from 'lodash.get';
import { SET_SELLERS, SET_BOOKINGS_FAILED } from '../actionTypes';

const INITIAL_STATE = {
  sellers: []
};

const sellersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SELLERS:
      return {
        ...INITIAL_STATE,
        sellers: get(action, 'sellers.data', [])
      };

    default:
      return state;
  }
};

export default sellersReducer;
