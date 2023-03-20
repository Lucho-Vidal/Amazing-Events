//función única para cada pagina
function generarTarjetas(arrayEvents) {
  let tarjetas = "";
  for (const event of arrayEvents) {
    if (Date.parse(event.date) < Date.parse(datosAPI.currentDate)) {
      tarjetas += crearTarjeta(event);
    }
  }
  return tarjetas;
}