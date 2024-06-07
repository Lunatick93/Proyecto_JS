import { agregarAlCarrito } from './carrito.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Documento cargado. Cargando productos...');
    fetch('./productos.json')
        .then(response => response.json())
        .then(data => {
            // Lógica para cargar los productos desde el archivo JSON
            console.log('Productos cargados:', data);
            mostrarProductos(data);
        })
        .catch(error => console.error('Error al cargar productos:', error));
});

function mostrarProductos(productos) {
    console.log('Mostrando productos...');
    const container = document.getElementById('container');
    productos.forEach(producto => {
        const card = crearCard(producto);
        container.appendChild(card);
    });
}

function crearCard(producto) {
    console.log('Creando card para producto:', producto);
    const card = document.createElement('div');
    card.className = producto.stock ? 'card' : 'no-card';

    const titulo = document.createElement('p');
    titulo.innerText = producto.nombre;
    titulo.className = 'titulo';

    const imagen = document.createElement('img');
    imagen.src = producto.imagen;
    imagen.alt = 'NOIMG';
    imagen.className = 'img';

    const precio = document.createElement('p');
    precio.innerText = `Precio: $${producto.precio}`;
    precio.className = 'titulo';

    const botonAgregar = document.createElement('button');
    botonAgregar.innerText = 'Agregar al carrito';
    botonAgregar.className = 'btn-add';
    botonAgregar.onclick = () => agregarAlCarrito(producto.id);

    card.appendChild(titulo);
    card.appendChild(imagen);
    card.appendChild(precio);
    card.appendChild(botonAgregar);

    return card;
}
