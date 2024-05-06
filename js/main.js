function mostrarMensaje(mensaje) {
    alert(mensaje);
}

class Articulo {
    constructor(nombre, precios) {
        this.nombre = nombre;
        this.precios = precios;
    }
}

let articulos = [
    new Articulo("Campera", { basico: 550, estandar: 750, premium: 950 }),
    new Articulo("Casco", { basico: 400, estandar: 600, premium: 800 }),
    new Articulo("Guantes", { basico: 200, estandar: 400, premium: 600 }),
    new Articulo("Botas", { basico: 350, estandar: 550, premium: 750 })
];

let precioTotal = 0;

function seleccionarArticulo() {
    let listaArticulos = "Lista de artículos:\n";
    articulos.forEach((articulo, index) => {
        listaArticulos += `${index + 1}. ${articulo.nombre}\n`;
    });

    let seleccion = prompt(listaArticulos + "\nPor favor, seleccione un artículo (1-4): ");
    while (seleccion < 1 || seleccion > 4 || isNaN(seleccion)) {
        seleccion = prompt("Por favor, ingrese un número válido entre las opciones para seleccionar un artículo: \n1. Campera\n2. Casco\n3. Guantes\n4. Botas");
    }

    let articuloSeleccionado = articulos[seleccion - 1];

    let precios = Object.keys(articuloSeleccionado.precios).map((modelo, index) => {
        return `${index + 1}.${modelo}: $${articuloSeleccionado.precios[modelo]}`;
    }).join("\n"); //utlizo el object.keys para poder tener las claves del array y asi poder usar los precios con el map y luego tomar el indice . Nose si esta bien utilizarlo asi 

    let seleccionPrecio = prompt(`Precios disponibles para ${articuloSeleccionado.nombre}:\n${precios}\nSeleccione el precio (1-3):`);
    while (seleccionPrecio < 1 || seleccionPrecio > 3 || isNaN(seleccionPrecio)) {
        seleccionPrecio = prompt("Por favor, ingrese un número válido entre las opciones para seleccionar el modelo de su artículo: \n1. Básico\n2. Estándar\n3. Premium");
    }

    switch (parseInt(seleccionPrecio)) {
        case 1:
            precioTotal += articuloSeleccionado.precios.basico;
            break;
        case 2:
            precioTotal += articuloSeleccionado.precios.estandar;
            break;
        case 3:
            precioTotal += articuloSeleccionado.precios.premium;
            break;
        default:
            break;
    }

    mostrarMensaje(`¡${articuloSeleccionado.nombre} (${Object.keys(articuloSeleccionado.precios)[seleccionPrecio - 1]}) agregado al carrito!`);
}

function preguntarAgregarOtroArticulo() {
    let agregarOtro = prompt("¿Desea agregar otro artículo? (si/no): ");
    while (agregarOtro.toLowerCase() !== "si" && agregarOtro.toLowerCase() !== "no") {
        agregarOtro = prompt("Por favor, responda 'si' o 'no': ");
    }
    return agregarOtro.toLowerCase() === "si";
}

mostrarMensaje("Bienvenidos a NIKA moto indumentaria");

let agregarOtroArticulo = true;

while (agregarOtroArticulo) {
    seleccionarArticulo();
    agregarOtroArticulo = preguntarAgregarOtroArticulo();
}

mostrarMensaje(`El precio total a pagar es: $${precioTotal}`);

mostrarMensaje(`¡Gracias por su compra! ¡Vuelvas prontos! \n NIKA`);
