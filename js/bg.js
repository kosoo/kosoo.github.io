const access_key = "drUhyozuu717nemBTtdGWw9lRWF_5fHA-9cJ5IZtyug";
const unsplash_url = `https://api.unsplash.com/photos/random/?client_id=${access_key}&query=landscape&orientation=landscape`;

const body = document.querySelector("body");

const IMG_NUMBER = 3;

function paintImage(img) {
  const image = new Image();
  image.src = `${img}`;
  image.classList.add("bgImage");
  body.prepend(image);
}
/*
function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}
*/
function loadBackground(){  
  const bgImage = localStorage.getItem("bg");
  if (bgImage === null) {
    getBackground();
  } else {
    const parsedImage = JSON.parse(bgImage);
    const today = new Date();
    const compareDate = new Date(parsedImage.expiresOn);   
    
    //console.log(today)console.log(compareDate)

    if (today > compareDate) {
      getBackground();
    } else {
      body.style.backgroundImage = `url(${parsedImage.url})`;
    }
  }
}

function setBackground(imageUrl){  
  const bgImage = localStorage.getItem("bg");
  if (bgImage !== null) {
    localStorage.removeItem("bg");
  }
  let date = new Date();
  date.setMinutes(date.getMinutes()+60)
  const imageObject = {
    url: imageUrl,
    expiresOn: date
  };
  localStorage.setItem("bg", JSON.stringify(imageObject));
  loadBackground();
}

function getBackground() {
  fetch(unsplash_url)
    .then(response => response.json())
    .then(json => {
      const image = json;
      if (image.urls && image.urls.full) {
        const fullUrl = image.urls.full;
        //paintImage(fullUrl);
        setBackground(fullUrl);
      }else{
        getBackground()
      }      
    });
}

function initBg() {
  //const randomNumber = genRandom();
  loadBackground();
}

initBg();


/*

const UNSPLASH_API_KEY =
  "b491e86a6957b396f44f1e15e41d3d242e17aa982607f161b95defd195c7f4dd";
const UNSPLASH_URL = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_API_KEY}&query=landscape&orientation=landscape`;

const body = document.querySelector("body"),
  locationContainer = document.querySelector(".js-location span");

function loadBackground() {
  const savedImage = localStorage.getItem("bg");
  if (savedImage === null) {
    getBackground();
  } else {
    const parsedImage = JSON.parse(savedImage);
    const today = new Date();
    if (today > parsedImage.expiresOn) {
      getBackground();
    } else {
      body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)), url(${
        parsedImage.url
      })`;
      locationContainer.innerHTML = `${parsedImage.name}, ${
        parsedImage.city
      }, ${parsedImage.country}`;
    }
  }
  return;
}

function saveBackground(imageUrl, city, country, name) {
  const savedImage = localStorage.getItem("bg");
  if (savedImage !== null) {
    localStorage.removeItem("bg");
  }
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 1);
  const imageObject = {
    url: imageUrl,
    expiresOn: expirationDate,
    city,
    country,
    name
  };
  localStorage.setItem("bg", JSON.stringify(imageObject));
  loadBackground();
  return;
}

function getBackground() {
  fetch(UNSPLASH_URL)
    .then(response => response.json())
    .then(json => {
      const image = json;
      if (image.urls && image.urls.full && image.location) {
        const fullUrl = image.urls.full;
        const location = image.location;
        const city = location.city;
        const country = location.country;
        const name = location.name;
        saveBackground(fullUrl, city, country, name);
      } else {
        getBackground();
      }
    });
  return;
}

function initApp() {
  loadBackground();
  return;
}

initApp();
*/