import './css/styles.css';
import { fetchSearchImage } from "./fetchSearchImage";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// SimpleLightbox
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const formSearch = document.querySelector('#search-form');
const galleryList = document.querySelector('.gallery');
const btnLoad = document.querySelector('.load-more');



const lightbox = new SimpleLightbox('.gallery a', {captionsData: 'alt', captionDelay: 250});

let page = 1;
let searchQuery = '';
let perPage = 40;

formSearch.addEventListener('submit', onSearch);
btnLoad.addEventListener('click', onButtonLoadMore);

btnLoad.style.display = "none";

// Пошук в search

async function onSearch(event){ 
    event.preventDefault();

    searchQuery = event.currentTarget.searchQuery.value.trim();
    page = 1;

    if(!searchQuery) {
        galleryList.innerHTML = '';
        return;
    }

    try {

      const serchResponse = await fetchSearchImage(page, searchQuery);

      Notify.info(`Hooray! We found ${serchResponse.totalHits} images.`);

      if(serchResponse.totalHits === 0){
        Notify.warning('Sorry, there are no images matching your search query. Please try again.');
        btnLoad.style.display = "none";
      }else{
        btnLoad.style.display = "block";
      }

      createCardImg(serchResponse.hits)

      //  без try..catch

      // .then(imgSearchFeatch => {
      //   Notify.info(`Hooray! We found ${imgSearchFeatch.totalHits} images.`);
      //     if(imgSearchFeatch.totalHits === 0){
      //       Notify.warning('Sorry, there are no images matching your search query. Please try again.');
      //       btnLoad.style.display = "none";
      //     }else{
      //       btnLoad.style.display = "block";
      //     }
      //     createCardImg(imgSearchFeatch.hits);
      // })
    } catch (error) {
      console.log(error.message);
    }

    lightbox.refresh();
   
};

// при кліку загрузка ще контенту

async function onButtonLoadMore() {  
  page += 1;

  try {
    await fetchSearchImage(page, searchQuery).then(imgSearchFeatchMore => {

        let totalPages = imgSearchFeatchMore.totalHits / perPage;
        if (page >= totalPages) {
            Notify.failure("We're sorry, but you've reached the end of search results");
            btnLoad.style.display = "none";
        }

      createCardImg(imgSearchFeatchMore.hits);

      const { height: cardHeight } = galleryList.firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
      });

    })
      } catch (error) {
        console.log(error); 
      }
    
      lightbox.refresh();
}
    

  // try {
  //   const btnResponse = await fetchSearchImage(page, searchQuery);

  //   let totalPages = btnResponse.totalHits / perPage;

  //   if (page >= totalPages) {
  //       Notify.failure("We're sorry, but you've reached the end of search results");
  //       btnLoad.style.display = "none";
  //   }
    
  //   createCardImg(btnResponse.hits);

  //   const { height: cardHeight } = galleryList.firstElementChild.getBoundingClientRect();

  //   window.scrollBy({
  //     top: cardHeight * 2,
  //     behavior: "smooth",
  //   });

    // без try..catch
    // .then(imgSearchFeatchMore => {
    //   createCardImg(imgSearchFeatchMore.hits);
    //   let totalPages = imgSearchFeatchMore.totalHits / perPage;
    //   if (page >= totalPages) {
    //       Notify.failure("We're sorry, but you've reached the end of search results");
    //       btnLoad.style.display = "none";
    //   }
  
    // })
    
 

// функція скрол
// function onScroll() {
  
// }



// функція яка робить вертку картинки 
export function createCardImg(imgArr) {
  galleryList.innerHTML = imgArr.map(img => 
  `<div class="photo-card">
      <div class="info">
      <a href="${img.largeImageURL}" alt="${img.tags}" >
        <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" class="photo-img" />
      </a>
      <div class="info-flex">
        <p class="info-item">
          <b>Likes: ${img.likes}</b>
        </p>
        <p class="info-item">
          <b>Views: ${img.views}</b>
        </p>
        <p class="info-item">
          <b>Comments: ${img.comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads: ${img.downloads}</b>
        </p>
      </div>
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