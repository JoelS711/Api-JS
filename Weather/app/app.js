/*const url =
  "https://yahoo-weather5.p.rapidapi.com/weather?location=bogota&format=json&u=c";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "14485be47bmshc38698980650761p152eb5jsna39813b74d23",
    "X-RapidAPI-Host": "yahoo-weather5.p.rapidapi.com",
  },
};

const search = async (city) => {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

search();*/
const searchCity = document.getElementById("searchCity");
const icon = document.getElementById("icon")
const title = document.getElementById("title")
const temp = document.getElementById("temp")
const maxTemp = document.getElementById("maxTemp")
const minTemp = document.getElementById("minTemp")
const climate = document.getElementById("climate")
const wind = document.getElementById("wind")
const pressure = document.getElementById("pressure")
const humidity = document.getElementById("humidity")
const rain = document.getElementById("rain")



const search = async (city) => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1089dcb39c721ba93dc3887a24ad9903&units=metric`);
    if (response.status === 404) {
      throw new Error("No se pudo encontrar la ciudad");
    }
    const result = await response.json();
    console.log(result);
    const weather = `${result.weather[0].main}`
    console.log(weather);
    function changeBackground(weather){
    const video = document.getElementById("background-video")
      switch(weather){
        case "Clouds":
        case "Clear":
          video.src = "assets/clearsky.mp4";
          break;
        case "Drizzle":
        case "Rain":
        case "Thunderstorm":
          video.src = "assets/rain.mp4";
          break;
        case "Rain":
          video.src = "assets/rain.mp4";
          break;
        case "Snow":
          video.src = "assets/snow.mp4";
          break;
        default:
          video.src = "assets/default.mp4";
      }
    }
    changeBackground(weather);

    title.innerHTML = `<h2>${result.name}`;
    icon.innerHTML = `<img src="http://openweathermap.org/img/w/${result.weather[0].icon}.png" class="icon__img" alt="Weather Icon">`;
    temp.innerHTML = `${result.main.temp.toFixed(0)}<span class="celsius">&#8451;</span>`;
    climate.innerHTML = `${result.weather[0].description}`
    maxTemp.innerHTML = `M: ${result.main.temp_max.toFixed(0)}&#8451;`;
    minTemp.innerHTML = `m: ${result.main.temp_min.toFixed(0)}&#8451;`;
    wind.innerHTML = `${result.wind.speed.toFixed(0)}ms`;
    pressure.innerHTML = `${result.main.pressure}hPa`;
    humidity.innerHTML = `${result.main.humidity}%`;
    if(result.rain && Object.keys(result.rain).length > 0){
    rain.innerHTML = `${(result.rain["1h"] * 100).toFixed(0)}%`;
    }else{
      console.log("No se encontro informacion sobre la lluvia");
    }



  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al buscar la ciudad: " + error.message);
  }
};

searchCity.addEventListener("blur", (evento) => {
  let city = evento.target.value.toLowerCase();
  search(city);
});
