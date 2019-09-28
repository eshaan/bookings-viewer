import axios from 'axios';
import { config } from '../../config/globalConfig';
import { SET_PRODUCTS, SET_PRODUCTS_FAILED } from '../actionTypes';

export const fetchProducts = () => {
  return axios
    .get(`${config.ROOT_URL}/products`)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      // TODO: log error
      return Promise.reject(err);
    });
};

export const setProducts = products => {
  return {
    type: SET_PRODUCTS,
    products
  };
};
export const setProductsFailed = bookings => {
  return {
    type: SET_PRODUCTS_FAILED
  };
};

export const getProducts = () => {
  return dispatch => {
    // todo: dispatch in progress action
    return fetchProducts()
      .then(data => {
        return dispatch(setProducts(data));
      })
      .catch(error => {
        return dispatch(setProductsFailed());
      });
  };
};
