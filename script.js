


let cart = [];
let total = 0;

document.addEventListener('DOMContentLoaded', function() {
    // Recuperar carrito del localStorage si existe
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        total = cart.reduce((acc, item) => acc + item.precio, 0);
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) cartCountElement.textContent = cart.length;
    }
    const cartLink = document.getElementById('cart-link');

    // Manejo de añadir al carrito
const addToCartButtons = document.querySelectorAll('button.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const nombre = this.getAttribute('data-nombre');
        const precio = parseFloat(this.getAttribute('data-precio'));
        const img = this.getAttribute('data-img');
        
        // Añadir producto al carrito
        cart.push({ nombre, precio, img });
        total += precio;
        
        // Guardar en localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Actualizar contador del carrito
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) cartCountElement.textContent = cart.length;

        // Mostrar SweetAlert
        Swal.fire({
            icon: 'success',  // Icono que indica que la acción fue exitosa
            title: `${nombre} ha sido añadido al carrito`,  // Título del mensaje
            text: `Total hasta ahora: $${total.toFixed(2)}`,  // Texto adicional con el total
            confirmButtonText: 'Aceptar',  // Botón para cerrar la alerta
            showConfirmButton: true,  // Mostrar el botón de confirmación
            timer: 3000  // Opcional: tiempo para que la alerta desaparezca automáticamente después de 3 segundos
        });
    });
});

    // Redirección al carrito
    if (cartLink) {
        cartLink.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = 'carrito.html';
        });
    }

    // Verificar si estamos en carrito.html para mostrar los productos
    if (window.location.pathname.includes('carrito.html')) {
        const cartItemsContainer = document.getElementById('order-cart-items');
        const cartTotalElement = document.getElementById('cart-total');
        const checkoutButton = document.getElementById('checkout');

        // Función para mostrar los productos en la tabla
        function renderCart() {
            cartItemsContainer.innerHTML = ''; // Limpiar contenido previo
            total = 0;

            // Agregar cada producto del carrito a la tabla
            cart.forEach((item, index) => {
                const row = document.createElement('tr');
                // Columna nombre del producto
                const nameCell = document.createElement('td');
                nameCell.textContent = item.nombre;
                row.appendChild(nameCell);
                // Columna precio del producto
                const priceCell = document.createElement('td');
                priceCell.textContent = `$${item.precio.toFixed(2)}`;
                row.appendChild(priceCell);
                // Columna de acciones
                const actionsCell = document.createElement('td');
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Eliminar';
                deleteButton.className = 'btn btn-danger btn-sm';
                deleteButton.addEventListener('click', function() {
                    // Eliminar el producto del carrito
                    cart.splice(index, 1);
                    // Actualizar el localStorage
                    localStorage.setItem('cart', JSON.stringify(cart));
                    // Actualizar contador del carrito
                    const cartCountElement = document.getElementById('cart-count');
                    if (cartCountElement) cartCountElement.textContent = cart.length;
                    // Volver a renderizar el carrito
                    renderCart();
                });
                actionsCell.appendChild(deleteButton);
                row.appendChild(actionsCell);
                // Añadir fila a la tabla
                cartItemsContainer.appendChild(row);
                // Calcular el total
                total += item.precio;
            });

            // Actualizar total en la tabla
            if (cartTotalElement) cartTotalElement.textContent = `$${total.toFixed(2)}`;
        }

        // Renderizar el carrito al cargar la página carrito.html
        renderCart();

        // Manejo del botón "Proceder a Comprar"
        if (checkoutButton) {
            checkoutButton.addEventListener('click', () => {
                if (cart.length === 0) {
                    alert('El carrito está vacío.');
                    return;
                }
                let mensaje = 'Hola, estoy interesado en comprar los siguientes productos:\n\n';
                cart.forEach(item => {
                    mensaje += `${item.nombre} - $${item.precio.toFixed(2)}\n`;
                });
                mensaje += `\nTotal: $${total.toFixed(2)}`;
                const numeroWhatsApp = '593979587732';
                const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
                window.open(url);
            });
        }
    }
});
