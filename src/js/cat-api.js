const selectOptions = document.querySelector('.breed-select');
export const fetchBreeds = () => {
  return fetch('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(breeds => {
      const markup = breeds
        .map(breed => {
          //   console.log(breed);
          return `<option value="${breed.id}">${breed.name}</option>`;
        })
        .join('');
      selectOptions.innerHTML = markup;
    });
};

export const fetchCatByBreed = breedId => {
  if (document.querySelector('div')) {
    document.querySelector('div').remove();
  }
  const selectedOptionValue = breedId.currentTarget.value;
  console.log(selectedOptionValue);
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${selectedOptionValue}`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(breed => {
      console.log(breed);
      const markup = `
             <div><img class="cat-img"
             src=${breed[0].url} 
             alt="Photo of a ${breed.url} cat" 
             width= "400px"
             height= "300px"/>
             <h2>${breed.name}</h2>
             <p>${breed.description}</p>
             <p><strong>Temperament:</strong> ${breed.temperament}</p></div>
             `;
      selectOptions.insertAdjacentHTML('afterend', markup);
    })
    .catch(error => console.log(error));
};
