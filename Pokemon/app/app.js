// fetch("https://pokeapi.co/api/v2/pokemon/")
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//     // Aquí puedes hacer algo con los datos recibidos, como mostrarlos en la página web
//   })
//   .catch((error) => {
//     console.error("There was a problem with the fetch operation:", error);
//   });

const buscador = document.getElementById("searcher");
const imagenPokemon = document.getElementById("imagenPokemon");

const searchPokemon = async (pokemon) => {
  let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  let pokeJson = await data.json();
  console.log(pokeJson.sprites.front_default);
  console.log("si entro");
  titlePokemon.innerHTML = `<h2>${pokeJson.species.name}`;
  imagenPokemon.innerHTML = `<img src="${pokeJson.sprites.front_default}" alt="pokemon" >`;
  description.innerHTML = `<p>${pokeJson.species.url}`;
  console.log(pokeJson.species.url);
};

buscador.addEventListener("blur", (evento) => {
  let valorPokemon = evento.target.value;
  searchPokemon(valorPokemon);
});
