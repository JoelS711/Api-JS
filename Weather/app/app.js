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
  'https://geocoding-by-api-ninjas.p.rapidapi.com/v1/geocoding?city=Seattle';

  
const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '14485be47bmshc38698980650761p152eb5jsna39813b74d23',
      'X-RapidAPI-Host': 'geocoding-by-api-ninjas.p.rapidapi.com'
    }
  };


const search = async (city) => {
  try {
    const response = await fetch(urlCity, options);
    const result = await response.json();
    const lat = result[0].latitude.toFixed(2);
    const lon = result[0].longitude.toFixed(2);
    console.log(`lat: ${lat}, lon: ${lon}`);
    console.log(result);
    const urlApi =
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=1089dcb39c721ba93dc3887a24ad9903`;
    const resApi = await fetch(urlApi);
    const resulApi = await resApi.json();
    console.log(resulApi);



  } catch (error) {
    console.error(error);
  }
};

search();
