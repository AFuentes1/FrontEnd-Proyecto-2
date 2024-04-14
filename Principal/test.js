fetch('https://localhost:7081/Consulta', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json' // Incluye la userKey en el encabezado de autorización
        },
        body: { "Key": "6B7899D4D02D7649661985C2AF2641529E4AA6B1F427686B97053A8E01B81635"} // Envía la userKey al servidor
    })
    .then(response => {
        console.log(response);
        if (response.ok) {
            console.log(response);
            return response.json(); // Devuelve los datos JSON de la respuesta
        } else {
            throw new Error('La respuesta del servidor no es válida');
        }
    })