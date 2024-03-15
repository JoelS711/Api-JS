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
  try {
    let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    console.log("entro");
    if (data.status === 404) {
      throw new Error("No se pudo encontrar el Pokémon.");
    }
    let pokeJson = await data.json();
    gif.innerHTML = `<img src="${pokeJson.sprites.other.showdown.front_default}" class="gifPokemon" alt="gif-pokemon" >`;
    imagenPokemon.innerHTML = `<img src="${pokeJson.sprites.other.dream_world.front_default}" alt="pokemon" >`;
    console.log(pokeJson.sprites.front_default);
    console.log("si entro");
    titlePokemon.innerHTML = `<h2>${pokeJson.species.name}`;
    let speciesData = await fetch(pokeJson.species.url);
    let speciesJson = await speciesData.json();
    description.innerHTML = `<p>${speciesJson.flavor_text_entries[26].flavor_text}</p>`;
    console.log(pokeJson.species.url);
  } catch (error) {
    console.error("Error:", error.message);
    alert("Ocurrió un error al buscar el Pokémon: " + error.message);
  }
};

buscador.addEventListener("blur", (evento) => {
  let valorPokemon = evento.target.value;
  searchPokemon(valorPokemon);
});
