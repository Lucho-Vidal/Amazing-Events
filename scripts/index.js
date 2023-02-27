const contTarjeta = document.querySelector("#containerCard");

let tarjetasGeneradas = crearTarjetas(data.events)

contTarjeta.innerHTML = tarjetasGeneradas;


function crearTarjetas(arrayEvents) {
    let tarjetas = "";
    for (const event of arrayEvents) {
        tarjetas += `
        <div class="card" style="width: 18rem;">
            <img src="${event.image}" class="card-img-top" alt="Images">
            <div class="card-body">
                <h5 class="card-title">${event.name}</h5>
                <p class="card-text">${event.description}</p>
                <a href="#" class="btn btn-primary">See more</a>
            </div>
        </div>`
    }
    return tarjetas
}

