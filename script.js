const container = document.querySelector("#container");
const pokemonCount = 151
const colors = {
    fire: '#f35945',
    grass: '#98d7a5',
    electric: '#fddc01',
    water: '#5fc2e7',
    ground: '#9c5e49',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#39b665',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#9066a1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
}

const mainTypes = Object.keys(colors)

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemon(i)
    }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const resp = await fetch(url)
    const data = await resp.json()
    createPokemonCard(data)
    //console.log(data.types[0].type.name)
}

const createPokemonCard = (poke) => {
    const card = document.createElement('div')
    card.classList.add("pokemon")

    const name = poke.name[0].toUpperCase() + poke.name.slice(1)
    const id = poke.id.toString().padStart(3, '0')

    const pokeTypes = poke.types.map(type => type.type.name)
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1)
    const color = colors[type]

    card.style.backgroundColor = color

    const pokemonInnerHtml = `  <div class="imgContainer">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
    </div>
    <div class="info">
    <span class="number" id="number">${id}</span>
    <h3 class="name" id="name">${name}</h3>
    <small class="type">Type: <span>${type}</span></small>
    </div>`

    card.innerHTML = pokemonInnerHtml

    container.appendChild(card)
}

fetchPokemons()