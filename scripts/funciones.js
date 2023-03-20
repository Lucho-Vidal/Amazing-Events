//Estas funciones son comunes para Index, UpcomingEvents, pastEvents
const url = 'https://mindhub-xj03.onrender.com/api/amazing'

let categoriaSelect = []

let datosAPI = {}

function crearTarjeta(event) {
    return `
        <div id="event" class="card d-flex justify-content-center" style="width: 18rem;">
            <img src="${event.image}" class="card-img-top" alt="Images">
            <div class="card-body">
                <h5 class="card-title">${event.name}</h5>
                <P>Date: ${event.date}</p>
                <div class="card-bottom d-flex flex-column justify-content-between">
                    <p class="card-text">${event.description}</p>
                    <p>Price: $ ${event.price}</P>
                    <input type="button"  onclick="seeDetail('${event._id}')" value="See more" class="btn btn-primary">
                </div>
                
            </div>
        </div>`
}

function seeDetail(id) {
    window.location.href = `./event.html?id=${id}`
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
function filtrarCheckbox(events,checkbox){
    let eventfiltrados = [];
    if(checkbox.length > 0){
        checkbox.forEach((categoria)=>{
            events.forEach((event)=>{
                if(event.category==categoria){
                    eventfiltrados.push(event);
                }
            });        
        });
    }else{
        eventfiltrados = events;
    }
    return eventfiltrados;
}

function buscar(){
    let eventosEncontrados = [];
    let eventCheckbox = filtrarCheckbox(datosAPI.events,categoriaSelect);
    eventosEncontrados = eventCheckbox.filter((event)=>{
        return eventosFiltrados = (event.name.toLowerCase().includes(buscador.value.toLowerCase()));
    });
    return eventosEncontrados;
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
function modificarArrayCheck(e){
    if (e.checked){//agrego elemento a la lista o lo saco
        categoriaSelect.push(e.value);
    }else{
        categoriaSelect.splice(categoriaSelect.indexOf(e.value),1);
    }
    let eventosEncontrados = buscar();
    contTarjeta.innerHTML = generarTarjetas(eventosEncontrados);
}

fetch(url).then(response => response.json())
    .then(datosApi => {
        //Guardo los datos en una variable global
        datosAPI = datosApi
        //Cargo las tarjetas
        contTarjeta.innerHTML = generarTarjetas(datosApi.events);
        //Cargo los checkbox
        let categoriasFiltradas = eliminarDuplicados(datosApi.events.map((cat)=> cat.category));
        categorias.innerHTML = cargarCategorias(categoriasFiltradas);
        //Implementaré un método de filtrado por checkbox
        let checks = document.querySelectorAll('.valoresCheck');
        checks.forEach((e)=>{
            e.addEventListener('change', ()=> modificarArrayCheck(e));
        });
    }).catch(error => console.error(error.message))


//tarjetas
const contTarjeta = document.querySelector("#containerCard");

//Checkbox
const categorias = document.getElementById('category');

//Buscador
let buscador = document.getElementById('search');
buscador.addEventListener('keyup',()=> { 
    let eventosEncontrados = buscar();
    contTarjeta.innerHTML = generarTarjetas(eventosEncontrados);
});
