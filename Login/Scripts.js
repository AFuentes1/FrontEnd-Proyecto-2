
document.addEventListener("DOMContentLoaded", function() {
    var form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe normalmente

        // Obtiene los valores del formulario
        var usuario = document.querySelector('input[type="text"]').value;
        var contrasena = document.querySelector('input[type="password"]').value;

        // Crea un objeto con los datos del formulario
        var formData = {
            UserName: usuario,
            Password: contrasena
        };

        // Convierte el objeto a JSON
        var jsonData = JSON.stringify(formData);

        // Envía los datos al endpoint utilizando fetch
        fetch('https://localhost:7081/login', { // Cambia el URL por el endpoint correcto
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        })
        .then(response => {
            if (response.ok) {
                response = response.json();
                return response; // Devuelve los datos JSON de la respuesta
                
            } else {
                throw new Error('La respuesta del servidor no es válida');
            }
        })
        .then(data => {
            // Verifica si la clave no es nula
            if (data.UserKey != null) {
                var userKey = data.UserKey;
                console.log("Key", userKey);

                window.location.href = '../Principal/Main.html'; // Reemplaza 'nuevo_html.html' con la ruta correcta
            } else {
                alert("Usuario o contraseña incorrectos");
            }
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
        window.location.href = "../Usuario/Registro/Registro.html";
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var submitButton = document.querySelector("button[type='submit']");
    var clickCount = 0;

    submitButton.addEventListener("click", function(event) {
        clickCount++;

        if (clickCount >= 5) {
            submitButton.disabled = true;
            setTimeout(function() {
                submitButton.disabled = false;
                clickCount = 0;
            }, 60000); // 60000 milliseconds = 1 minute
        }
    });
});



