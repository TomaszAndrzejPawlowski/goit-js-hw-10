import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectOptions = document.querySelector('.breed-select');

// const loadingText = document.querySelector('.loader');
// const body = document.querySelector('body');
// const loadingScreen = () => {
//   window.onload = () => {
//     if (!body.classList.contains('.body-background')) {
//       body.classList.add('.body-background');
//       loadingText.classList.remove('.is-hidden');
//       selectOptions.classList.add('.is-hidden');
//     }

//     if (body.classList.contains('.body-background')) {
//       body.classList.remove('.body-background');
//       loadingText.classList.add('.is-hidden');
//       selectOptions.classList.remove('.is-hidden');
//     }

//   };
// };
// loadingScreen();

fetchBreeds();
selectOptions.addEventListener('change', fetchCatByBreed);
