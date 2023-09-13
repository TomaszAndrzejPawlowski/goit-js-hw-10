import SlimSelect from 'slim-select';
import Notiflix, { Notify } from 'notiflix';
import axios from 'axios';

axios.defaults.headers.common[
  live_mkuMlJP9LBmkoRnjHtQH8p26XSUgTGsoO6qrSlitn7hlHbp0ZRqd8QRFn7m12sDX
] = 'your key';

const selectOptions = document.querySelector('.breed-select');
const errorMsg = document.querySelector('.error');

new SlimSelect({
  select: selectOptions,
  data: [{ text: 'value1' }, { text: 'value2' }, { text: 'value3' }],
});

Notify.failure(errorMsg.textContent);
