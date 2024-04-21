document.getElementById("registroForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe normalmente
    
    // Obtener la dirección IP del cliente utilizando ipify.org
    fetch('http://localhost:7081/login')
        .then(response => response.json())
        .then(data => {
            // Obtener la IP del cliente
            var ip = data.ip;
            
            // Obtener los valores ingresados por el usuario
            var usuario = document.getElementById('usuario').value;
            var contraseña = document.getElementById('contraseña').value;

            // Crear un objeto con los datos del formulario y la IP del cliente
            var formData = {
                ip: ip,
                Username: usuario,
                Password: contraseña
            };

            // Convertir el objeto a JSON 
            var jsonData = JSON.stringify(formData);
            console.log(jsonData);
            // Enviar los datos al API 
            fetch('http://localhost:7081/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonData
            })
            .then(response => {
                if(response.ok) {
                    return response.json();
                }
                throw new Error('La respuesta del servidor no es válida');
            })
            .then(data => {
                // Redirigir a una nueva página HTML si el registro fue exitoso
                if (data.status == 0) {
                    window.location.href = "../Login/FrontENd.html";
                } else {
                    alert("ERROR: El Usuario ya existe");
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        })
        .catch(error => {
            console.error('Error al obtener la dirección IP:', error);
        });
});
