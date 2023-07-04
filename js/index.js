const img = document.querySelector('img')
const searchBtn = document.getElementById("searchButton")
const locationDiv = document.getElementById("location")
const tempDiv = document.getElementById("temp")
const cdnImg = document.getElementById("cdnImg")
const cdnDesc = document.getElementById("cdnDesc")
const windSpd = document.getElementById("windSpd")
const windDir = document.getElementById("windDir")
const feelsLike = document.getElementById("feelsLike")
const container = document.getElementById("container")


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
      const weatherDesc = searchedLocation.current.condition.text.toString()    
      setWeatherBackground(weatherDesc);
      locationDiv.innerHTML = searchedLocation.location.name +", " +searchedLocation.location.region +", " +searchedLocation.location.country
      tempDiv.innerHTML = searchedLocation.current.temp_f.toString() + "&deg;"
      cdnImg.src = "https:" + searchedLocation.current.condition.icon.toString()
      windSpd.innerHTML = searchedLocation.current.wind_mph +"/mph"
      windDir.innerHTML = searchedLocation.current.wind_dir
      feelsLike.innerHTML = searchedLocation.current.feelslike_f + "&deg;"
      cdnDesc.innerHTML = weatherDesc
    }  
    catch (error){
      alert("There was no picture returned. Error: "+error)
    }
}
function setWeatherBackground(weatherDescription) {
  const body = document.querySelector("body");
  const weatherClass = getWeatherClass(weatherDescription);
  const backgroundImage = new Image();

  backgroundImage.onload = async function() {
    body.style.backgroundImage = await `url(./images/${weatherClass}.jpg)`;
    container.style.display = "block";
  };

 backgroundImage.src = `./images/${weatherClass}.jpg`;
}

function getWeatherClass(weatherDescription) {
  const conditionMapping = {
    'Sunny': 'Sunny',
  'Clear': 'Sunny',
  'Partly cloudy': 'Cloudy',
  'Cloudy': 'Cloudy',
  'Overcast': 'Cloudy',
  'Mist': 'Cloudy',
  'Patchy rain possible': 'Rainy',
  'Patchy snow possible': 'Snowy',
  'Patchy sleet possible': 'Snowy',
  'Patchy freezing drizzle possible': 'Rainy',
  'Thundery outbreaks possible': 'Stormy',
  'Blowing snow': 'Snowy',
  'Blizzard': 'Snowy',
  'Fog': 'Cloudy',
  'Freezing fog': 'Cloudy',
  'Patchy light drizzle': 'Rainy',
  'Light drizzle': 'Rainy',
  'Freezing drizzle': 'Rainy',
  'Heavy freezing drizzle': 'Rainy',
  'Patchy light rain': 'Rainy',
  'Light rain': 'Rainy',
  'Moderate rain at times': 'Rainy',
  'Moderate rain': 'Rainy',
  'Heavy rain at times': 'Rainy',
  'Heavy rain': 'Rainy',
  'Light freezing rain': 'Rainy',
  'Moderate or heavy freezing rain': 'Rainy',
  'Light sleet': 'Snowy',
  'Moderate or heavy sleet': 'Snowy',
  'Patchy light snow': 'Snowy',
  'Light snow': 'Snowy',
  'Patchy moderate snow': 'Snowy',
  'Moderate snow': 'Snowy',
  'Patchy heavy snow': 'Snowy',
  'Heavy snow': 'Snowy',
  'Ice pellets': 'Snowy',
  'Light rain shower': 'Rainy',
  'Moderate or heavy rain shower': 'Rainy',
  'Torrential rain shower': 'Rainy',
  'Light sleet showers': 'Snowy',
  'Moderate or heavy sleet showers': 'Snowy',
  'Light snow showers': 'Snowy',
  'Moderate or heavy snow showers': 'Snowy',
  'Light showers of ice pellets': 'Snowy',
  'Moderate or heavy showers of ice pellets': 'Snowy',
  'Patchy light rain with thunder': 'Stormy',
  'Moderate or heavy rain with thunder': 'Stormy',
  'Patchy light snow with thunder': 'Stormy',
  'Moderate or heavy snow with thunder': 'Stormy',
  };

  return conditionMapping[weatherDescription] || '';
}


  searchLocation()