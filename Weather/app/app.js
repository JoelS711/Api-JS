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

const urlCity =
  "http://api.openweathermap.org/geo/1.0/direct?q=lima&limit=1&appid=1089dcb39c721ba93dc3887a24ad9903";
const urlApi =
  "https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid=1089dcb39c721ba93dc3887a24ad9903";

const search = async (city) => {
  try {
    const response = await fetch(urlCity);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

search();
