document.addEventListener("DOMContentLoaded", function() {
    // Leer la cookie para obtener userKey
    var userKey = getCookie("userKey");

    // Verificar si la userKey está presente
    if (!userKey) {
        // La userKey no está presente, probablemente el usuario no ha iniciado sesión
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

    cerrarModal('modalInsertarEmpleado'); // Reemplaza 'modalInsertarEmpleado' con el ID de tu modal

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

    // Obtener la userKey
    var userKey = getCookie("userKey");
    if (!userKey) {
        console.log("No se encontró la userKey en la cookie");
        return;
    }

    // Obtener referencias a los elementos del formulario
    var documentoIdentidadSelect = document.getElementById('documentoIdentidad');
    var nombreSelect = document.getElementById('nombre');
    var nombrePuestoSelect = document.getElementById('idPuesto');
    var botonSelect = document.getElementById('botonInsertar');
    
    // Cambio en el tipo del botón de inserción
    botonSelect.type = 'button'; // Cambio del tipo a 'button'

    // Agregar evento de clic al botón de inserción dentro del modal
    botonSelect.addEventListener('click', function(event) {
        // Evitar que el evento se propague al modal y lo cierre
        event.stopPropagation();

        // Obtener el valor de idPuesto
        var nombrePuesto = nombrePuestoSelect.value.toString();
        var documentoIdentidad = documentoIdentidadSelect.value;
        var nombre = nombreSelect.value;

        if (nombrePuesto && documentoIdentidad && nombre) {
            // Crear objeto de datos a enviar al servidor
            var formData = {
                key: userKey,
                docID: documentoIdentidad,
                nombre: nombre,
                nombrePuesto: nombrePuesto
            };

            var jsonData = JSON.stringify(formData);

            // Enviar solicitud al API
            fetch('https://localhost:7081/Insertar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Incluye la userKey en el encabezado de autorización
                },
                body: jsonData // Envía la userKey, filtro y consulta al servidor
            })
            .then(response => {
                if (response.ok) {
                    return response.json(); // Devuelve los datos JSON de la respuesta
                } else {
                    throw new Error('La respuesta del servidor no es válida');
                }
            })
            .then(data => {
              
            // Llamar a la función para mostrar la tabla con los datos recibidos de la API
            //mostrarTabla(data);
            // Cerrar el modal después de insertar los datos
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
                mostrarTabla(data);
            })
            .catch(error => {
                // Para manejar los errores 
                console.error('Error:', error);
            });
                cerrarModal('modalInsertarEmpleado');
                    

            });
        }
    });
});


//MODAL BORRAR
// Función para abrir el modal y mostrar los datos
var datosObtenidos;
function mostrarModalConDatosBorrar() {
    // Abrir el modal de confirmación
    mostrarModal('modalConfirmacionBorrarEmpleado');

    // Mostrar los datos en el modal
    var persona = datosObtenidos.Persona;
    var datosPersonaDiv = document.getElementById('datosPersona');
    datosPersonaDiv.innerHTML = `
        <p>Nombre: ${persona.nombre}</p>
        <p>Documento de identidad: ${persona.documentoIdentidad}</p>
        <p>Fecha de contratación: ${persona.fechaContratacion}</p>
        <p>Saldo de vacaciones: ${persona.saldoVacaciones}</p>

        <!-- Agregar más campos si es necesario -->
    `;
}

var datosObtenidosActualizar;
function mostrarModalConDatosActualizar() {
    // Abrir el modal de confirmación
    mostrarModal('modalConfirmacionActualizarEmpleado');

    // Mostrar los datos en el modal
   
    var persona = datosObtenidosActualizar.Persona;
    console.log(persona);
    document.getElementById('documentoIdentidadActualizar2').value = persona.documentoIdentidad;
    document.getElementById('nombreActualizar').value = persona.nombre;
    document.getElementById('nombrePuestoActualizar').value = persona.nombrePuesto
    document.getElementById('fechaDeContratacionActualizar').value = persona.fechaContratacion;
    document.getElementById('saldoVacacionesActualizar').value = persona.saldoVacaciones;

    var datosPersonaDiv = document.getElementById('datosPersona');
    datosPersonaDiv.innerHTML = `
        <p>Nombre: ${persona.nombre}</p>
        <p>Documento de identidad: ${persona.documentoIdentidad}</p>
        <p>Fecha de contratación: ${persona.fechaContratacion}</p>
        <p>Saldo de vacaciones: ${persona.saldoVacaciones}</p>

        <!-- Agregar más campos si es necesario -->
    `;
}



document.getElementById('openModalLinkBorrarEmpleado').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
    mostrarModal('modalBorrarEmpleado'); 

    // Obtener la userKey
    var userKey = getCookie("userKey");
    if (!userKey) {
        console.log("No se encontró la userKey en la cookie");
        return;
    }

    // Obtener referencias a los elementos del formulario
    var documentoIdentidadSelect = document.getElementById('documentoIdentidadBorrar');
    var botonSelect = document.getElementById('botonSiguiente');

    botonSelect.type = 'button'; // Cambio del tipo a 'button'

    botonSelect.addEventListener('click', function(event) {
        event.stopPropagation()

        var documentoIdentidad = documentoIdentidadSelect.value;
        
        if (documentoIdentidad){
            var formData = {
                key: userKey,
                docID: documentoIdentidad
            };

            var jsonData = JSON.stringify(formData);

            //Se envia al API
            fetch('https://localhost:7081/Delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Incluye la userKey en el encabezado de autorización
                },
                body: jsonData // Envía la userKey, filtro y consulta al servidor
            })
            .then(response => {
                if (response.ok) {
                    return response.json(); // Devuelve los datos JSON de la respuesta
                } else {
                    throw new Error('La respuesta del servidor no es válida');
                }
            })
            
            .then(data => {
                // Asignar los datos obtenidos a la variable
                console.log(data.Status)
                if (data.Status === 0){
                    datosObtenidos = data;
                    mostrarModalConDatosBorrar(); 
                    
                } else{
                    alert("No se encontró el empleado con el documento de identidad ingresado")
                }
                               
            })
            .catch(error => {
                // Para manejar los errores 
                console.error('Error:', error);
            });
              
        }
        
        
    });
   
});

