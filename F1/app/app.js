//url driver `https://api.openf1.org/v1/drivers?last_name=${`Verstappen`}`

//http://ergast.com/api/f1/constructors/{{constructorid}}

const requestOptions = {
  method: "GET",
  redirect: "follow",
};
const searchDriver = document.getElementById("searchDriver");

const search = async (nameDriver) => {
  console.log(nameDriver);
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

      console.log(result[0]);

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