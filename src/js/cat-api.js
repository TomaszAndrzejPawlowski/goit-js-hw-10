`use strict`;
import Notiflix, { Notify } from 'notiflix';
import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_mkuMlJP9LBmkoRnjHtQH8p26XSUgTGsoO6qrSlitn7hlHbp0ZRqd8QRFn7m12sDX';
import SlimSelect from 'slim-select';

const selectOptions = document.querySelector('.breed-select');
const errorMsg = document.querySelector('.error');
const catInfoDiv = document.querySelector('.cat-info');
const loadingTxt = document.querySelector('.loader');

const loadingScreen = document.createElement('div');
loadingScreen.classList.add('body-background');

export const fetchBreeds = () => {
  selectOptions.before(loadingScreen);
  loadingTxt.classList.remove('is-hidden');
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .then(breeds => {
      const markup = breeds.map(breed => {
        return `<option value="${breed.id}">${breed.name}</option>`;
      });
      selectOptions.innerHTML = markup;
      new SlimSelect({
        select: selectOptions,
        settings: catInfoDiv,
      });
      document.querySelector('.body-background').remove();
      loadingTxt.classList.add('is-hidden');
    })
    .catch(error => Notify.failure(errorMsg.textContent));
};

export const fetchCatByBreed = breedId => {
  selectOptions.before(loadingScreen);
  loadingTxt.classList.remove('is-hidden');
  if (document.querySelector('.cat-img')) {
    document.querySelector('.cat-img').remove();
  }
  const selectedOptionValue = breedId.currentTarget.value;
  return axios
    .get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${selectedOptionValue}`
    )
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .then(cat => {
      const markup = `
              <div class="cat-img"><img
              src=${cat[0].url} 
              alt="Photo of a ${cat[0].breeds[0].name} cat" 
              width= "600px"
              height= "30%"/>
              <div class="cat-desc">
              <h2>${cat[0].breeds[0].name}</h2>
              <p>${cat[0].breeds[0].description}</p>
              <p><strong>Temperament:</strong> ${cat[0].breeds[0].temperament}</p></div></div>
              `;
      document.querySelector('.body-background').remove();
      loadingTxt.classList.add('is-hidden');
      catInfoDiv.insertAdjacentHTML('afterbegin', markup);
    })
    .catch(error => Notify.failure(errorMsg.textContent));
};
