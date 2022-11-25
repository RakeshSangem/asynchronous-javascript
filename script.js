'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// const request = new XMLHttpRequest();

// request.open('GET', 'https://restcountries.com/v3.1/name/peru');
// request.send();
// // console.log(this.responseText);

// request.addEventListener('load', function () {
//   const [data] = JSON.parse(this.responseText);
//   // console.log(data);
//   const { languages, ...realHero } = data.languages;
//   console.log(realHero);
// const html = `
//   <article class="country">
//     <img class="country__img" src="${data.flags.png}" />
//     <div class="country__data">
//       <h3 class="country__name">${data.name.common}</h3>
//       <h4 class="country__region">${data.region}</h4>
//       <p class="country__row"><span>👫</span>${(
//         +data.population / 1000000
//       ).toFixed(1)} people</p>
//       <p class="country__row"><span>🗣️</span>${2}</p>
//       <p class="country__row"><span>💰</span>${212}</p>
//     </div>
//   </article>
// `;
// countriesContainer.insertAdjacentHTML('beforeend', html);
// countriesContainer.style.opacity = 1;
// });

// const request = fetch('https://restcountries.com/v3.1/name/portugal');
// console.log(request);

function renderCountry(data, className = '') {
  console.log(data);
  const html = `
   <article class="country ${className}">
     <img class="country__img" src="${data.flags.png}" />
     <div class="country__data">
       <h3 class="country__name">${data.name.common}</h3>
       <h4 class="country__region">${data.region}</h4>
       <p class="country__row"><span>👫</span>${(
         +data.population / 1000000
       ).toFixed(1)} B people</p>
       <p class="country__row"><span>🗣️</span>${
         Object.values(data.languages)[0]
       }</p>
       <p class="country__row"><span>💰</span>${Object.keys(
         data.currencies
       )}</p>
     </div>
   </article>
 `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
}

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errMsg = ' Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errMsg} (${response.status})`);

    return response.json();
  });
};

// const getCountry = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       console.log(response);
//       if (!response.ok)
//         throw new Error(`coudn't found the country(${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       // const neighbour = data[0].borders[0];

//       const neighbour = 'djfssdftg';

//       console.log(neighbour);
//       if (!neighbour) return;
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`coudn't found the country(${res.status})`);
//       return res.json();
//     })
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       console.log(`${err} 💥💥💥`);
//       renderError(`Something went wrong! ${err.messaage}. Try again`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', () => {
//   getCountry('portugal');
// });

// getCountry('porsdftugal');

const getCountry = function (country) {
  getJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    'country not found!)'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      // const neighbour = 'djfssdftg';

      if (!neighbour) throw new Error('No neighbour found!');

      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'country not found'
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.log(`${err} 💥💥💥`);
      renderError(`Something went wrong💥💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', () => {
  getCountry('portugal');
});

// getCountry('australia');

// Promise

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You win🎉');
    } else {
      reject(new Error('You lost your money'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));

//Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
