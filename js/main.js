function mostrarMensaje(mensaje) {
    alert(mensaje);
}

function seleccionarArticulo() {
  let listaArticulos = "Lista de artículos:\n";
  listaArticulos += "1. Campera\n";
  listaArticulos += "2. Casco\n";
  listaArticulos += "3. Guantes\n";
  listaArticulos += "4. Botas\n";

  let seleccion = prompt(listaArticulos + "\nPor favor, seleccione un artículo (1-4): ");
  while (seleccion <1 || seleccion > 4 || isNaN(seleccion)) {
    seleccion = prompt("Por favor, ingrese un número valido entre las opciones para seleccionar un articulo: \n 1. Campera\n2. Casco\n3. Guantes\n4. Botas");
  }
  let articuloSeleccionado = "";
  let precioArticulo = 0;

  switch (parseInt(seleccion)) {
    case 1:
      articuloSeleccionado = "campera";
      precioArticulo = 550;
      break;
    case 2:
      articuloSeleccionado = "casco";
      precioArticulo = 400; 
      break;
    case 3:
      articuloSeleccionado = "guantes";
      precioArticulo = 200; 
      break;
    case 4:
      articuloSeleccionado = "botas";
      precioArticulo = 350;
      break;
    default:
      articuloSeleccionado = "";
  }

  if (articuloSeleccionado !== "") {
   
    let seleccionPrecio = prompt(`Seleccione el precio para ${articuloSeleccionado} (1-3):\n1. Básico ($${precioArticulo})\n2. Estándar ($${precioArticulo + 200})\n3. Premium ($${precioArticulo + 400})`);
    while (seleccionPrecio < 1 || seleccionPrecio> 3 || isNaN(seleccionPrecio)) {
        seleccionPrecio = prompt("Por favor, ingrese un número valido entre las opciones para seleccionar el modelo de su articulo: \n 1. Básico\n2. Estandar\n3. Premium");
    }
    switch (parseInt(seleccionPrecio)) {
      case 1:
        precioArticulo = precioArticulo;
        break;
      case 2:
        precioArticulo = precioArticulo + 200;
        break;
      case 3:
        precioArticulo = precioArticulo + 400;
        break;
      default:
        precioArticulo = 0;
    }

    precioTotal += precioArticulo;

    mostrarMensaje(`¡${articuloSeleccionado} agregado al carrito con precio $${precioArticulo}!`);
    mostrarMensaje(`Precio total hasta ahora: $${precioTotal}`);
  }
}

function preguntarAgregarOtroArticulo() {
    let agregarOtro = prompt("¿Desea agregar otros articulo? (si/no): ");
    while (agregarOtro.toLowerCase() !== "si" && agregarOtro.toLowerCase() !== "no"){
        agregarOtro = prompt("Por favor, responda 'si' o 'no': ");
    }
    return agregarOtro.toLowerCase() === "si";
}

mostrarMensaje("Bienvenido a NIKA Moto Indumentaria");

let precioTotal= 0;
let agregarOtroArticulo = true;

while (agregarOtroArticulo) {
    seleccionarArticulo();
    agregarOtroArticulo = preguntarAgregarOtroArticulo();
}

mostrarMensaje (`El precio total a pagar es: $${precioTotal}`);

mostrarMensaje (`¡GRACIAS POR LA COMPRA VOLVE PRONTO!`);