import axios from 'axios';
import { config } from '../../config/globalConfig';
import { SET_BOOKINGS, SET_GROUPED_BOOKINGS, SET_BOOKINGS_FAILED } from '../actionTypes';
import { getProducts } from '../actions/productActions';
import { mapBookingsWithProduct } from '../mapper/bookingsMapper';
import { groupBySeller } from '../helpers/bookingsHelper';
import get from 'lodash.get';

const fetchBookings = () => {
  return axios
    .get(`${config.ROOT_URL}/bookings`)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      // TODO: log error
      return Promise.reject(err);
    });
};

export const setBookings = bookings => {
  return {
    type: SET_BOOKINGS,
    bookings
  };
};

export const setGroupedBookings = groupedBookings => {
  return {
    type: SET_GROUPED_BOOKINGS,
    groupedBookings
  };
};
export const setBookingsFailed = bookings => {
  return {
    type: SET_BOOKINGS_FAILED
  };
};

const getBookings = () => {
  return dispatch => {
    // todo: dispatch in progress action
    return fetchBookings()
      .then(data => {
        return dispatch(setBookings(data));
      })
      .catch(error => {
        return dispatch(setBookingsFailed());
      });
  };
};

export const getBookingsWithProductDetails = () => {
  return (dispatch, getState) => {
    return dispatch(getBookings())
      .then(() => dispatch(getProducts()))
      .then(() => {
        const state = getState();
        const bookings = get(state, 'bookingsData.bookings', []);
        const products = get(state, 'productsData.products', []);
        const mappedBookings = mapBookingsWithProduct({ bookings, products });
        const groupBookingsBySeller = groupBySeller(mappedBookings);
        return dispatch(setGroupedBookings(groupBookingsBySeller));
      })
      .catch(err => {
        // log error
      });
  };
};
