import { productos } from './productos.js';

const container = document.getElementById("container");
const btnCarrito = document.getElementById("btn-carrito");
const divCarrito = document.getElementById("carrito");
const finalizarCompraDiv = document.getElementById("finalizar-compra");
const btnFinalizarCompra = document.getElementById("btn-finalizar-compra");
const totalCompraP = document.getElementById("total-compra");

let mostrar = false;
const botonMostrarOcultar = document.createElement("button");
botonMostrarOcultar.innerText = "Mostrar carrito";
botonMostrarOcultar.onclick = () => mostrarOcultar();

btnCarrito.appendChild(botonMostrarOcultar);

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(id) {
    const productoAAgregar = productos.find(producto => producto.id === id);
    if (carrito.some(element => element.id === productoAAgregar.id)) {
        alert("Ya agregaste este producto");
    } else {
        carrito.push({ ...productoAAgregar });
        localStorage.setItem("carrito", JSON.stringify(carrito));
        if (mostrar) {
            actualizarCarrito();
        }
    }
}

function quitarDelCarrito(id) {
    carrito = carrito.filter(el => el.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    if (mostrar) {
        actualizarCarrito();
    }
}

function crearCard(producto, contenedor) {
    const card = document.createElement("div");
    card.className = producto.stock ? "card" : "no-card";

    const titulo = document.createElement("p");
    titulo.innerText = producto.nombre;
    titulo.className = "titulo";

    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;
    imagen.className = "img";

    const precio = document.createElement("p");
    precio.innerText = `Precio: $${producto.precio}`;
    precio.className = "titulo";

    const botonAgregar = document.createElement("button");
    botonAgregar.innerText = contenedor === "container" ? "Agregar al carrito" : "Quitar del carrito";
    botonAgregar.className = "btn-add";
    if (contenedor === "container") {
        botonAgregar.onclick = () => agregarAlCarrito(producto.id);
    } else {
        botonAgregar.onclick = () => quitarDelCarrito(producto.id);
    }

    card.appendChild(titulo);
    card.appendChild(imagen);
    card.appendChild(precio);
    card.appendChild(botonAgregar);

    const nuevoContenedor = document.getElementById(contenedor);
    nuevoContenedor.appendChild(card);
}

function mostrarOcultar() {
    if (mostrar) {
        mostrar = false;
        divCarrito.innerHTML = "";
        botonMostrarOcultar.innerText = "Mostrar carrito";
        finalizarCompraDiv.style.display = "none";
    } else {
        mostrar = true;
        actualizarCarrito();
        botonMostrarOcultar.innerText = "Ocultar carrito";
        finalizarCompraDiv.style.display = "block";
    }
}

function actualizarCarrito() {
    divCarrito.innerHTML = "";
    carrito.forEach(el => crearCard(el, "carrito"));
}

function finalizarCompra() {
    const total = carrito.reduce((acc, item) => acc + item.precio, 0);
    totalCompraP.innerText = `Total a pagar: $${total}`;
}

productos.forEach(el => crearCard(el, "container"));

btnFinalizarCompra.onclick = finalizarCompra;
