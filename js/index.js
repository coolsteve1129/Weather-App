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
    'Clear': 'weather-clear',
    'Partly cloudy': 'weather-cloudy',
    'Cloudy': 'weather-cloudy',
    'Light rain': 'weather-rainy',
    'Moderate rain': 'weather-rainy',
    'Heavy rain': 'weather-rainy',
    'Light snow': 'weather-snowy',
    'Moderate snow': 'weather-snowy',
    'Heavy snow': 'weather-snowy',
    // Include other relevant weather descriptions and corresponding weather classes
  };

  return conditionMapping[weatherDescription] || '';
}
  searchLocation()