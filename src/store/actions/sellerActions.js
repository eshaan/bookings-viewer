import axios from 'axios';
import { config } from '../../config/globalConfig';
import { SET_SELLERS, SET_SELLERS_FAILED } from '../actionTypes';

export const fetchSellers = () => {
  return axios
    .get(`${config.ROOT_URL}/sellers`)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      // TODO: log error
      return Promise.reject(err);
    });
};

export const setSellers = sellers => {
  return {
    type: SET_SELLERS,
    sellers
  };
};
export const setSellersFailed = bookings => {
  return {
    type: SET_SELLERS_FAILED
  };
};

export const getSellers = () => {
  return dispatch => {
    // todo: dispatch in progress action
    return fetchSellers()
      .then(data => {
        return dispatch(setSellers(data));
      })
      .catch(error => {
        return dispatch(setSellersFailed());
      });
  };
};
