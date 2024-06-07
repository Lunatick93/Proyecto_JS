export let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

document.addEventListener('DOMContentLoaded', () => {
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
                    actualizarCarrito();
                    Toastify({
                        text: `${productoAAgregar.nombre} agregado al carrito`,
                        duration: 3000,
                        newWindow: true,
                        close: true,
                        gravity: "bottom", // `top` or `bottom`
                        position: 'right', // `left`, `center` or `right`
                        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                    }).showToast();
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error al Agregarlo",
                        text: "Este producto ya está en el carrito",
                        footer: '<a href="#">Why do I have this issue?</a>'
});
                    
                }
            } else {
                alert('Este producto no está disponible');
            }
        })
        .catch(error => console.error('Error al agregar al carrito:', error));
}

export function quitarDelCarrito(id) {
    // Mostrar el SweetAlert de confirmación
    Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esto.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminarlo",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            // Eliminar el producto del carrito
            carrito = carrito.filter(producto => producto.id !== id);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarCarrito();

            // Mostrar SweetAlert de éxito
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
    if (carritoDiv.style.display === 'none' || carritoDiv.style.display === '') {
        carritoDiv.style.display = 'block';
        btnCarrito.innerText = 'Ocultar Carrito';
    } else {
        carritoDiv.style.display = 'none';
        btnCarrito.innerText = 'Ver Carrito';
    }
});

document.getElementById('btn-finalizar-compra').addEventListener('click', () => {
    const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
    Swal.fire({
        title: "Finalizar Compra",
        text: `El total que tenes que pagar es : $${total}`,
        icon: "success"
                });
    
    
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
});

function crearCard(producto, enCarrito = false) {
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