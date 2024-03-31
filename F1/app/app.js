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
const grid = document.getElementById("grid");
const pos = document.getElementById("pos");
const stat = document.getElementById("stat");
const points = document.getElementById("points");
const background = document.getElementById("background");
const nameGP = document.getElementById("nameGP");
const nameCircuit = document.getElementById("nameCircuit");
const imgCircuit = document.getElementById("imgCircuit");
const raceFlag = document.getElementById("raceFlag");

const today = new Date();
const year = today.getFullYear();
const formattedDate = `${today.getFullYear()}-${String(
  today.getMonth() + 1
).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

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
      }
      if (result.length > 0) {
      } else {
        console.log("Piloto no encontrado");
        alert("Piloto no encontrado " + error.message);
      }

      driverNumber.innerHTML = `${result[0].driver_number}`;
      driverName.innerHTML = `${result[0].first_name}`;
      driverLastName.innerHTML = `${result[0].last_name}`;
      const countryCodeResponse = await fetch("./app/code_country.json");
      const countryCodeData = await countryCodeResponse.json();
      const country = result[0].country_code;
      const getCountryCode = (country) => countryCodeData[country];
      driverFlag.src = `https://flagsapi.com/${getCountryCode(
        country
      )}/shiny/64.png`;
      codCountry.innerHTML = `${country}`;
      imgDriver.src = `assets/Drivers/${result[0].driver_number}.png`;
      imgDriver.alt = `${result[0].last_name}`;
      const driverPointsResponse = await fetch(
        "https://ergast.com/api/f1/current/driverStandings.json"
      );
      const driverPointsData = await driverPointsResponse.json();
      const lastName = `${result[0].last_name}`;
      const getPoints = (driverPointsData, lastName) => {
        const pilot =
          driverPointsData?.MRData?.StandingsTable?.StandingsLists?.flatMap(
            (list) => list.DriverStandings ?? []
          ).find(
            (pilot) => removeAccents(pilot.Driver.familyName) === lastName
          );
        return pilot.points;
      };
      driverPoints.innerHTML = `${getPoints(driverPointsData, lastName)}`;
      scuderia.innerHTML = `${result[0].team_name}`;
      imgScuderia.src = `assets/Constructors/${result[0].team_name}.png`;
      imgScuderia.alt = `${result[0].team_name}`;
      background.style.backgroundColor = `#${result[0].team_colour}`;
      const responseRace = await fetch(
        "https://ergast.com/api/f1/2024/last/results.json"
      );
      const dataRace = await responseRace.json();
      console.log(dataRace);
      const codDriver = result[0].driver_number;
      console.log(codDriver);
      const getDataDriver = (dataRace, codDriver) => {
        const dataDriver = dataRace?.MRData?.RaceTable?.Races;
        if (dataDriver) {
          const dataRaceResult = dataDriver
            ?.flatMap((race) => race.Results ?? []) // Obtener todos los resultados de todas las carreras en una sola matriz
            .find(
              (dataRaceResult) =>
                parseInt(dataRaceResult.number) === parseInt(codDriver)
            ); // Encontrar el resultado correspondiente al conductor especificado
          if (dataRaceResult) {
            return [
              dataRaceResult.grid,
              dataRaceResult.position,
              dataRaceResult.status,
              dataRaceResult.points,
            ];
          } else {
            return ["*", "*", "No Information", "0"];
          }
        }
        console.log(dataRaceResult);
      };
      const [gridR, posR, statusR, pointsR] = getDataDriver(
        dataRace,
        codDriver
      );
      grid.innerHTML = `${gridR}`;
      pos.innerHTML = `${posR}`;
      stat.innerHTML = `${statusR}`;
      points.innerHTML = `${pointsR}`;
    }
  } catch (error) {
    console.error(error);
    alert("Ocurrio un error al buscar el piloto " + error.message);
  }
};

const getCircuit = async () => {
  const grandPrixResponse = await fetch(
    "https://ergast.com/api/f1/current.json"
  );
  const grandPrixData = await grandPrixResponse.json();
  const races = grandPrixData.MRData.RaceTable.Races;
  let lastNameRace;
  let lastNameCircuit;
  for (let i = races.length - 1; i >= 0; i--) {
    const lastDate = new Date(races[i].date);
    if (lastDate <= new Date(formattedDate)) {
      lastNameRace = races[i].raceName;
      lastNameCircuit = races[i].Circuit.circuitName;
      nameGP.innerHTML = `${lastNameRace}`;
      nameCircuit.innerHTML = `${lastNameCircuit}`;
      const gpCodeResponse = await fetch("./app/grand_prix.json");
      const gpCodeData = await gpCodeResponse.json();
      const getCodeFlag = (lastNameRace) => gpCodeData.GrandPrix[lastNameRace];
      imgCircuit.src = `assets/Circuit/${lastNameCircuit}.jpg`;
      imgCircuit.alt = `${lastNameCircuit}`;
      raceFlag.src = `https://flagsapi.com/${getCodeFlag(
        lastNameRace
      )}/shiny/64.png`;
      break;
    }
  }
};
getCircuit();

searchDriver.addEventListener("blur", (event) => {
  let nameDriver =
    event.target.value.charAt(0).toUpperCase() +
    event.target.value.slice(1).toLowerCase();
  search(nameDriver);
});
