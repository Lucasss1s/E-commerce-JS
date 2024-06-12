// Función para cargar el carrito desde localStorage
function cargarCarrito() {
    const CONTENEDOR_CARRITO = document.getElementById('cart-container');
    CONTENEDOR_CARRITO.innerHTML = ''; // Limpiar el contenedor antes de recargarlo
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    carrito.forEach(producto => {
        const CARD_ELEMENT = document.createElement("div");
        CARD_ELEMENT.classList.add("cart-card");

        CARD_ELEMENT.innerHTML = `
            <img src="${producto.imagen}" alt="Imagen del producto" class="cart-card-img">
            <div class="cart-card-content">
                <h2 class="cart-card-title">${producto.titulo}</h2>
                <p class="cart-card-description">${producto.descripcion}</p>
                <div class="cart-card-price">Precio: $${producto.precioTotal}</div>
                <div class="cart-card-quantity">Cantidad: ${producto.cantidad}</div>
            </div>
        `;

        CONTENEDOR_CARRITO.appendChild(CARD_ELEMENT);
    });
}

// Función vaciar carrito
const VACIAR_CARRITO = document.getElementById('carrito-empty').addEventListener('click', () => {
    localStorage.removeItem('carrito');
    cargarCarrito();
});

cargarCarrito();
