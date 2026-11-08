

// ==========================================
// PROYECTO: CHOCO AMORE
// ETAPA 3: CARRITO DE COMPRAS
// ==========================================


// 1. BASE DE DATOS DE PRODUCTOS

const productos = [
    {
        id: 1,
        nombre: "Chocoteja Clásica",
        descripcion: "Manjar blanco y pecanas",
        precio: 3.00,
        imagen: "img/clasica.jpeg"
    },

    {
        id: 2,
        nombre: "Chocoteja de Coco",
        descripcion: "Coco y manjar blanco",
        precio: 3.50,
        imagen: "img/coco.jpeg"
    },

    {
        id: 3,
        nombre: "Chocoteja Especial",
        descripcion: "Relleno especial de la casa",
        precio: 4.00,
        imagen: "img/especial.jpeg"
    },

    {
        id: 4,
        nombre: "Chocoteja de Coco",
        descripcion: "Coco y manjar blanco",
        precio: 3.50,
        imagen: "img/coco.jpeg"
    },

    {
        id: 5,
        nombre: "Chocoteja Especial",
        descripcion: "Relleno especial de la casa",
        precio: 4.00,
        imagen: "img/especial.jpeg"
    },

    {
        id: 6,
        nombre: "Caja de Regalo",
        descripcion: "Presentación especial",
        precio: 20.00,
        imagen: "img/cajas.jpeg"
    }
];


// 2. INICIALIZAR EL CARRITO
let carrito = [];

// NÚMERO DE WHATSAPP DEL NEGOCIO
const telefonoWhatsApp = "51935277335";

// 3. SELECCIONAR ELEMENTOS HTML

const catalogo = document.getElementById("catalogo");

const listaCarrito = document.getElementById("listaCarrito");

const contadorCarrito = document.getElementById("contadorCarrito");

const cantidadTotal = document.getElementById("cantidadTotal");

const totalCarrito = document.getElementById("totalCarrito");


// 4. MOSTRAR LOS PRODUCTOS

function mostrarProductos() {

    catalogo.innerHTML = "";

    productos.forEach(producto => {

        const tarjeta = document.createElement("article");

        tarjeta.classList.add("producto");

        tarjeta.innerHTML = `
            <img src="${producto.imagen}"
                 alt="${producto.nombre}">

            <h3>${producto.nombre}</h3>

            <p>${producto.descripcion}</p>

            <strong>
                S/ ${producto.precio.toFixed(2)}
            </strong>

            <button type="button"
                onclick="agregarAlCarrito(${producto.id})">

                Agregar al carrito

            </button>
        `;

        catalogo.appendChild(tarjeta);

    });

}


// 5. AGREGAR PRODUCTOS AL CARRITO

function agregarAlCarrito(id) {

    const producto = productos.find(p => p.id === id);

    const productoExistente = carrito.find(p => p.id === id);

    if (productoExistente) {

        productoExistente.cantidad++;

    } else {

        carrito.push({
            ...producto,
            cantidad: 1
        });

    }

    actualizarCarrito();

}


// 6. AUMENTAR O DISMINUIR CANTIDADES

function modificarCantidad(id, cambio) {

    const producto = carrito.find(p => p.id === id);

    if (!producto) return;

    producto.cantidad += cambio;

    if (producto.cantidad <= 0) {

        eliminarProducto(id);

    } else {

        actualizarCarrito();

    }

}


// 7. ELIMINAR PRODUCTOS

function eliminarProducto(id) {

    carrito = carrito.filter(p => p.id !== id);

    actualizarCarrito();

}


// 8. MOSTRAR EL CARRITO

function mostrarCarrito() {

    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {

        listaCarrito.innerHTML =
            "<p>Tu carrito está vacío.</p>";

        return;

    }

    carrito.forEach(producto => {

        const subtotal = producto.precio * producto.cantidad;

        const elemento = document.createElement("div");

        elemento.classList.add("producto-carrito");

        elemento.innerHTML = `

            <div>
                <h3>${producto.nombre}</h3>

                <p>
                    Precio: S/ ${producto.precio.toFixed(2)}
                </p>

                <p>
                    Subtotal: S/ ${subtotal.toFixed(2)}
                </p>
            </div>

            <div class="controles-cantidad">

                <button onclick="modificarCantidad(${producto.id}, -1)">
                    −
                </button>

                <span>${producto.cantidad}</span>

                <button onclick="modificarCantidad(${producto.id}, 1)">
                    +
                </button>

                <button onclick="eliminarProducto(${producto.id})">
                    Eliminar
                </button>

            </div>

        `;

        listaCarrito.appendChild(elemento);

    });

}


// 9. CALCULAR TOTAL DE LA COMPRA

function calcularTotal() {

    return carrito.reduce((total, producto) => {

        return total + producto.precio * producto.cantidad;

    }, 0);

}


// 10. ACTUALIZAR INFORMACION DEL CARRITO

function actualizarCarrito() {

    mostrarCarrito();

    const unidades = carrito.reduce(
        (total, producto) => total + producto.cantidad,
        0
    );

    contadorCarrito.textContent = unidades;

    cantidadTotal.textContent = unidades;

    totalCarrito.textContent =
        calcularTotal().toFixed(2);

}


// 11. VACIAR EL CARRITO

document.getElementById("vaciarCarrito")
    .addEventListener("click", function() {

       
        actualizarCarrito();

    });


// 12. ABRIR LA SECCION DEL CARRITO

document.getElementById("abrirCarrito")
    .addEventListener("click", function() {

        document.getElementById("carrito")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

// 12.1 GENERAR PEDIDO Y ENVIARLO POR WHATSAPP
function finalizarPedido() {

    // Verificar que el carrito no esté vacío
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de realizar el pedido.");
        return;
    }

    // Crear el mensaje inicial
    let mensaje = "¡Hola! Quiero realizar un pedido en Choco Amore 🍫\n\n";

    mensaje += "*DETALLE DEL PEDIDO*\n";
    mensaje += "--------------------------\n";

    // Agregar cada producto al mensaje
    carrito.forEach(producto => {

        const subtotal = producto.precio * producto.cantidad;

        mensaje += `Producto: ${producto.nombre}\n`;
        mensaje += `Cantidad: ${producto.cantidad}\n`;
        mensaje += `Precio unitario: S/ ${producto.precio.toFixed(2)}\n`;
        mensaje += `Subtotal: S/ ${subtotal.toFixed(2)}\n`;
        mensaje += "--------------------------\n";

    });

    // Agregar el resumen de compra
    const unidades = carrito.reduce(
        (total, producto) => total + producto.cantidad,
        0
    );

    mensaje += `Cantidad total de unidades: ${unidades}\n`;
    mensaje += `*TOTAL A PAGAR: S/ ${calcularTotal().toFixed(2)}*\n\n`;

    mensaje += "Quedo atento(a) a la confirmación de mi pedido. ¡Gracias!";

    // Codificar el mensaje para utilizarlo en la URL
    const mensajeCodificado = encodeURIComponent(mensaje);

    // Crear el enlace de WhatsApp
    const enlaceWhatsApp =
        `https://wa.me/${telefonoWhatsApp}?text=${mensajeCodificado}`;

    // Abrir WhatsApp en una nueva pestaña
    window.open(enlaceWhatsApp, "_blank");
}
// 12.2 ACTIVAR EL BOTÓN FINALIZAR PEDIDO
document.getElementById("finalizarPedido")
    .addEventListener("click", finalizarPedido);
// 13. INICIAR LA TIENDA

mostrarProductos();

actualizarCarrito();
