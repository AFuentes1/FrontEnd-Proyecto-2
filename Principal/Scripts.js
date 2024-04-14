document.addEventListener("DOMContentLoaded", function() {
    // Leer la cookie para obtener userKey
    var userKey = getCookie("userKey");
    console.log("js2", userKey);

    // Verificar si la userKey está presente
    if (!userKey) {
        // La userKey no está presente, probablemente el usuario no ha iniciado sesión
        console.log("No se encontró la userKey en la cookie");
        // Puedes redirigir al usuario a la página de inicio de sesión u otra acción adecuada aquí
        return;
    }
    var formData = {
        key: userKey
    }

    var jsonData = JSON.stringify(formData);
    // Simplemente hacemos una solicitud GET a la API para obtener la lista de empleados
    fetch('https://localhost:7081/Consulta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Incluye la userKey en el encabezado de autorización
        },
        body: jsonData // Envía la userKey al servidor
    })
    .then(response => {
        console.log(response);
        if (response.ok) {
            return response.json() // Devuelve los datos JSON de la respuesta
        } else {
            throw new Error('La respuesta del servidor no es válida');
        }
    })
    .then(data => {
        // Llamar a la función para mostrar la tabla con los datos recibidos de la API
        console.log(data);
        mostrarTabla(data);
    })
    .catch(error => {
        // Para manejar los errores 
        console.error('Error:', error);
    });
});

// Función para obtener el valor de una cookie por su nombre
function getCookie(name) {
    var cookieName = name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) == 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}

// Función para crear y mostrar la tabla dinámica con la lista de empleados
function mostrarTabla(data) {
    // Obtener el contenedor donde se mostrará la tabla
    const dataContainer = document.getElementById('dataContainer');
    
    // Crear la tabla
    const table = document.createElement('table');
    table.classList.add('tabla');

    // Crear el encabezado de la tabla
    const headerRow = document.createElement('tr');
    for (let key in data.Lista[0]) {
        const th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);

    // Crear las filas de la tabla con los datos
    data.Lista.forEach(item => {
        const row = document.createElement('tr');
        for (let key in item) {
            const cell = document.createElement('td');
            cell.textContent = item[key];
            row.appendChild(cell);
        }
        table.appendChild(row);
});

    // Limpiar el contenido previo del contenedor
    dataContainer.innerHTML = '';

    // Agregar la tabla al contenedor
    dataContainer.appendChild(table);
}
