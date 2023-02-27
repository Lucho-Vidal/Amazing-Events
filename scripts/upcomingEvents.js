
function generarTarjetas(arrayEvents,currentDate){
    let tarjetas = "";
    for (const event of arrayEvents) {
        if(Date.parse(event.date)>Date.parse(currentDate)){
            tarjetas += crearTarjeta(event);
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

const contTarjeta = document.querySelector("#containerCard");

let tarjetasGeneradas = generarTarjetas(data.events,data.currentDate)

contTarjeta.innerHTML = tarjetasGeneradas;