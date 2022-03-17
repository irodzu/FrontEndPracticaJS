const baseURL = 'https://pokeapi.co/api/v2/pokemon/'
const pokemon = document.getElementById('pokeName')
const busca = document.getElementById('pokeBusca')
const limpiar = document.getElementById('pokeLimpia')
const tipo = document.getElementById('pokeTipo')
const foto = document.getElementById('pokeFoto')
const nomID = document.getElementById('pokeNomID')

busca.addEventListener('click', ingresaPokemon)
busca.addEventListener('touchstart', ingresaPokemon) //* Móvil

limpiar.addEventListener('click', limpiaPokemon)
limpiar.addEventListener('touchstart', limpiaPokemon) //* Móvil

function ingresaPokemon(){
    window.fetch(`${baseURL}${pokemon.value.toLowerCase( )}`)
        .then(response => {
            if (response.status === 404) {
                alert('El pokémon no existe. Intenta otra vez')
            } else {
                return response.json()
            }
        })
        .then(responseJSON => {
            const Info = []
            
            const result = []

            for(let pokeInfo in responseJSON){
                result.push([pokeInfo, responseJSON[pokeInfo]])
            }

            console.table(result)

            //* Traer Tipo

            const pokeType = document.createElement('h4')
            pokeType.innerText = `Tipo: ${result[16][1][0].type.name}`

            const contType = document.createElement('div')
            contType.append(pokeType)

            Info.push(contType)
            tipo.append(...Info)

            //* Traer Imagen
            const pokeImg = document.createElement('img')
            pokeImg.src = result[14][1].front_default

            const contIMG = document.createElement('div')
            contIMG.append(pokeImg)

            Info.push(contIMG)
            foto.append(...Info)
            
            //* Traer ID y Nombre
            const pokeNameID = document.createElement('h2')
            pokeNameID.innerText = `#${result[6][1]} - ${result[10][1]}`

            const contNameID = document.createElement('div')
            contNameID.append(pokeNameID)

            Info.push(contNameID)
            nomID.append(...Info)
        })
}

function limpiaPokemon(){
    let todoPokemon = nomID.childNodes
    todoPokemon = Array.from(todoPokemon)

    todoPokemon.forEach(pokemon => {
        pokemon.remove(pokemon)
    })
}