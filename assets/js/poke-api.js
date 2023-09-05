const pokeApi = {}

//Função que converte detalhes da poke api para o card pokemon detail.
function convertPokeApiDetailToPokemon(pokeDetail) { 
    const pokemon = new Pokemon() //Instância nova
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    //Equivalência:
    //Fazendo Array destructuring, pegando o type principal.
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types //destructuring, pegando o type principal. (primeiro index do type)

    pokemon.types = types
    pokemon.type = type
    ////////////////
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default //imagem do pokemon

    return pokemon
}

//Função que busca e mapeia a lista de detalhes de pokemon (pokeApiDetail)
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

//Função de busca de pokemons (e requisições de detalhes do pokemon)
pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url) //retorna a lista de pokemon que esta na url declarada acima;
        .then((response) => response.json()) //transforma a lista do Api para json;
        .then((jsonBody) => jsonBody.results) //pega os resultados json acima e insere;
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) //transformando a lista de pokemons em uma busca de detalhes do Pokemon.
        .then((detailRequests) => Promise.all(detailRequests)) //detalhes de Requisições recebendo 'promessas'
        .then((pokemonsDetails) => pokemonsDetails)
}