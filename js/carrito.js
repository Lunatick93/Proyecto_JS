export let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

document.addEventListener('DOMContentLoaded', () => {
    actualizarCarrito();
});

export function agregarAlCarrito(id) {
    fetch('./productos.json')
        .then(response => response.json())
        .then(data => {
            const productoAAgregar = data.find(producto => producto.id === id);
            if (productoAAgregar && productoAAgregar.stock) {
                if (!carrito.some(item => item.id === productoAAgregar.id)) {
                    carrito.push(productoAAgregar);
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                    actualizarCarrito();
                    Toastify({
                        text: `${productoAAgregar.nombre} agregado al carrito`,
                        duration: 3000,
                        close: true,
                        gravity: "bottom",
                        position: 'right',
                        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                        stopOnFocus: true,
                    }).showToast();
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error al Agregarlo",
                        text: "Este producto ya está en el carrito",
                    });
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'SIN STOCK',
                    text: 'Este producto no está disponible en este momento.',
                });
            }
        })
        .catch(error => console.error('Error al agregar al carrito:', error));
}

export function quitarDelCarrito(id) {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Se eliminara el producto de tu carrito",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminarlo",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = carrito.filter(producto => producto.id !== id);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarCarrito();
            Swal.fire({
                title: "¡Eliminado!",
                text: "Tu producto ha sido eliminado.",
                icon: "success"
            });
        }
    });
}

function actualizarCarrito() {
    const carritoContainer = document.getElementById('carrito');
    carritoContainer.innerHTML = '';

    carrito.forEach(producto => {
        const card = crearCard(producto, true);
        carritoContainer.appendChild(card);
    });
    calcularTotal();

    const finalizarCompraDiv = document.getElementById('finalizar-compra');
    const btnFinalizarCompra = document.getElementById('btn-finalizar-compra');
    if (carrito.length > 0) {
        finalizarCompraDiv.style.display = 'block';
    } else {
        finalizarCompraDiv.style.display = 'none';
    }
}


function calcularTotal() {
    const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
    const totalCompraP = document.getElementById('total-compra');
    totalCompraP.innerText = `Total a pagar: $${total}`;
}

document.getElementById('btn-finalizar-compra').addEventListener('click', () => {
    const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
    Swal.fire({
        title: "Compra Finalizada",
        html: `<p>El total que tenes que pagar es: <strong>$${total}</strong></p>`,
        icon: "success"
    });

    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
});

function crearCard(producto, enCarrito = false) {
    const card = document.createElement('div');
    card.className = 'card';

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

    const boton = document.createElement('button');
    boton.className = 'btn-add';
    if (enCarrito) {
        boton.innerText = 'Quitar del carrito';
        boton.onclick = () => quitarDelCarrito(producto.id);
    } else {
        boton.innerText = 'Agregar al carrito';
        boton.onclick = () => agregarAlCarrito(producto.id);
    }

    card.appendChild(titulo);
    card.appendChild(imagen);
    card.appendChild(precio);
    card.appendChild(boton);

    if (!producto.stock) {
        const sinStock = document.createElement('p');
        sinStock.innerText = 'Sin Stock';
        sinStock.className = 'sin-stock';
        card.appendChild(sinStock);
    }

    return card;
}
