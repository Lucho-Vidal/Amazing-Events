//función única para cada pagina
function generarTarjetas(arrayEvents){
    let tarjetas = "";
    for (const event of arrayEvents) {
            tarjetas += crearTarjeta(event);
    }
    return tarjetas
}