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
const scheduleCards = document.getElementById("scheduleCards");
const scheduleGP = document.getElementById("scheduleGP");
const scheduleCircuit = document.getElementById("scheduleCircuit");
const roundRace = document.getElementById("roundRace");
const scheduleFlag = document.getElementById("scheduleFlag");
const imgScheCircuit = document.getElementById("imgScheCircuit");
const hCO = document.getElementById("hCO");
const hBR = document.getElementById("hBR");
const hMX = document.getElementById("hMX");
const hAR = document.getElementById("hAR");

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
              dataRaceResult.Constructor.name,
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
      const [scuR, gridR, posR, statusR, pointsR] = getDataDriver(
        dataRace,
        codDriver
      );
      scuderia.innerHTML = `${scuR}`;
      imgScuderia.src = `assets/Constructors/${scuR}.png`;
      imgScuderia.alt = `${scuR}`;
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
  const gpCodeResponse = await fetch("./app/grand_prix.json");
  const gpCodeData = await gpCodeResponse.json();
  const getCodeFlag = (lastNameRace) => gpCodeData.GrandPrix[lastNameRace];
  for (let i = races.length - 1; i >= 0; i--) {
    const lastDate = new Date(races[i].date);
    if (lastDate <= new Date(formattedDate)) {
      lastNameRace = races[i].raceName;
      lastNameCircuit = races[i].Circuit.circuitName;
      nameGP.innerHTML = `${lastNameRace}`;
      nameCircuit.innerHTML = `${lastNameCircuit}`;
      imgCircuit.src = `assets/Circuit/${lastNameCircuit}.jpg`;
      imgCircuit.alt = `${lastNameCircuit}`;
      raceFlag.src = `https://flagsapi.com/${getCodeFlag(
        lastNameRace
      )}/shiny/64.png`;
      break;
    }
  }
  const showCard = () => {
    return races.map((data) => {
      const horaZulu = `${data.time}`;
      const horaUTC = new Date(`1970-01-01T${horaZulu}`);
      const options = {
        hour12: true,
      };
      const horaLocalColombia = horaUTC.toLocaleTimeString("es-CO", {
        timeZone: "America/Bogota",
        options,
      });
      const horaLocalMexico = horaUTC.toLocaleTimeString("es-MX", {
        timeZone: "America/Mexico_City",
        options,
      });
      const horaLocalBrasil = horaUTC.toLocaleTimeString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        options,
      });
      const horaLocalArgentina = horaUTC.toLocaleTimeString("es-AR", {
        timeZone: "America/Argentina/Buenos_Aires",
        options,
      });

      return `<div class="schedules__card swiper-slide">
          <figure class="card__flagCircuit">
            <img src="https://flagsapi.com/${getCodeFlag(
        data.raceName
      )}/shiny/64.png" id="scheduleFlag" />
            <div class="card__circuitTitle">
              <span class="schedules__roundRace" id="roundRace"><b>${data.round
        }</b></span>
              <h3 class="card__circuitTitle--gp" id="scheduleGP">${data.raceName
        }</h3>
              <span class="card__circuitTitle--name" id="scheduleCircuit"
                >${data.Circuit.circuitName}</span
              >
            </div>
          </figure>
          <figure>
            <img
              src="assets/Circuit/${data.Circuit.circuitName}.jpg"
              class="card__circuitTitle--img"
              alt="Image of Circuit"
              id="imgScheCircuit"
            />
          </figure>
          <div class="schedules__info">
            <span class="schedules__date" id="scheduleDate"
              ><b>Date: </b> ${data.date}</span
            >
            <figure class="schedules__data">
              <img
                src="https://flagsapi.com/CO/shiny/64.png"
                alt=""
                class="schedules__data--flag"
              />
              <span class="schedules__date--race" id="hCO">${horaLocalColombia}</span>
            </figure>
            <figure class="schedules__data">
              <img
                src="https://flagsapi.com/BR/shiny/64.png"
                alt=""
                class="schedules__data--flag"
              />
              <span class="schedules__date--race" id="hBR">${horaLocalBrasil}</span>
            </figure>
            <figure class="schedules__data">
              <img
                src="https://flagsapi.com/MX/shiny/64.png"
                alt=""
                class="schedules__data--flag"
              />
              <span class="schedules__date--race" id="hMX">${horaLocalMexico}</span>
            </figure>
            <figure class="schedules__data">
              <img
                src="https://flagsapi.com/AR/shiny/64.png"
                alt=""
                class="schedules__data--flag"
              />
              <span class="schedules__date--race" id="hAR">${horaLocalArgentina}</span>
            </figure>
          </div>
        </div>`;
    }).join(''); // Unir todos los strings HTML generados en un solo string
  };
  scheduleCards.insertAdjacentHTML(`afterbegin`, showCard());
};
getCircuit();


const getTableDrivers = async () => {
  const tableDriverResponse = await fetch(
    "https://ergast.com/api/f1/current/driverStandings.json"
  );
  const tableDriverData = await tableDriverResponse.json();
  const driversData = tableDriverData.MRData.StandingsTable.StandingsLists[0].DriverStandings
  const tableHTML = `
    <table>
      <thead>
        <tr>
          <th class="driversStand__table--th">Position</th>
          <th class="driversStand__table--th">Driver</th>
          <th class="driversStand__table--th">Team</th>
          <th class="driversStand__table--th">Wins</th>
          <th class="driversStand__table--th">Points</th>
        </tr>
      </thead>
      <tbody>
        ${driversData.map((dataD) => `
          <tr>
            <td>${dataD.position}</td>
            <td>${dataD.Driver.givenName} ${dataD.Driver.familyName}</td>
            <td>${dataD.Constructors[0].name}</td>
            <td>${dataD.wins}</td>
            <td>${dataD.points}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
return tableHTML;
};
getTableDrivers().then((table) => {
  document.getElementById('tableD').innerHTML = table;
});

const getTableTeams = async () => {
  const tableTeamsResponse = await fetch(
    "https://ergast.com/api/f1/current/constructorStandings.json"
  );
  const tableTeamsData = await tableTeamsResponse.json();
  console.log(tableTeamsData);
  const teamsData = tableTeamsData.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
  console.log(teamsData);
  const tableHTML = `
    <table>
      <thead>
        <tr>
          <th class="teamsStand__table--th">Position</th>
          <th class="teamsStand__table--th">Team</th>
          <th class="teamsStand__table--th">Nationality</th>
          <th class="teamsStand__table--th">Wins</th>
          <th class="teamsStand__table--th">Points</th>
        </tr>
      </thead>
      <tbody>
        ${teamsData.map((dataT) => `
          <tr>
            <td>${dataT.position}</td>
            <td>${dataT.Constructor.name}</td>
            <td>${dataT.Constructor.nationality}</td>
            <td>${dataT.wins}</td>
            <td>${dataT.points}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
return tableHTML;
};
getTableTeams().then((table) => {
  document.getElementById('tableT').innerHTML = table;
});

searchDriver.addEventListener("blur", (event) => {
  let nameDriver =
    event.target.value.charAt(0).toUpperCase() +
    event.target.value.slice(1).toLowerCase();
  search(nameDriver);
});
