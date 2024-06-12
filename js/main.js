// Definición de la clase CARD
class CARD {
    constructor(imagen, titulo, descripcion, precio) {
        this.imagen = imagen;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.precio = precio;
        this.cantidad = 1;
    }

    calcularPrecioTotal() {
        return this.cantidad * this.precio;
    }
}

// Array de instancias de CARD
const CARD_LIST = [
    new CARD("img/unnamed.png", "Producto 1", "Descripción del Producto 1", 1),
    new CARD("img/unnamed.png", "Producto 2", "Descripción del Producto 2", 2),
    new CARD("img/unnamed.png", "Producto 3", "Descripción del Producto 3", 3),
    new CARD("img/unnamed.png", "Producto 4", "Descripción del Producto 4", 4)
];

// Elemento contenedor
const CONTENEDOR_CARDS = document.getElementById('card-container');

// Función para generar las tarjetas
function generarCards(CARDs) {
    CARDs.forEach(CARD => {
        const CARD_ELEMENT = document.createElement("div");
        CARD_ELEMENT.classList.add("card");

        CARD_ELEMENT.innerHTML = `
            <img src="${CARD.imagen}" alt="Imagen del CARD" class="card-img">
            <div class="card-content">
                <h2 class="card-title">${CARD.titulo}</h2>
                <p class="card-description">${CARD.descripcion}</p>
                <div class="card-price price">$${CARD.precio}</div>
                <div class="card-buttons">
                    <button class="buy-button">Comprar</button>
                    <div class="quantity-controls">
                        <button class="quantity-button minus">-</button>
                        <span class="quantity-indicator">${CARD.cantidad}</span>
                        <button class="quantity-button plus">+</button>
                    </div>
                </div>
            </div>
        `;

        // Función para manejar el click en el botón "-"
        CARD_ELEMENT.querySelector('.minus').addEventListener('click', () => {
            if (CARD.cantidad > 1) {
                CARD.cantidad--;
                actualizarTarjeta(CARD, CARD_ELEMENT);
            }
        });

        // Función para manejar el click en el botón "+"
        CARD_ELEMENT.querySelector('.plus').addEventListener('click', () => {
            CARD.cantidad++;
            actualizarTarjeta(CARD, CARD_ELEMENT);
        });

        // Función para manejar el click en el botón "Comprar"
        CARD_ELEMENT.querySelector('.buy-button').addEventListener('click', () => {
            agregarAlCarrito(CARD);
        });

        CONTENEDOR_CARDS.appendChild(CARD_ELEMENT);
    });
}

// Función para actualizar la tarjeta con el precio actualizado
function actualizarTarjeta(CARD, CARD_ELEMENT) {
    CARD_ELEMENT.querySelector('.quantity-indicator').textContent = CARD.cantidad;

    const precioTotal = CARD.calcularPrecioTotal();
    CARD_ELEMENT.querySelector('.card-price').textContent = `$${precioTotal}`;
}

// Función para agregar productos al carrito
function agregarAlCarrito(CARD) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let productoExistente = carrito.find(item => item.titulo === CARD.titulo);

    if (productoExistente) {
        productoExistente.cantidad += CARD.cantidad;
        productoExistente.precioTotal = productoExistente.cantidad * CARD.precio; 
    } else {
        carrito.push({...CARD, precioTotal: CARD.cantidad * CARD.precio});
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
}



// Generar las tarjetas
generarCards(CARD_LIST);
