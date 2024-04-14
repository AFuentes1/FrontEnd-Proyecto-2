
function obtenerListaEmpleados() {
    // Simplemente hacemos una solicitud GET a la API para obtener la lista de empleados
    fetch('https://localhost:7081/Consulta') // Reemplaza la URL con la correcta
    .then(response => {
        if (response.ok) {
            console.log(response);
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
    for (let key in data[0]) {
        const th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);

    // Crear las filas de la tabla con los datos
    data.forEach(item => {
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
