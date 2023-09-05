const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 6;
let offset = 0;

function convertPokemonTypesToLi(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
}

//função que converte lista pokemon js para html (faz o card do pokemon)
function convertPokemonToLi(pokemon) {
    return `
    <li class="m-pokemon ${pokemon.type}">
        
        <div class="m-detail">
            <span class="a-name">${pokemon.name}</span>
            <ol class="m-types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join(' ')}
            </ol>
        </div>
        
        <div class="m-detail">
            <span class="a-id">#${pokemon.number}</span>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
       
    </li>
    `
}

//função que capta e transforma os types dos pokemons para html e junta ao li(card)
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}


loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit)
    }
})

//mecanismo para limitar 151 pokemons

