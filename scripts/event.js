function crearTarjeta(event) {
    return`<div id="event" class="card d-flex justify-content-center" >
<img src="${event.image}" class="imgDetail" alt="Images">
<div class="card-body">
    <h5 class="card-title-detail">${event.name}</h5>
    <P>Date: ${event.date}</p>
    <div class="card-bottom d-flex flex-column justify-content-between">
        <p class="card-text-detail">Description: ${event.description}</p>
        <div class="d-flex flex-row justify-content-around" >
            <p class="card-text-detail">Category: ${event.category}</p>
            <p class="card-text-detail">Capacity: ${event.capacity}</p>
            <p class="card-text-detail">Assistance: ${event.assistance} </p>
            <p>Price: $ ${event.price}</P>
        </div>
        <div class="d-flex flex-row justify-content-end" >
        <a href="./index.html" class="btn btn-primary">Home</a>
        </div>
    </div>
    
    
</div>
</div>`
}

let params = new URLSearchParams(document.location.search)
let id = params.get('id')
let event = data.events.filter(info => info._id == id);
let detail = document.getElementById('detail');
detail.innerHTML = crearTarjeta(event[0])