document.getElementById('confirmarBorrado').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
    var userKey = getCookie("userKey");
    if (!userKey) {
        console.log("No se encontró la userKey en la cookie");
        return;
    }
    var documentoIdentidadBorrar = datosObtenidos.Persona.documentoIdentidad;
    var formData = {
        key: userKey,
        docID: documentoIdentidadBorrar
    };
    
    var jsonData = JSON.stringify(formData);

    //Se envia al API
    fetch('https://localhost:7081/Delete/Confirm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Incluye la userKey en el encabezado de autorización
        },
        body: jsonData // Envía la userKey, filtro y consulta al servidor
    })

    .then(response => {
        if (response.ok) {
            return response.json(); // Devuelve los datos JSON de la respuesta
        } else {
            throw new Error('La respuesta del servidor no es válida');
        }
    })

    .then(data => {
        // Llamar a la función para mostrar la tabla con los datos recibidos de la API
        //mostrarTabla(data);
        // Cerrar el modal después de insertar los datos
        return fetch('https://localhost:7081/Consulta', { // Aquí necesitas un return
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Incluye la userKey en el encabezado de autorización
            },
            body: jsonData // Envía la userKey, filtro y consulta al servidor
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // Devuelve los datos JSON de la respuesta
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
    })
    .catch(error => {
        // Para manejar los errores 
        console.error('Error:', error);
    });
    cerrarModal('modalConfirmacionBorrarEmpleado');
});


//MODAL ACTUALIZAR Empleados
document.getElementById('openModalLinkActualizarEmpleados').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
    mostrarModal('modalActualizarEmpleado');
    //obtener la userKey
    var userKey = getCookie("userKey");
    if (!userKey) {
        console.log("No se encontró la userKey en la cookie");
        return;
    }

    // Obtener referencias a los elementos del formulario
    var documentoIdentidadSelect = document.getElementById('documentoIdentidadActualizar1');
    var botonSelect = document.getElementById('botonSiguienteActualizar');

    botonSelect.type = 'button'; // Cambio del tipo a 'button'

    botonSelect.addEventListener('click', function(event) {
        event.stopPropagation()

        var documentoIdentidad = documentoIdentidadSelect.value;

        if (documentoIdentidad){
            var formData = {
                key: userKey,
                docID: documentoIdentidad
            };

            var jsonData = JSON.stringify(formData);

            //Se envia al API
            fetch('https://localhost:7081/Update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Incluye la userKey en el encabezado de autorización
                },
                body: jsonData // Envía la userKey, filtro y consulta al servidor
            })
            .then(response => {
                if (response.ok) {
                    return response.json(); // Devuelve los datos JSON de la respuesta
                } else {
                    throw new Error('La respuesta del servidor no es válida');
                }
            })
            
            .then(data => {
                // Asignar los datos obtenidos a la variable
                if (data.Status === 0){
                    datosObtenidosActualizar = data;
                    mostrarModalConDatosActualizar(); 
                    
                } else{
                    alert("No se encontró el empleado con el documento de identidad ingresado")
                }
                               
            })
            .catch(error => {
                // Para manejar los errores 
                console.error('Error:', error);
            });
              
        }
    });
});

document.getElementById('botonConfirmarActualizar').addEventListener('click', function(event) {
    event.preventDefault();

    var userKey = getCookie("userKey");
    if (!userKey) {
        console.log("No se encontró la userKey en la cookie");
        return;
    }

    var documentoIdentidadActualizar1 = datosObtenidosActualizar.Persona.documentoIdentidad;
    var formData = {
        key: userKey,
        docID: documentoIdentidadActualizar1
    };
    var jsonData = JSON.stringify(formData);

    //Se envia al API
    fetch('https://localhost:7081/Update/Confirm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Incluye la userKey en el encabezado de autorización
        },
        body: jsonData // Envía la userKey, filtro y consulta al servidor
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Devuelve los datos JSON de la respuesta
        } else {
            throw new Error('La respuesta del servidor no es válida');
        }
    })
    .then(data => {
        // Llamar a la función para mostrar la tabla con los datos recibidos de la API
        //mostrarTabla(data);
        // Cerrar el modal después de insertar los datos
        return fetch('https://localhost:7081/Consulta', { // Aquí necesitas un return
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Incluye la userKey en el encabezado de autorización
            },
            body: jsonData // Envía la userKey, filtro y consulta al servidor
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // Devuelve los datos JSON de la respuesta
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
    })
    .catch(error => {
        // Para manejar los errores 
        console.error('Error:', error);
    });
    cerrarModal('modalConfirmacionActualizarEmpleado');
});



document.getElementById('openModalLinkMovimientos').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
    mostrarModal('modalMovimientos');
});



