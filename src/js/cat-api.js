`use strict`;
import Notiflix, { Notify } from 'notiflix';
import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_mkuMlJP9LBmkoRnjHtQH8p26XSUgTGsoO6qrSlitn7hlHbp0ZRqd8QRFn7m12sDX';

const errorMsg = document.querySelector('.error');

export const fetchBreeds = () => {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      return response.data;
    })
    .catch(error => Notify.failure(errorMsg.textContent));
};

export const fetchCatByBreed = breedId => {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      return response.data;
    })
    .catch(error => Notify.failure(errorMsg.textContent));
};
