const img = document.querySelector('img')
const searchBtn = document.getElementById("searchButton")
const locationDiv = document.getElementById("location")
const tempDiv = document.getElementById("temp")
const cdnImg = document.getElementById("cdnImg")
const cdnDesc = document.getElementById("cdnDesc")
const windSpd = document.getElementById("windSpd")
const windDir = document.getElementById("windDir")
const feelsLike = document.getElementById("feelsLike")


searchBtn.addEventListener("click", function(event) {  
  const userInput = document.getElementById("userInput").value
  
  searchLocation(userInput)
});

async function searchLocation(userInput) {
    
    try{
      if(userInput === undefined){
          userInput = "new york";
        }
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=887a9b8447e44be98b4224831232506&q=${userInput}`, {mode: 'cors'});
      const searchedLocation = await response.json()
      locationDiv.innerHTML = searchedLocation.location.name +", " +searchedLocation.location.region +", " +searchedLocation.location.country
      tempDiv.innerHTML = searchedLocation.current.temp_f.toString() + "&deg;"
      cdnImg.src = "https:" + searchedLocation.current.condition.icon.toString()
      windSpd.innerHTML = searchedLocation.current.wind_mph +"/mph"
      windDir.innerHTML = searchedLocation.current.wind_dir
      feelsLike.innerHTML = searchedLocation.current.feelslike_f + "&deg;"
      cdnImg.onload = async function() {
      const weatherDesc = await searchedLocation.current.condition.text.toString() 
      cdnDesc.innerHTML = weatherDesc
      setWeatherBackground(weatherDesc);
    };
  }  
  catch (error){
    alert("There was no picture returned. Error: "+error)
  }
}
function setWeatherBackground(weatherDescription) {
  const body = document.querySelector('body');
  const weatherClass = getWeatherClass(weatherDescription);

  body.className = weatherClass;
}

function getWeatherClass(weatherDescription) {
  const conditionMapping = {
    'Sunny': 'weather-sunny',
  'Clear': 'weather-sunny',
  'Partly cloudy': 'weather-cloudy',
  'Cloudy': 'weather-cloudy',
  'Overcast': 'weather-cloudy',
  'Mist': 'weather-cloudy',
  'Patchy rain possible': 'weather-rainy',
  'Patchy snow possible': 'weather-snowy',
  'Patchy sleet possible': 'weather-snowy',
  'Patchy freezing drizzle possible': 'weather-rainy',
  'Thundery outbreaks possible': 'weather-stormy',
  'Blowing snow': 'weather-snowy',
  'Blizzard': 'weather-snowy',
  'Fog': 'weather-cloudy',
  'Freezing fog': 'weather-cloudy',
  'Patchy light drizzle': 'weather-rainy',
  'Light drizzle': 'weather-rainy',
  'Freezing drizzle': 'weather-rainy',
  'Heavy freezing drizzle': 'weather-rainy',
  'Patchy light rain': 'weather-rainy',
  'Light rain': 'weather-rainy',
  'Moderate rain at times': 'weather-rainy',
  'Moderate rain': 'weather-rainy',
  'Heavy rain at times': 'weather-rainy',
  'Heavy rain': 'weather-rainy',
  'Light freezing rain': 'weather-rainy',
  'Moderate or heavy freezing rain': 'weather-rainy',
  'Light sleet': 'weather-snowy',
  'Moderate or heavy sleet': 'weather-snowy',
  'Patchy light snow': 'weather-snowy',
  'Light snow': 'weather-snowy',
  'Patchy moderate snow': 'weather-snowy',
  'Moderate snow': 'weather-snowy',
  'Patchy heavy snow': 'weather-snowy',
  'Heavy snow': 'weather-snowy',
  'Ice pellets': 'weather-snowy',
  'Light rain shower': 'weather-rainy',
  'Moderate or heavy rain shower': 'weather-rainy',
  'Torrential rain shower': 'weather-rainy',
  'Light sleet showers': 'weather-snowy',
  'Moderate or heavy sleet showers': 'weather-snowy',
  'Light snow showers': 'weather-snowy',
  'Moderate or heavy snow showers': 'weather-snowy',
  'Light showers of ice pellets': 'weather-snowy',
  'Moderate or heavy showers of ice pellets': 'weather-snowy',
  'Patchy light rain with thunder': 'weather-stormy',
  'Moderate or heavy rain with thunder': 'weather-stormy',
  'Patchy light snow with thunder': 'weather-stormy',
  'Moderate or heavy snow with thunder': 'weather-stormy',
  };

  return conditionMapping[weatherDescription] || '';
}
  searchLocation()