//url driver `https://api.openf1.org/v1/drivers?last_name=${`Verstappen`}`

//http://ergast.com/api/f1/constructors/{{constructorid}}

const requestOptions = {
  method: "GET",
  redirect: "follow",
};

const search = async () => {
  const response = await fetch(
    `https://api.openf1.org/v1/drivers?last_name=${`Verstappen`}`,
    requestOptions
  );
  const result = await response.json();
  console.log(result);
};

search();
