//url driver `https://api.openf1.org/v1/drivers?last_name=${`Verstappen`}`

//http://ergast.com/api/f1/constructors/{{constructorid}}

const requestOptions = {
  method: "GET",
  redirect: "follow",
};
const searchDriver = document.getElementById("searchDriver");
const driverNumber = document.getElementById("driverNumber");
const driverLastName = document.getElementById("driverLastName");
const driverName = document.getElementById("driverName");
const driverFlag = document.getElementById("driverFlag");
const codCountry = document.getElementById("codCountry");
const imgDriver = document.getElementById("imgDriver");
const driverPoints = document.getElementById("driverPoints");
const scuderia = document.getElementById("scuderia");
const imgScuderia = document.getElementById("imgScuderia");
const background = document.getElementById("background");

function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}


const search = async (nameDriver) => {
  try {
    if (nameDriver) {
      let response = await fetch(
        `https://api.openf1.org/v1/drivers?first_name=${nameDriver}`,
        requestOptions
      );
      let result = await response.json();

      if (result.length === 0) {
        response = await fetch(
          `https://api.openf1.org/v1/drivers?last_name=${nameDriver}`,
          requestOptions
        );
        result = await response.json();
      } if (result.length > 0) {
      } else {
        console.log("Piloto no encontrado");
        alert("Piloto no encontrado " + error.message);

      }

      driverNumber.innerHTML = `${result[0].driver_number}`;
      driverName.innerHTML = `${result[0].first_name}`;
      driverLastName.innerHTML = `${result[0].last_name}`;
      const countryCodeResponse = await fetch('./app/code_country.json');
      const countryCodeData = await countryCodeResponse.json();
      const country = result[0].country_code;
      const getCountryCode = (country) => countryCodeData[country];
      console.log(getCountryCode(country));
      driverFlag.src = `https://flagsapi.com/${getCountryCode(country)}/shiny/64.png`;
      codCountry.innerHTML = `${country}`;
      imgDriver.src = `assets/Drivers/${result[0].driver_number}.png`
      imgDriver.alt = `${result[0].last_name}`;
      const driverPointsResponse = await fetch('https://ergast.com/api/f1/current/driverStandings.json');
      const driverPointsData = await driverPointsResponse.json();
      const lastName = `${result[0].last_name}`;
      const getPoints = (driverPointsData, lastName) => {
        const pilot = driverPointsData?.MRData?.StandingsTable?.StandingsLists
          ?.flatMap(list => list.DriverStandings ?? [])
          .find(pilot => removeAccents(pilot.Driver.familyName) === lastName);
        return pilot.points
      }
      driverPoints.innerHTML = `${getPoints(driverPointsData, lastName)}`;
      scuderia.innerHTML = `${result[0].team_name}`;
      imgScuderia.src = `assets/Constructors/${result[0].team_name}.png`
      imgScuderia.alt = `${result[0].team_name}`;
      background.style.backgroundColor = `#${result[0].team_colour}`

    }
  } catch (error) {
    console.error(error);
    alert("Ocurrio un error al buscar el piloto " + error.message);
  }
};



searchDriver.addEventListener("blur", (evento) => {
  let nameDriver = evento.target.value.charAt(0).toUpperCase() + evento.target.value.slice(1).toLowerCase();
  console.log(nameDriver);
  search(nameDriver);
});