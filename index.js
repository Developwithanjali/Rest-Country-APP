'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////


//render country data 

function renderCountry(data, className){
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${+(data.population/1000000).toFixed(2)} Millions</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name} | ${data.languages[0].nativeName}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// Requesting data from web server using AJAX Call
function getCountryData(country){
const request = new XMLHttpRequest();
request.open('GET', `https://restcountries.com/v2/name/${country}`);
request.send();
// console.log(request);

request.addEventListener('load', function () {
  const [data] = JSON.parse(this.responseText);
  console.log(data);
  renderCountry(data);

  const neighbour = data.borders;

  if(!neighbour) return

  const request2 = new XMLHttpRequest();
  request2.open('GET',`https://restcountries.com/v2/alpha/${neighbour[0]}`);
  request2.send();

  // console.log(neighbour);
  request2.addEventListener('load', function(){
    const data2 = JSON.parse(this.responseText);
    console.log(data2);
    renderCountry(data2, 'neighbour');
  });
  const request3 = new XMLHttpRequest();
  request3.open('GET',`https://restcountries.com/v2/alpha/${neighbour[1]}`);
  request3.send();

  // console.log(neighbour);
  request3.addEventListener('load', function(){
    const data3 = JSON.parse(this.responseText);
    console.log(data3);
    renderCountry(data3, 'neighbour');
  });
})
};

getCountryData('bharat');
