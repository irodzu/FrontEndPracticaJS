const baseURL = 'https://pokeapi.co/api/v2/pokemon/'
const pokemon = document.getElementById('pokeName')
const busca = document.getElementById('pokeBusca')
const limpiar = document.getElementById('pokeLimpia')
const tipo = document.getElementById('pokeTipo')
const foto = document.getElementById('pokeFoto')
const nomID = document.getElementById('pokeNomID')
const stats = document.getElementById('pokeStats')
const movs = document.getElementById('pokeMovs')

busca.addEventListener('click', ingresaPokemon)
busca.addEventListener('touchstart', ingresaPokemon) //* Móvil

limpiar.addEventListener('click', limpiaPokemon)
limpiar.addEventListener('touchstart', limpiaPokemon) //* Móvil

limpiar.addEventListener('click', limpiaStats)
limpiar.addEventListener('touchstart', limpiaStats) //* Móvil

limpiar.addEventListener('click', limpiaMovs)
limpiar.addEventListener('touchstart', limpiaMovs) //* Móvil

limpiar.addEventListener('click', limpiaID)
limpiar.addEventListener('touchstart', limpiaID) //* Móvil


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
            const StatsInfo = []
            const MovsInfo = []
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

            //* STATS

            //* HP
            const hp = document.createElement('p')
            hp.innerText = `HP: ${result[15][1][0].base_stat}`
            hp.classList.add('pokemonStats')

            //* Ataque
            const attack = document.createElement('p')
            attack.innerText = `Ataque: ${result[15][1][1].base_stat}`
            attack.classList.add('pokemonStats')

            //* Defensa
            const defense = document.createElement('p')
            defense.innerText = `Defensa: ${result[15][1][2].base_stat}`
            defense.classList.add('pokemonStats')

            //* Ataque Especial
            const specialAttack = document.createElement('p')
            specialAttack.innerText = `Ataque Especial: ${result[15][1][3].base_stat}`
            specialAttack.classList.add('pokemonStats')

            //* Defensa Especial
            const specialDefense = document.createElement('p')
            specialDefense.innerText = `Defensa Especial: ${result[15][1][4].base_stat}`
            specialDefense.classList.add('pokemonStats')

            //* Velocidad
            const speed = document.createElement('p')
            speed.innerText = `Velocidad: ${result[15][1][5].base_stat}`
            speed.classList.add('pokemonStats')

            //* Contenedor de Stats
            const Pstats = document.createElement('div')
            Pstats.append(hp, attack, defense, specialAttack, specialDefense, speed)
            Pstats.classList.add('PokeContStats')

            const contStats = document.createElement('div')
            contStats.append(Pstats)
            contStats.classList.add('contStats')

            StatsInfo.push(contStats)
            stats.append(...StatsInfo)

            //* MOVIMIENTOS

            //* Primero
            const first = document.createElement('p')
            first.innerText = `1. ${result[9][1][0].move.name}`
            first.classList.add('pokemonMovs')

            //* Segundo
            const second = document.createElement('p')
            second.innerText = `2. ${result[9][1][1].move.name}`
            second.classList.add('pokemonMovs')

            //* Tercero
            const third = document.createElement('p')
            third.innerText = `3. ${result[9][1][2].move.name}`
            third.classList.add('pokemonMovs')

            //* Cuarto
            const forth = document.createElement('p')
            forth.innerText = `4. ${result[9][1][50].move.name}`
            forth.classList.add('pokemonMovs')
            //* Contenedor de Movimientos
            const Pmovs = document.createElement('div')
            Pmovs.append(first, second, third, forth)
            Pmovs.classList.add('PokeContMovs')

            const contMovs = document.createElement('div')
            contMovs.append(Pmovs)
            contMovs.classList.add('contMovs')

            MovsInfo.push(contMovs)
            movs.append(...MovsInfo)
        })
}

function limpiaPokemon(){
    let todoPokemon = nomID.childNodes
    todoPokemon = Array.from(todoPokemon)

    todoPokemon.forEach(pokemon => {
        pokemon.remove(pokemon)
    })
}

function limpiaStats(){
    let todoStats = stats.childNodes
    todoStats = Array.from(todoStats)

    todoStats.forEach(stats => {
        stats.remove(stats)
    })
}

function limpiaMovs(){
    let todoMovs = movs.childNodes
    todoMovs = Array.from(todoMovs)

    todoMovs.forEach(movs => {
        movs.remove(movs)
    })
}

function limpiaID(){
    pokemon.value = ''
}