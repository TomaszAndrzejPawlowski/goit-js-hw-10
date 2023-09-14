import { fetchBreeds, fetchCatByBreed } from './cat-api';
// import SlimSelect from 'slim-select';
import Notiflix, { Notify } from 'notiflix';
import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_mkuMlJP9LBmkoRnjHtQH8p26XSUgTGsoO6qrSlitn7hlHbp0ZRqd8QRFn7m12sDX';

const selectOptions = document.querySelector('.breed-select');
const errorMsg = document.querySelector('.error');

// new SlimSelect({
//   select: selectOptions,
//   data: [
//     {
//       label: 'Label 1',
//       options: [
//         { text: 'Option 1', value: '1' },
//         { text: 'Option 2', value: '2' },
//         { text: 'Option 3', value: '3' },
//       ],
//     },
//   ],
// });

selectOptions.addEventListener('change', fetchCatByBreed);

fetchBreeds();
// Notify.failure(errorMsg.textContent);
