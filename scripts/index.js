//Tarjetas
function generarTarjetas(arrayEvents){
    let tarjetas = "";
    for (const event of arrayEvents) {
        tarjetas += crearTarjeta(event);
    }
    return tarjetas
}

function crearTarjeta(event) {
        return `
        <div class="card d-flex justify-content-center" style="width: 18rem;">
            <img src="${event.image}" class="card-img-top" alt="Images">
            <div class="card-body">
                <h5 class="card-title">${event.name}</h5>
                <P>Date: ${event.date}</p>
                <div class="card-bottom d-flex flex-column justify-content-between">
                    <p class="card-text">${event.description}</p>
                    <p>Category: ${event.category}</p>
                    <p>Price: $ ${event.price}</P>
                    <a href="#" class="btn btn-primary">See more</a>
                </div>
                
            </div>
        </div>`
}
//Categorias
function cargarCategorias(arrayCat){
    let categorias = "";
    for(const cat of arrayCat){
        categorias +=  crearCheckbox(cat);
    }
    return categorias
}

function crearCheckbox(cat){
    return `
    <div class="form-check form-check-inline m-0">
        <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="${cat}"  />
        <label class="form-check-label" for="inlineCheckbox1">${cat}</label>
    </div>`
}

//quiero sacar los duplicados del array
function eliminarDuplicados (array){
    let unicos = []
    for(let i = 0 ; i< array.length; i++){
        if (!unicos.includes(array[i])){
            unicos.push(array[i])
        }
    }
    return unicos
}

//Aca se cargan las tarjetas de los eventos
const contTarjeta = document.querySelector("#containerCard");
let tarjetasGeneradas = generarTarjetas(data.events)
contTarjeta.innerHTML = tarjetasGeneradas;

// Aca se cargan los checkbox de cada categoria
const categorias = document.getElementById('category')
//voy a tratar de obtener un array de categorias
let categoriasFiltradas = eliminarDuplicados(data.events.map((cat)=> cat.category))
let catGeneradas = cargarCategorias(categoriasFiltradas);
console.log(catGeneradas);
categorias.innerHTML = catGeneradas