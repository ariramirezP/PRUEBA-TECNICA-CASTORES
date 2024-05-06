function actualizarTablaProductos() {
    let URL = "http://localhost:8080/ControlDeInventariosEnAlmacen/api/funcion/getAllHistoricos"; 
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            // Limpia el cuerpo de la tabla
            let tableBody = $('#ticketsBody');
            tableBody.empty();

            // Itera sobre los datos y agrega filas a la tabla
            data.forEach(historicos => {
                let row = `<tr>
                    <td>${historicos.fechaEntrada}</td>
                    <td>${historicos.usuarios.nombre}</td>
                          </tr>`;
                tableBody.append(row);
            });
        })
        .catch(error => {
            console.log('Error al obtener los productos', error);
        });
}

function agregarFilaATabla(historicos) {
    let newRow = `<tr>
        <td>${historicos.fechaEntrada}</td>
        <td>${historicos.usuarios.nombre}</td>
    </tr>`;
    $('#ticketsBody').append(newRow);
}

document.addEventListener('DOMContentLoaded', function () {
    // Cuando la página esté lista, realiza la solicitud fetch
    let URL ="http://localhost:8080/ControlDeInventariosEnAlmacen/api/funcion/getAllHistoricos"; 
    
    fetch(URL)
            .then(response => response.json())
            .then(data => {
                console.log("Datos:"+ data);
                // Limpia el cuerpo de la tabla
                let tableBody = $('#ticketsBody');
                tableBody.empty();

                // Itera sobre los datos y agrega filas a la tabla
                data.forEach(historicos => {
                    let row = `<tr>
                    <td>${historicos.fechaEntrada}</td>
                    <td>${historicos.usuarios.nombre}</td>
                </tr>`;
                    tableBody.append(row);
                });

                // Agrega un evento de clic a las filas de la tabla
                $('#ticketsBody').on('click', 'tr', function () {
                    let selectedRow = $(this).closest('tr');
                    let rowData = selectedRow.find('td');

                    // Muestra los detalles del ticket en el modal
                    showTicketDetails({
                        fechaEntrada: rowData.eq(0).text(),
                        nombre: rowData.eq(1).text()
                    });
                });
            })
            .catch(error => {
                console.log('Error al obtener los productos', error);
            });
            
});



function cerrarSesion() {
    // Mostrar una alerta de confirmación
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Estás a punto de cerrar sesión. ¿Deseas continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma, limpiar la sesión y redirigir a la página de inicio de sesión
            sessionStorage.clear();
            window.location.href = 'index.html';
        }
    });
}




