import Notiflix, { Notify } from 'notiflix';
import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_mkuMlJP9LBmkoRnjHtQH8p26XSUgTGsoO6qrSlitn7hlHbp0ZRqd8QRFn7m12sDX';
import SlimSelect from 'slim-select';

const selectOptions = document.querySelector('.breed-select');
const errorMsg = document.querySelector('.error');
const catInfoDiv = document.querySelector('.cat-info');

export const fetchBreeds = () => {
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
    })
    .catch(error => Notify.failure(errorMsg.textContent));
};

export const fetchCatByBreed = breedId => {
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
              width= "400px"
              height= "300px"/>
              <div class="cat-desc">
              <h2>${cat[0].breeds[0].name}</h2>
              <p>${cat[0].breeds[0].description}</p>
              <p><strong>Temperament:</strong> ${cat[0].breeds[0].temperament}</p></div></div>
              `;
      catInfoDiv.insertAdjacentHTML('afterbegin', markup);
    })
    .catch(error => Notify.failure(errorMsg.textContent));
};
