let url = `https://pro-talento.up.railway.app/api/mindy/products/`;

let toys = [];

async function fecthApi() {
  try {
    let response = await fetch(url);
    response = await response.json();
    console.log("total " + response.products.length + " productos");

    toys = response.products.filter((item) => item.tipo==="Juguete");
    console.log(toys);

    printCards(toys);

    document.getElementById('buttonSearch').addEventListener('click', (event) => {
        event.preventDefault();
        filterData();
    })
    /*document.querySelectorAll('.selectOrder').forEach((each) => each.addEventListener('click', filterData))*/

  } catch (error) {
    console.log(error);
  }
}

fecthApi();

async function filterData() {
  try {
    let texto = document.getElementById('searchInText').value.toLowerCase();

    url += `?nombre=${texto}&tipo=juguetes`;
    let response = await fetch(url);
    response = await response.json();
    toysFiltered = response.products;

    if (toysFiltered.length == 0) {
      printEmpty()
    } else {
      printCards(toysFiltered)
    }
  } catch (error) {
    console.log(error)
  }

}

/* FUNCTION: Pinta las cards según el arreglo de eventos
 * que ingrese por parámetro */
function printCards(array) {
    const containerCategory = document.getElementById('container-toys');
    //containerCategory.innerHTML = '';

    for (let i = 0; i < array.length; i++) {

        //let id = `card${i + 1}`
        //let div = createToyCard(id, array[i]);
        //containerCategory.appendChild(div)

    }
}

/* FUNCTION: Pinta mensaje de eventos vacíos */
function printEmpty() {
    const containerCards = document.getElementById('container-toys');
    containerCards.innerHTML = '';

    containerCards.innerHTML = `
        <div class="alert alert-danger" role="alert" style="display:flex; justify-content:center; padding:20px; margin:5px 20px 0px 20px font-family: 'Secular One', sans-serif;" >
        NO SE HAN ENCONTRADO JUGUETES CON TU BUSQUEDA, INTENTA DE NUEVO</div>`;
}

/* FUNCTION: Retorna UN div para cada juguete */
function createToyCard(id, producto) {

    let div = document.createElement('div');
    div.id = id;
    div.className = 'card'

    div.innerHTML = `
        <img src="${producto.imagen}" alt="Toy">
        <div class="card-description">
            <div class="card-title">
                <h4  style="display: flex; justify-content: center; text-transform: uppercase;" >${producto.nombre}</h4>
            </div>
            <div class="card-text">
                <p style=" font-family: Raleway;" >${producto.descripcion}</p>
            </div>
            <div class="card-link d-flex justify-content-evenly align-items-center">
            <h2>${producto.precio}</h2>
                <a href="#" style=" font-family: 'Lobster', cursive;" >Ver más</a>
            </div>
        </div>`
    return div
  }
