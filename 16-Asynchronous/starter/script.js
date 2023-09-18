'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// const getCountryData = function(country){
// const request = new XMLHttpRequest();
// request.open('GET',`https://restcountries.com/v3.1/name/${country}`)
// request.send();

// request.addEventListener('load',function () {
//     const [data] = JSON.parse(this.responseText);
//     const language = Object.values(data.languages)[0];
//     const currency = Object.values(data.currencies)[0].name;
//     console.log(data.flag);

//     const html = `
//         <article class="country">
//           <img class="country__img" src=${data.flag} />
//           <div class="country__data">
//             <h3 class="country__name">${Object.values(data.name)[0]}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed(1)}M people</p>
//             <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
//             <p class="country__row"><span>💰</span>${currency}</p>
//           </div>
//         </article>
//   `;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// })

// }

// getCountryData('zambia');
// getCountryData('egypt');

const renderCountry = function(data, className = ""){
  const html = `
        <article class="country ${className}">
          <img class="country__img" src=https://flagsapi.com/${data.cca2}/shiny/64.png />
          <div class="country__data">
            <h3 class="country__name">${Object.values(data.name)[0]}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${Object.values(data.name)[0] === 'Zimbabwe'?
            Object.values(data.languages)[7]:Object.values(data.languages)[0]}</p>
            <p class="country__row"><span>💰</span>${Object.values(data.currencies)[0].name}</p>
          </div>
        </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
}

const getJSON = (url)=>{
  return (fetch(url)
    .then((response) => {

      if(!response.ok)
        throw new Error(`country not found ${response.status}`)
      
      return response.json()
    
}))
}

const getCountryAndNeighbor = function(country){
const request = new XMLHttpRequest();
request.open('GET',`https://restcountries.com/v3.1/name/${country}`)
request.send();

//country one ajax call

request.addEventListener('load',function () {
    const [data] = JSON.parse(this.responseText);
    const language = Object.values(data.languages)[0];
    const currency = Object.values(data.currencies)[0].name;
    console.log(data.flag);
    
    //render country 1
    renderCountry(data);

    // get neighbor country (2)
    const neighbors = data.borders;

    if(!neighbors) return

    neighbors.forEach(neighbor => {
      
    
    //ajax call country 3
    const request = new XMLHttpRequest();
    request.open('GET',`https://restcountries.com/v3.1/alpha/${neighbor}`)
    request.send();

    request.addEventListener('load',function () {
    const [data] = JSON.parse(this.responseText);
    const language = Object.values(data.languages)[0];
    const currency = Object.values(data.currencies)[0].name;

    //render country 2
    renderCountry(data, 'neighbour');
  });
  })
    
})

}

// getCountryAndNeighbor('usa')

// const fetchCountry = function(country){

//   fetch(`https:restcountries.com/v3.1/name/${country}`).then((response) =>{
//     return response.json();
//   }).then((dat)=>{
//     const [data] = dat;
//     renderCountry(data)
//   })
// }

// fetchCountry('portugal')

const fetchCountryData = function(country){
  let neighbour
  let url =`https:restcountries.com/v3.1/name/${country}`;
    getJSON(url).then((data)=>{renderCountry(data[0])
    
      neighbour = data[0].borders[0];

      if(!neighbour) throw new Error("No Neighbour found");

      //country 2
      url = `https://restcountries.com/v3.1/alpha/${neighbour}`;
      return getJSON(url)
    })
    .then((data)=>{renderCountry(data[0], 'neighbour')
    
      const neighbour = data[0].borders[0];

      if(!neighbour) throw new Error("No Neighbour found");

      //country 2
      url = `https://restcountries.com/v3.1/alpha/${neighbour}`;
      return getJSON(url)
    })
    .then((data)=>renderCountry(data[0], 'neighbour'))
    .catch(err => alert(err))
    .finally(()=> {
      countriesContainer.style.opacity = 1;
    })
  
}




function whereAmI(lat,long) {
  fetch(`https://geocode.xyz/${lat},${long}?geoit=json&auth=994719422283797871829x95799`)
  .then(response => {
    console.log(response);

    if(!response.ok)
        throw new Error(`country not found ${response.status}`)
      
      return response.json()
  })
  .then(data => fetchCountryData(data.country.toLowerCase()))
  .catch(err => alert(err))
  .finally(()=> {
    countriesContainer.style.opacity = 1;
  })
  
}


// btn.addEventListener('click', ()=>{
//   whereAmI(52.508, 13.381);
// })

// console.log('Test start');
// setTimeout(()=> console.log('0 sec timer'),0);
// Promise.resolve('Resolved promise 1').then(res =>
//   console.log(res));
//   console.log('test end')

///////////////////////////////////////////////
//Building a simple promise

// const lotteryPromise = new Promise(function(resolve, reject){
//   setTimeout(function()
//   {if(Math.random() >= 0.5){
//     resolve('You won the lottery 💰');
//   }else{
//     reject(new Error('you loose 😞'))
//   }},2000)
// });

// lotteryPromise.then(res => console.log(res))
// .catch(err => console.log(err))

/////////////////////////////////////////
//Promisifying geolocation api


const getPosition = function () {
  return new Promise(function(resolve,reject){
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve,reject);
  })
};

// getPosition().then(pos => console.log(pos));
/*
function whereAmI(lat,long) {
  getPosition().then(pos => {
      const {latitude : lat, longitude: long} = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${long}?geoit=json&auth=994719422283797871829x95799`);
  
  })
  .then(response => {

    if(!response.ok)
        throw new Error(`country not found ${response.status}`)
      
      return response.json()
  })
  .then(data => fetchCountryData(data.country.toLowerCase()))
  .catch(err => alert(err))
  .finally(()=> {
    countriesContainer.style.opacity = 1;
  })
  
}

btn.addEventListener('click', whereAmI);
*/

// const imgContainer = document.querySelector('.images');

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       reject(new Error('Image not found'));
//     });
//   });
// };

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

// PART 1
// const loadNPause = async function () {
//   try {
//     // Load image 1
//     let img = await createImage('img/img-1.jpg');
//     console.log('Image 1 loaded');
//     await wait(2);
//     img.style.display = 'none';

//     // Load image 1
//     img = await createImage('img/img-2.jpg');
//     console.log('Image 2 loaded');
//     await wait(2);
//     img.style.display = 'none';
//   } catch (err) {
//     console.error(err);
//   }
// };
// loadNPause();

// // PART 2
// const loadAll = async function (imgArr) {
//   try {
//     const imgs = imgArr.map(async img => await createImage(img));
//     const imgsEl = await Promise.all(imgs);
//     console.log(imgsEl);
//     imgsEl.forEach(img => img.classList.add('parallel'));
//   } catch (err) {
//     console.error(err);
//   }
// };
// loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);

// const whereAmIAsync = async function(country){
//   const res = await fetch(`https:restcountries.com/v3.1/name/${country}`);
//   const data = await res.json();
//   renderCountry(data[0]);
// }

// btn.addEventListener('click',whereAmIAsync('south Africa'));
// console.log('FIRST');

const getThreeCountries = async function(c1,c2,c3){
  try {
    
    const [data1] = await getJSON(`https:restcountries.com/v3.1/name/${c1}`);
    const [data2] = await getJSON(`https:restcountries.com/v3.1/name/${c2}`);
    const [data3] = await getJSON(`https:restcountries.com/v3.1/name/${c3}`);
    console.log([data1.capital, data2.capital, data3.capital])
    
  } catch (error) {
    console.error(error);
  }
};

getThreeCountries('drc', 'canada', 'germany')