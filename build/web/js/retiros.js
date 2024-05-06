function actualizarTablaProductos() {
    let URL = "http://localhost:8080/ControlDeInventariosEnAlmacen/api/funcion/getAllProductosActivos"; 
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            // Limpia el cuerpo de la tabla
            let tableBody = $('#ticketsBody');
            tableBody.empty();

            // Itera sobre los datos y agrega filas a la tabla
            data.forEach(producto => {
                let row = `<tr>
                    <td>${producto.idProducto}</td>
                    <td>${producto.nombreProducto}</td>
                    <td>${producto.paisOrigen}</td>
                    <td>${producto.estatus}</td>
                    <td>${producto.cantidad}</td>
                          </tr>`;
                tableBody.append(row);
            });
        })
        .catch(error => {
            console.log('Error al obtener los productos', error);
        });
}

function agregarFilaATabla(productos) {
    let newRow = `<tr>
        <td>${productos.idProducto}</td>
        <td>${productos.nombreProducto}</td>
        <td>${productos.paisOrigen}</td>
        <td>${productos.estatus}</td>
        <td>${productos.cantidad}</td>
    </tr>`;
    $('#ticketsBody').append(newRow);
}




function showTicketDetails(producto) {
    let modalBody = $('#ticketDetails');
    modalBody.empty();

    let details = 
            '<p><strong>Id producto:</strong> ' + producto.idProducto + '</p>' +
            '<p><strong>Nombre producto:</strong> ' + producto.nombreProducto + '</p>' +
            '<p><strong>Pais Origen:</strong> ' + producto.paisOrigen + '</p>' +
            '<p><strong>Estatus:</strong> ' + producto.estatus + '</p>' +
            '<p><strong>Cantidad:</strong> ' + producto.cantidad + '</p>' ;

    modalBody.html(details);

    // Muestra el modal
    $('#ticketModal').modal('show');
}


document.addEventListener('DOMContentLoaded', function () {
    // Cuando la página esté lista, realiza la solicitud fetch
    let URL ="http://localhost:8080/ControlDeInventariosEnAlmacen/api/funcion/getAllProductosActivos"; 
    
    fetch(URL)
            .then(response => response.json())
            .then(data => {
                console.log("Datos:"+ data);
                // Limpia el cuerpo de la tabla
                let tableBody = $('#ticketsBody');
                tableBody.empty();

                // Itera sobre los datos y agrega filas a la tabla
                data.forEach(productos => {
                    let row = `<tr>
                    <td>${productos.idProducto}</td>
                    <td>${productos.nombreProducto}</td>
                    <td>${productos.paisOrigen}</td>
                    <td>${productos.estatus}</td>
                    <td>${productos.cantidad}</td>
                </tr>`;
                    tableBody.append(row);
                });

                // Agrega un evento de clic a las filas de la tabla
                $('#ticketsBody').on('click', 'tr', function () {
                    let selectedRow = $(this).closest('tr');
                    let rowData = selectedRow.find('td');

                    // Muestra los detalles del ticket en el modal
                    showTicketDetails({
                        idProducto: rowData.eq(0).text(),
                        nombreProducto: rowData.eq(1).text(),
                        paisOrigen: rowData.eq(2).text(),
                        estatus: rowData.eq(3).text(),
                        cantidad: rowData.eq(4).text()
                    });
                });
            })
            .catch(error => {
                console.log('Error al obtener los productos', error);
            });
            
});

function disminuiStock() {
    let URL = "http://localhost:8080/ControlDeInventariosEnAlmacen/api/funcion/salidaProducto";
    let idProducto = $('#ticketDetails').find('p').eq(0).text().split(':')[1].trim();
    let cantidad = document.getElementById("txtCantidad").value;
    let cantidadActual = parseInt($('#ticketDetails').find('p').eq(4).text().split(':')[1].trim()); // Obtener la cantidad actual del stock
    let idUsuario = sessionStorage.getItem("idUsuario");

    if (cantidad > cantidadActual) {
        // Si la cantidad a disminuir es mayor que la cantidad actual del stock
        Swal.fire({
            icon: 'error',
            title: 'Error al disminuir el stock del producto',
            text: 'La cantidad a disminuir es mayor que la cantidad actual del stock',
            showConfirmButton: true
        });
    } else {
        // Si la cantidad a disminuir es menor o igual a la cantidad actual del stock

        // Muestra una alerta de confirmación antes de disminuir el stock
        Swal.fire({
            title: '¿Estás seguro de disminuir el stock de este producto?',
            text: "¡La cantidad será disminuida del stock!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, disminuir stock',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma, realiza la disminución del stock
                fetchDisminuirStock(URL, idProducto, cantidad, idUsuario);
            }
        });
    }
}


function fetchDisminuirStock(URL, idProducto, cantidad, idUsuario) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({
            idProducto: idProducto,
            cantidad: cantidad,
            idUsuario: idUsuario
        })
    };

    fetch(URL, requestOptions)
        .then(response => {
            if (response.ok) {
                // Si la respuesta es exitosa, actualiza la tabla de productos
                actualizarTablaProductos();
                Swal.fire({
                    icon: 'success',
                    title: 'Stock disminuido correctamente',
                    showConfirmButton: true
                });
                clear(); // Limpia los campos después de disminuir el stock
            } else {
                throw new Error('Hubo un problema al disminuir el stock del producto.');
            }
        })
        .catch(error => {
            console.error('Error al disminuir el stock del producto:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al disminuir el stock del producto',
                text: error.message,
                showConfirmButton: true
            });
        });
}


//Funcion para limpiar los campos despues de registrar 
function clear() {
    const elements = document.querySelectorAll('input[type="text"], input[type="number"], input[type="password"],textarea');
    elements.forEach(element => {
        element.value = "";
    });
}


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
