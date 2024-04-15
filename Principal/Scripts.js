document.addEventListener("DOMContentLoaded", function() {
    // Leer la cookie para obtener userKey
    var userKey = getCookie("userKey");

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

//BOTON Consulta
document.addEventListener("DOMContentLoaded", function() {
    // Leer la cookie para obtener userKey
    var userKey = getCookie("userKey");
    // Verificar si la userKey está presente
    if (!userKey) {
        // La userKey no está presente, probablemente el usuario no ha iniciado sesión
        console.log("No se encontró la userKey en la cookie");
        // Puedes redirigir al usuario a la página de inicio de sesión u otra acción adecuada aquí
        return;
    }

    // Obtener referencia a los elementos HTML
    var filtroSelect = document.getElementById('filtroSelect');
    var consultaInput = document.getElementById('consultaInput');
    var consultaButton = document.getElementById('consultaButton');

    // Asignar evento de clic al botón de consulta
    consultaButton.addEventListener('click', function() {
        // Obtener el valor del campo de texto y del filtro seleccionado
        var filtro = filtroSelect.value; // Obtener el valor seleccionado en la lista desplegable
        var consulta = consultaInput.value;

        // Verificar que ambos valores no estén vacíos antes de realizar la consulta
        if (filtro || consulta) {
            if (consulta.length = 0){
                var formData = {
                    key: userKey
                };
            }
            // Agregar la variable correspondiente según el filtro seleccionado
            else if (filtro === "nombre") {
                // Crear objeto de datos a enviar al servidor
                var formData = {
                    key: userKey,
                    byName: consulta // Agregar la consulta al objeto de datos
                };
            } else if (filtro === "identificacion") {
                var formData = {
                    key: userKey,
                    byDocID: consulta // Agregar la consulta al objeto de datos
                }; 
            }else {
                var formData = {
                    key: userKey,
                };
            }

            var jsonData = JSON.stringify(formData);
            console.log(jsonData);
            // Enviar solicitud al API
            fetch('https://localhost:7081/Consulta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Incluye la userKey en el encabezado de autorización
                },
                body: jsonData // Envía la userKey, filtro y consulta al servidor
            })
            .then(response => {
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
        } 
    });
});

//Modales 
// Función para mostrar el modal
function mostrarModal(idModal) {
    // Cerrar todos los modales abiertos
    cerrarTodosModales();
    // Agregar clase 'active' al modal
    document.getElementById(idModal).classList.add('active');
    // Agregar clase 'modal-open' al body
    document.body.classList.add('modal-open');
    // Deshabilitar todos los enlaces
    deshabilitarEnlaces(true);
}

// Función para cerrar todos los modales
function cerrarTodosModales() {
    var modales = document.querySelectorAll('.modal.active');
    modales.forEach(function(modal) {
        modal.classList.remove('active');
    });
    // Quitar clase 'modal-open' del body
    document.body.classList.remove('modal-open');
    // Habilitar todos los enlaces
    deshabilitarEnlaces(false);
}
// Función para habilitar o deshabilitar todos los enlaces
function deshabilitarEnlaces(deshabilitar) {
    var enlaces = document.querySelectorAll('nav a');
    enlaces.forEach(function(enlace) {
        enlace.disabled = deshabilitar;
    });
}
// Función para cerrar el modal
function cerrarModal(idModal) {
    // Quitar clase 'active' al modal
    document.getElementById(idModal).classList.remove('active');
    // Quitar clase 'modal-open' del body solo si no hay otros modales abiertos
    if (!document.querySelector('.modal.active')) {
        document.body.classList.remove('modal-open');
    }
}

// Obtener elementos de los botones de cierre en los modales
var closeModalButtons = document.querySelectorAll('.close');

// Asignar eventos de clic a los botones de cierre en los modales
closeModalButtons.forEach(function(button) {
    button.addEventListener('click', function(event) {
        event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
        var modal = this.closest('.modal');
        var modalId = modal.getAttribute('id');
        cerrarModal(modalId);
    });
});

// Asignar eventos de clic a los enlaces para abrir los modales
document.getElementById('openModalLinkInsertarEmpleado').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
    mostrarModal('modalInsertarEmpleado');
});

document.getElementById('openModalLinkBorrarEmpleado').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
    mostrarModal('modalBorrarEmpleado'); 
});

document.getElementById('openModalLinkActualizarEmpleados').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
    mostrarModal('modalActualizarEmpleados');
});

document.getElementById('openModalLinkMovimientos').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
    mostrarModal('modalMovimientos');
});



