let parrafoIndex = document.getElementById('miParrafo')

document.getElementById('miBoton').addEventListener("click", function () {
    letra = document.getElementById('miInput').value
    buscarTragos(letra)
})

// Buscamos los tragos en la API TheCocktailDB, con una letra como parámetro
async function buscarTragos(letra) {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letra}`)
    if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
    // En un 'try-catch' por si no mete una letra (¿está bien manejado?)
    try {
        const data = await response.json()
        mostrarTragos(data)
    } catch (error) {
        parrafoIndex.innerHTML = 'Ingresa UNA LETRA!'
    }
}

// Recibimos la data y la renderizamos en el HTML
function mostrarTragos(data) {
    parrafoIndex.innerHTML = `<br> Los tragos encontrados con la letra '${letra.toUpperCase()}' son:`
    let size = Object.keys(data.drinks).length
    for (i = 0; i < size; i++) {
        stringTrago = data.drinks[i].strDrink

        htmlCadaTrago = `
                            <li>
                            ${stringTrago}
                            </li>
                        `
        parrafoIndex.innerHTML += htmlCadaTrago
    }
}