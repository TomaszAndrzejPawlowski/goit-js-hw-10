`use strict`;
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectOptions = document.querySelector('.breed-select');

fetchBreeds();
selectOptions.addEventListener('change', fetchCatByBreed);
