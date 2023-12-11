const api = {
  key: "e0a744608b295868b2b57b18324fb33f",
  base: "https://api.openweathermap.org/"
}
var body = document.body || document.getElementsByTagName('body')[0];
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.base}geo/1.0/direct?q=${query}&limit=1&appid=${api.key}`)
    .then(
      direct => {
        return direct.json()
      }).then(
        function(cityCoord){
         let lat = cityCoord[0].lat;
         let lon =cityCoord[0].lon;
          fetch(`${api.base}data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${api.key}&lang=ua`)
            .then(
              weather => {
              return weather.json();
            })
            .then(displayResults);
        }
      )
}

function displayResults (weather) {
  let city = document.querySelector('header .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].description;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
  console.log(weather.weather[0].main)
  if(weather.weather[0].main === 'Clouds'){
   

    body.style.backgroundImage = "url('img/cloudy.jpg')";
  }
  if(weather.weather[0].main === 'Rain'){
   

    body.style.backgroundImage = "url('img/rain.jpg')";
  }
  if(weather.weather[0].main === 'Clear'){
   

    body.style.backgroundImage = "url('img/clear.jpg')";
  }
  if(weather.weather[0].main === 'Snow'){
   

    body.style.backgroundImage = "url('img/snow.jpeg')";
  }
}

function dateBuilder (d) {
  let months = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];
  let days = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
