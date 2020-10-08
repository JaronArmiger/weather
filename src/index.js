const img = document.querySelector('#gif');
const cityForm = document.querySelector('#cityForm');
const errorDiv = document.querySelector('#errorDiv');
const cityHeader = document.querySelector('#cityHeader');
const temp = document.querySelector('#temp');
const humidity = document.querySelector('#humidity');
const wind = document.querySelector('#wind');


const showError = () => {
  errorDiv.innerHTML = 'invalid input :(';
}

const fetchWeather = async (cityName) => {
    const response = await fetch(
  	  `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.OWM_API_KEY}`,
  	  { mode: 'cors' }
  	);
  	if (response.ok) {
  	  return response.json();  
  	} else {
      showError();
  	}
}

const processWeather = (obj) => {
  console.log(obj);
  temp.innerHTML = `Temp: ${obj.main.temp}`;
  humidity.innerHTML = `humidity: ${obj.main.humidity}`;
  wind.innerHTML = `Wind Speed: ${obj.wind.speed}`;
  handleGif(obj.weather[0].description);
}

const setHeader = (input) => {
  cityHeader.innerHTML = `Weather in ${input}`;
}


const fetchGif = async (string) => {
  const res = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=${process.env.GIPHY_API_KEY}&s=${string}`,
  	{ mode: 'cors' }
  	);
  const gifData = await res.json();
  return gifData;
}

const renderGif = (gifData, el) => {
  el.src = gifData.data.images.original.url;
}

const handleGif = async (string) => {
  const gifData = await fetchGif(string);
  renderGif(gifData, img);
}


cityForm.addEventListener('submit', async (e) => {
   e.preventDefault();
   const cityName = e.target.cityName.value;
   const weatherData = await fetchWeather(cityName);
   setHeader(cityName);
   processWeather(weatherData);
});