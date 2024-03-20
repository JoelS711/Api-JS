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

const apiKey = '1089dcb39c721ba93dc3887a24ad9903';
const city = 'bogota';
const urlApi =
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

 

const search = async (city) => {
  try {
    const response = await fetch(urlApi);
    const result = await response.json();
    console.log(result);



  } catch (error) {
    console.error(error);
  }
};

search();
