let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

document.addEventListener('DOMContentLoaded', () => {
    console.log('Documento cargado. Actualizando carrito...');
    actualizarCarrito();
});

export function agregarAlCarrito(id) {
    console.log('Agregando al carrito:', id);
    fetch('./productos.json')
        .then(response => response.json())
        .then(data => {
            const productoAAgregar = data.find(producto => producto.id === id);
            console.log('Producto a agregar:', productoAAgregar);
            if (productoAAgregar && productoAAgregar.stock) {
                if (!carrito.some(item => item.id === productoAAgregar.id)) {
                    carrito.push(productoAAgregar);
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                    console.log('Producto agregado al carrito:', carrito);
                    actualizarCarrito();
                } else {
                    alert('Este producto ya está en el carrito');
                }
            } else {
                alert('Este producto no está disponible');
            }
        })
        .catch(error => console.error('Error al agregar al carrito:', error));
}


function quitarDelCarrito(id) {
    console.log('Quitando del carrito:', id);
    carrito = carrito.filter(producto => producto.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

function actualizarCarrito() {
    console.log('Actualizando carrito...');
    const carritoContainer = document.getElementById('carrito');
    carritoContainer.innerHTML = '';
    carrito.forEach(producto => {
        const card = crearCard(producto, true);
        carritoContainer.appendChild(card);
    });
    calcularTotal();

    // Mostrar botón de finalizar compra si hay productos en el carrito
    const finalizarCompraDiv = document.getElementById('finalizar-compra');
    finalizarCompraDiv.style.display = carrito.length > 0 ? 'block' : 'none';
}

function calcularTotal() {
    const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
    const totalCompraP = document.getElementById('total-compra');
    totalCompraP.innerText = `Total a pagar: $${total}`;
}

const btnCarrito = document.getElementById('btn-carrito');
const carritoDiv = document.getElementById('carrito');
btnCarrito.addEventListener('click', () => {
    console.log('Botón de carrito clickeado. Estado actual:', carritoDiv.style.display);
    if (carritoDiv.style.display === 'none' || carritoDiv.style.display === '') {
        carritoDiv.style.display = 'block';
        btnCarrito.innerText = 'Ocultar Carrito';
    } else {
        carritoDiv.style.display = 'none';
        btnCarrito.innerText = 'Ver Carrito';
    }
});

document.getElementById('btn-finalizar-compra').addEventListener('click', () => {
    // Lógica para finalizar la compra
    alert('Compra finalizada');
});

function crearCard(producto, enCarrito = false) {
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

    if (!producto.stock) {
        const sinStock = document.createElement('p');
        sinStock.innerText = 'Sin Stock';
        sinStock.className = 'sin-stock';
        card.appendChild(sinStock);
    }

    const precio = document.createElement('p');
    precio.innerText = `Precio: $${producto.precio}`;
    precio.className = 'titulo';

    const boton = document.createElement('button');
    boton.innerText = enCarrito ? 'Quitar del carrito' : 'Agregar al carrito';
    boton.className = 'btn-add';
    if (enCarrito) {
        boton.onclick = () => quitarDelCarrito(producto.id);
    } else if (producto.stock) {
        boton.onclick = () => agregarAlCarrito(producto.id);
    } else {
        boton.disabled = true;
    }

    card.appendChild(titulo);
    card.appendChild(imagen);
    card.appendChild(precio);
    card.appendChild(boton);

    return card;
}
