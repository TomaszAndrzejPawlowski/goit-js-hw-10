`use strict`;
import Notiflix, { Notify } from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';

const selectOptions = document.querySelector('.breed-select');
const loadingTxt = document.querySelector('.loader');
const catInfoDiv = document.querySelector('.cat-info');
const errorMsg = document.querySelector('.error');

const loadingScreen = document.createElement('div');
loadingScreen.classList.add('body-background');

const loadApp = () => {
  selectOptions.before(loadingScreen);
  loadingTxt.classList.remove('is-hidden');
  fetchBreeds()
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

const showChosenCat = event => {
  selectOptions.before(loadingScreen);
  loadingTxt.classList.remove('is-hidden');
  if (document.querySelector('.cat-img')) {
    document.querySelector('.cat-img').remove();
  }
  const selectedOptionValue = event.currentTarget.value;
  fetchCatByBreed(selectedOptionValue)
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

loadApp();

selectOptions.addEventListener('change', showChosenCat);
