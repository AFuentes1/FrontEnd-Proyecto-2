document.getElementById("registroForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe normalmente
    
    // Validar si se ha seleccionado algún puesto
    const puestoSeleccionado = document.querySelector('.botonPuesto.seleccionado');
    if (!puestoSeleccionado) {
        alert('Por favor, selecciona un puesto antes de continuar.');
        return; // Detener el envío del formulario si no se ha seleccionado ningún puesto
    }
    
    // Aquí puedes agregar la lógica para guardar la información 
    
    // Redirigir a una nueva página HTML
    window.location.href = "ejemplo.com";
});

document.addEventListener("DOMContentLoaded", function() {
    const botonesPuesto = document.querySelectorAll('.botonPuesto');

    botonesPuesto.forEach(boton => {
        boton.addEventListener('click', () => {
            // Desmarcar todos los botones de puesto
            botonesPuesto.forEach(boton => {
                boton.classList.remove('seleccionado');
            });

            // Marcar el botón seleccionado actual
            boton.classList.add('seleccionado');
        });
    });
});
