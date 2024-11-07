// Inicializar el carrito
let cart = [];

// Agregar producto al carrito
function agregarAlCarrito(producto) {
    cart.push(producto);
    document.getElementById('cart-count').innerText = cart.length;
    actualizarCarrito();
}

// Actualizar la vista del carrito
function actualizarCarrito() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = ''; // Limpiar la lista actual
    cart.forEach(producto => {
        const li = document.createElement('li');
        li.innerText = producto;
        li.innerHTML += `<button class="eliminar" onclick="eliminarDelCarrito('${producto}')">Eliminar</button>`;
        cartList.appendChild(li);
    });
    
    // Habilitar o deshabilitar el botón de preguntar precio
    const preguntarPrecioBtn = document.getElementById('preguntar-precio');
    preguntarPrecioBtn.disabled = cart.length === 0; // Deshabilitar si el carrito está vacío
}

// Eliminar producto del carrito
function eliminarDelCarrito(producto) {
    cart = cart.filter(item => item !== producto);
    document.getElementById('cart-count').innerText = cart.length;
    actualizarCarrito();
}

// Mostrar/ocultar el carrito flotante con animaciones
document.getElementById('toggle-cart').addEventListener('click', function() {
    const cartDropdown = document.getElementById('cart-dropdown');
    if (cartDropdown.classList.contains('visible')) {
        cartDropdown.classList.remove('visible'); // Ocultar
        setTimeout(() => {
            cartDropdown.style.display = 'none'; // Establecer display:none después de la animación
        }, 300); // Tiempo de la animación
    } else {
        cartDropdown.style.display = 'block'; // Mostrar
        setTimeout(() => {
            cartDropdown.classList.add('visible'); // Agregar clase para animación
        }, 10); // Breve retardo para asegurar que se aplique el display:block
    }
});

// Consultar precio
document.getElementById('preguntar-precio').addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Debes agregar al menos un producto al carrito para consultar el precio.');
        return; // Detiene la ejecución si el carrito está vacío
    }
    
    // Eliminar duplicados
    const productosUnicos = [...new Set(cart)];
    
    // Crear el mensaje
    const mensaje = `Hola, estoy interesado en los siguientes productos:\n${productosUnicos.join('\n')}`;
    const numeroWhatsApp = '+541134081555'; // Número de WhatsApp
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp);
});
