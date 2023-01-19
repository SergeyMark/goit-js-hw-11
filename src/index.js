import './css/styles.css';
import { fetchSearchImage } from "./fetchSearchImage";
import { Notify } from 'notiflix/build/notiflix-notify-aio';




const formSearch = document.querySelector('#search-form');
const galleryList = document.querySelector('.gallery');
const btnLoad = document.querySelector('.load-more');

let page = 1;
let perPage = 0;
let searchQuery = '';

formSearch.addEventListener('submit', onSearch);
btnLoad.addEventListener('click', onButtonLoadMore);


// Пошук в search

function onSearch(event){ 
    event.preventDefault();

    searchQuery = event.currentTarget.searchQuery.value;
    page = 1;

    if(!searchQuery) {
        galleryList.innerHTML = '';
        return;
    }

    fetchSearchImage(page, searchQuery).then(imgSearchFeatch => {

        console.log(imgSearchFeatch);

        if(imgSearchFeatch === []){
          Notify.warning('Sorry, there are no images matching your search query. Please try again.');
        };

        createCardImg(imgSearchFeatch.hits);

        btnLoad.hidden = false;

    })
};

// при кліку загрузка ще контенту

function onButtonLoadMore() {
  page += 1;
  
  btnLoad.hidden = true;

  fetchSearchImage(page, searchQuery).then(imgSearchFeatchMore => {

    perPage += imgSearchFeatchMore.hits.length;

    createCardImg(imgSearchFeatchMore.hits);

    if (perPage >= imgSearchFeatchMore.totalHits) {
      btnLoad.hidden = true;
      Notify.info("We're sorry, but you've reached the end of search results.");
    }

    btnLoad.hidden = false;

  })
}



// функція яка робить вертку картинки 
export function createCardImg(imgArr) {
  galleryList.innerHTML = imgArr.map(img => 
  `<div class="photo-card">
      <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" class="photo-img" />
      <div class="info">
        <p class="info-item">
          <b>Likes${img.likes}</b>
        </p>
        <p class="info-item">
          <b>Views${img.views}</b>
        </p>
        <p class="info-item">
          <b>Comments${img.comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads${img.downloads}</b>
        </p>
      </div>
  </div>`
  ).join('')
};




















































































































// // верстка пошуку країн
// function createCountryMarkUp(arr) {
//     countryList.innerHTML = arr.map(({flags: {svg}, name: {official}}) => 
//         `<li>
//             <img src="${svg}" alt="${official}" width="100">
//             <h2>${official}</h2>
//         </li>`
// ).join('')};

// function createCardImg(imgArr) {
//     imgRander.innerHTML = imgArr.map((img) => 
//     `<img src="${}" alt="${official}" width="50">
//     <span>${official}</span>
//     <div>
//       <span>Capital:</span>
//       <span>${capital}</span>
//     </div>
//     <div>
//       <span>Population:</span>
//       <span>${population}</span>
//     </div>
//     <div>
//       <span>Languages:</span>
//       <span>${Object.values(languages).join(', ')}</span>
//     </div>`
// ).join('')};


// функция фетч возрощяет апи стран
// function fetchCountries(name){
//     const BASE_URL = 'https://restcountries.com/v3.1/name';
//     const fields = '?fields=name,capital,population,flags,languages';

//   return fetch(`${BASE_URL}${name}${fields}`)
//     .then(response => {
//         console.log(response);
 
        
//         if (!response.ok) {
//             throw new Error(response.statusText);
//         }

//         return response.json();
//     });
// };

// fetchCountries('peru');



// функція евент по пошуку картинок та країн з завдання 10
// formSearch.addEventListener('submit', onSearch);

// function onSearch(event){ 
//     event.preventDefault();

//     let inputSearch = event.currentTarget.searchQuery.value;
    
//     if(!inputSearch) {
//         galleryList.innerHTML = '';
//         return;
//     }

//     fetchSearchImage(page, inputSearch).then(imgSearchFeatch => {
//         console.log(imgSearchFeatch);

//         createCardImg(imgSearchFeatch);

//         // if(countryFetch.length > 10){
//         //     // Notify.info();
//         //     console.log('info')
//         // }

//         // if (countryFetch.length >= 2 && countryFetch.length <= 10) {
//         //     // список країн
//         //     createCountryMarkUp(countryFetch);
//         //     countryInfo.innerHTML = '';
//         // }

//         // if (countryFetch.length === 1) {
//         //     createCountryMarUpAll(countryFetch);
//         //     countryList.innerHTML = '';
//         // }
//     }).catch(err => console.log(err));
// };






//  функція по кліку рендерить картку на екран
// <button class="btn">click</button>

// const btn = document.querySelector('.btn');

// btn.addEventListener('click', onButtonClick);


// const arr = [
//   {
//     url: './girl3.jpg',
//     title: 'Girl',
//     like: 12,
//     views: 25,
//     comment: 53,
//   },
//   {
//     url: './girl3.jpg',
//     title: 'Girl',
//     like: 110,
//     views: 252,
//     comment: 520,
//   },
//   {
//     url: './girl3.jpg',
//     title: 'Girl',
//     like: 198,
//     views: 258,
//     comment: 56,
//   },
// ]

// //  верстка однієї картки
// function createCardImg(arr) {
//     galleryList.innerHTML = arr.map((img) => {
//     `<div class="photo-card">
//     <img src="${img.url}" alt="${img.title}" loading="lazy" />
//     <div class="info">
//       <p class="info-item">
//         <b>Likes ${img.like}</b>
//       </p>
//       <p class="info-item">
//         <b>Views ${img.views}</b>
//       </p>
//       <p class="info-item">
//         <b>Comments ${img.comment}</b>
//       </p>
//       <p class="info-item">
//         <b>Downloads</b>
//       </p>
//     </div>
//   </div>`
//     }).join('')};

// function onButtonClick() {

//   createCardImg(arr);
// }