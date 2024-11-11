document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a.interesado');
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const productoNombre = this.getAttribute('data-nombre');
            const imagenProducto = this.getAttribute('data-img');
            const precioProducto = this.previousElementSibling.textContent.trim(); // Obtener el texto del precio
            const descripcionProducto = this.previousElementSibling.previousElementSibling.textContent.trim(); // Obtener la descripción del producto

            const mensaje = `Hola, acabo de ver este producto en el sitio web y me interesa saber más sobre él:\n\n${productoNombre}\n\nDescripción: ${descripcionProducto}\n\nPrecio: ${precioProducto}`;

            // Formar el mensaje de WhatsApp con un enlace válido a la imagen del producto
            const mensajeConImagen = `${mensaje}\n\n[Ver imagen del producto](${window.location.origin}/${imagenProducto})`;

            const numeroWhatsApp = '593979587732'; // Número de WhatsApp del vendedor
            const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajeConImagen)}`;

            // Abrir la ventana de chat de WhatsApp con el mensaje que incluye el enlace de la imagen
            window.open(url);
        });
    });
});
