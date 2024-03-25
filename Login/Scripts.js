document.addEventListener("DOMContentLoaded", function() {
    var form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe normalmente

        // Obtiene los valores del formulario
        var usuario = document.querySelector('input[type="text"]').value;
        var contrasena = document.querySelector('input[type="password"]').value;

        // Crea un objeto con los datos del formulario
        var formData = {
            usuario: usuario,
            contrasena: contrasena
        };

        // Convierte el objeto a JSON
        var jsonData = JSON.stringify(formData);

        // Envía los datos al endpoint utilizando fetch
        fetch('tu-endpoint-aqui', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        })
        .then(response => {
            // para manejar la respuesta del servidor 
            console.log('Respuesta del servidor:', response);
        })
        .catch(error => {
            // Para manejar los errores 
            console.error('Error:', error);
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Obtener el enlace por su ID
    var crearCuentaLink = document.getElementById('crearCuentaLink');
    
    // Agregar un evento de clic al enlace
    crearCuentaLink.addEventListener('click', function(event) {
      // Prevenir el comportamiento predeterminado de navegación
      event.preventDefault();
      
      // Obtener la URL del enlace
      var url = this.getAttribute('href');
      
      // Reemplazar la ubicación de la ventana actual con la URL del enlace
      window.location.replace(url);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Obtener el enlace por su ID
    var crearCuentaLink = document.getElementById("crearCuentaLink");

    // Agregar un evento de clic al enlace
    crearCuentaLink.addEventListener("click", function(event) {
        // Prevenir el comportamiento predeterminado del enlace
        event.preventDefault();

        // Redirigir manualmente utilizando window.location.href
        window.location.href = "../Registro/Registro.html";
    });
});


