// Select all target elements
const loadBtn = document.querySelector(".load-btn");
const logoContainer = document.querySelector("#logo-container");
const spinner = document.querySelector("#loader");
const pokemonImageReplyContainer = document.querySelector("#poke-image-reply-container");
const randomImageViewer = document.querySelector("#random-image-viewer");
const pokemonLoader = document.querySelector("#pokemon-loader");

const pokemonRandomCard = document.querySelector(".random-card");

const displayPokemonRandomReplyImage = new Event("displayPokemonRandomReplyImage");
const activetButton = new Event("activetButton");
const deactivateButton = new Event("deactivateButton");
const retrieveData = new Event("retrieveData");
const showSpinner = new Event("showSpinner");
const hideSpinner = new Event("hideSpinner");
const displayRandomPokemon = new Event("displayRandomPokemon");

// Constant variables
const randomImageList = [
    "./assets/pokemon-reply-1.gif",
    "./assets/pokemon-reply-2.gif",
    "./assets/pokemon-reply-3.gif"
];

window.addEventListener("DOMContentLoaded", () => {
    console.log("Welcome to pokedex app");
    document.dispatchEvent(displayPokemonRandomReplyImage);
    loadBtn.addEventListener('click', () => {
        document.dispatchEvent(retrieveData);
    });
});

// Custom events handlers
document.addEventListener("displayPokemonRandomReplyImage", () => {
    // Generate a random position
    let randomPosition = Math.floor(Math.random() * 3) // expected output: 0, 1 or 2
    let randomImageLink = randomImageList[randomPosition];
    // Adding in an src property of the image element about the random viewer
    randomImageViewer.src = randomImageLink
});

document.addEventListener("retrieveData", async () => {
    document.dispatchEvent(showSpinner);
    // simulatePause(5000);
    // logic for retriving data
    let randomPokemonId = Math.floor(Math.random() * 100); // expected output: 0 to 1000 random value
    let pokemonUrl = `https://pokebuildapi.fr/api/v1/pokemon/${randomPokemonId}`;
    //let pokemonUrl = `https://pokebuildapi.fr/api/v1/pokemon/300`;
    const response = await fetch(pokemonUrl);
    const data = await response.json();
    setTimeout(() => {
        console.log(data);
        document.dispatchEvent(hideSpinner);
        displayRandomPokemon.data = data;
        document.dispatchEvent(displayRandomPokemon);
    }, 5000);
});

document.addEventListener("showSpinner", () => {
    pokemonImageReplyContainer.hidden = true;
    spinner.hidden = false;
    pokemonLoader.hidden = false;
    logoContainer.hidden = true;
    pokemonRandomCard.style.display = "none";
});

document.addEventListener("hideSpinner", () => {
    pokemonImageReplyContainer.hidden = false;
    spinner.hidden = true;
    pokemonLoader.hidden = true;
    logoContainer.hidden = false;
});


document.addEventListener("displayRandomPokemon", (event) => {
    let pokemon = event.data;
    pokemonImageReplyContainer.hidden = true;
    pokemonRandomCard.style.display = "flex";
    // alert(JSON.stringify(pokemon));
    pokemonRandomCardGenerator(pokemon)
});

// Utilities function 
function pokemonRandomCardGenerator(pokemon){
    // Put my logic to generate the rondom card UI elements here
    pokemonRandomCard.innerHTML = `
    <div class="poke-image-container">
       <img src=${pokemon.image} alt=${pokemon.name} id="random-pokemon-image" title=${pokemon.name}>
    </div>
    <div class="poke-features">
       <div class="poke-sprite-container"><img src=${pokemon.sprite} alt="" id="poke-sprite-image" title=${pokemon.name}></div>
       <div class="poke-name-section">Name : <span id="poke-name">${pokemon.name}</span></div>
       <div class="poke-hp-section">HP : <span id="poke-hp">${pokemon.stats.HP}</span></div>
       <div class="poke-speed-section">Speed : <span id="poke-speed">${pokemon.stats.speed}m/s</span></div>
       <div class="poke-types-section">Types: ${pokemon.apiTypes.map(type =>`<img src=${type.image} alt=${type.name} title=${type.name}>`).join('')}</div>
   </div>
    `
}