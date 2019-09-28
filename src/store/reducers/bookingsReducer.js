import get from 'lodash.get';
import { SET_BOOKINGS, SET_GROUPED_BOOKINGS, SET_BOOKINGS_FAILED } from '../actionTypes';

const INITIAL_STATE = {
  bookings: [],
  groupedBookings: []
};

const bookingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_BOOKINGS:
      return {
        ...INITIAL_STATE,
        bookings: get(action, 'bookings.data', [])
      };

    case SET_GROUPED_BOOKINGS:
      return {
        ...INITIAL_STATE,
        groupedBookings: get(action, 'groupedBookings', [])
      };

    default:
      return state;
  }
};

export default bookingsReducer;
