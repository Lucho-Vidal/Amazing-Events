
function generarTarjetas(arrayEvents,checkbox){
    let tarjetas = "";
    for (const event of arrayEvents) {
        if(Date.parse(event.date)<Date.parse(data.currentDate)){
            if(checkbox.length > 0){
                checkbox.forEach((categoria)=>{
                    if(event.category==categoria){
                        tarjetas += crearTarjeta(event);
                    }
                })     
            }else{
                tarjetas += crearTarjeta(event);
            }
        }
    }
    return tarjetas
}

function crearTarjeta(event) {
        return `
        <div class="card" style="width: 18rem;">
            <img src="${event.image}" class="card-img-top" alt="Images">
            <div class="card-body">
                <h5 class="card-title">${event.name}</h5>
                <P>Date: ${event.date}</p>
                <p class="card-text">${event.description}</p>
                <p>Category: ${event.category}</p>
                <p>Price: $ $ ${event.price}</P>
                <a href="#" class="btn btn-primary">See more</a>
            </div>
        </div>`
}
//Categorias
function cargarCategorias(arrayCat){
    let categorias = "";
    for (let i=0;i<arrayCat.length;i++){
        categorias +=  crearCheckbox(arrayCat[i],i);
    }
    return categorias
}

function crearCheckbox(cat,i){
    return `
    <div class="form-check form-check-inline m-0">
        <input class="form-check-input valoresCheck" type="checkbox" name="categorias" id="categoria${i}" value="${cat}"   />
        <label class="form-check-label" for="categoria${i}">${cat}</label>
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
let categoriaSelect = []

//tarjetas
const contTarjeta = document.querySelector("#containerCard");
let tarjetasGeneradas = generarTarjetas(data.events,categoriaSelect)
contTarjeta.innerHTML = tarjetasGeneradas;

//checkbox
// Aca se cargan los checkbox de cada categoria
const categorias = document.getElementById('category')
//voy obtener un array de categorias
let categoriasFiltradas = eliminarDuplicados(data.events.map((cat)=> cat.category));
let catGeneradas = cargarCategorias(categoriasFiltradas);
categorias.innerHTML = catGeneradas;

//Implementaré un método de filtrado por checkbox
let checks = document.querySelectorAll('.valoresCheck');
//escucho los eventos de cada uno de los checkbox
checks.forEach((e)=>{
    e.addEventListener('change', ()=>{
        if (e.checked){//agrego elemento a la lista o lo saco
            categoriaSelect.push(e.value);
        }else{
            categoriaSelect.splice(categoriaSelect.indexOf(e.value),1);
        }
        contTarjeta.innerHTML = generarTarjetas(data.events,categoriaSelect);
    });
});
