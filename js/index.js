const img = document.querySelector('img')
const searchBtn = document.getElementById("searchButton")
const locationDiv = document.getElementById("location")
const tempDiv = document.getElementById("temp")
const cdnImg = document.getElementById("cdnImg")
const cdnDesc = document.getElementById("cdnDesc")


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
      locationDiv.innerHTML = searchedLocation.location.name.toString()
      tempDiv.innerHTML = searchedLocation.current.temp_f.toString() + "&deg;"
      //console.log(searchedLocation.current.condition.icon)
      cdnImg.src = "https:" + searchedLocation.current.condition.icon.toString()
      //const imgURL = "https:" + searchedLocation.current.condition.icon.toString()
      //cdnImg.src = imgURL;
      cdnImg.onload = async function() {
      cdnDesc.innerHTML = await searchedLocation.current.condition.text.toString();
    };
  }  
  catch (error){
    alert("There was no picture returned. Error: "+error)
  }
}
  searchLocation()