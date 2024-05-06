function mostrarProductos(opcion) {
    let URL = "http://localhost:8080/ControlDeInventariosEnAlmacen/api/funcion/getAllProductos"; 
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            // Limpia el cuerpo de la tabla
            let tableBody = $('#ticketsBody');
            tableBody.empty();
            
            // Filtra los productos según la opción seleccionada
            let productosFiltrados = [];
            if (opcion === 'todos') {
                productosFiltrados = data;
            } else if (opcion === 'activos') {
                productosFiltrados = data.filter(producto => producto.estatus === 'activo');
            } else if (opcion === 'inactivos') {
                productosFiltrados = data.filter(producto => producto.estatus === 'inactivo');
            }

            // Itera sobre los datos filtrados y agrega filas a la tabla
            productosFiltrados.forEach(producto => {
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

// Aquí ahora va la definición de actualizarTablaProductos()
function actualizarTablaProductos() {
    let URL = "http://localhost:8080/ControlDeInventariosEnAlmacen/api/funcion/getAllProductos"; 
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

function registrarProducto() {
    let idRol = sessionStorage.getItem("idRol");
    
    // Verificar si el usuario tiene el rol de administrador (idRol = 1)
    if (idRol !== '1') {
        Swal.fire({
            icon: 'error',
            title: 'Acceso denegado',
            text: 'Solo los administradores pueden registrar productos',
            showConfirmButton: true
        });
        return; // Terminar la función aquí si el usuario no tiene permisos de administrador
    }

    let var_nombreProducto = document.getElementById("txtNombreProducto").value;
    let var_descripcion = document.getElementById("txtDescripcion").value;
    let var_paisOrigen = document.getElementById("txtPaisOrigen").value;

    // Verificar si algún campo está vacío
    if (var_nombreProducto.trim() === '' || var_descripcion.trim() === '' || var_paisOrigen.trim() === '') {
        Swal.fire({
            icon: 'warning',
            title: 'Campos vacíos',
            text: 'Todos los campos son obligatorios',
            showConfirmButton: true
        });
        return; // Terminar la función aquí si algún campo está vacío
    }

    let url = 'http://localhost:8080/ControlDeInventariosEnAlmacen/api/funcion/saveDataProducto';

    let producto = {
        "nombreProducto": var_nombreProducto,
        "descripcion": var_descripcion,
        "paisOrigen": var_paisOrigen,
        "estatus": "activo",
        "cantidad": 0
    };

    console.log(producto);

    const requestOptions = {
        method: "POST",
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({producto: JSON.stringify(producto)})
    };

    fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(json => {
            console.log("datos del producto:"+ json);
            // Después de guardar el producto, actualiza la tabla de productos
            // y luego muestra la confirmación al usuario
            Swal.fire({
                icon: 'success',
                title: 'Registrado',
                showConfirmButton: true,
                timer: 3000
            });
            clear(); 
            actualizarTablaProductos();
        })
        .catch(error => {
            console.error("Error al realizar la solicitud:", error);
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
    let URL ="http://localhost:8080/ControlDeInventariosEnAlmacen/api/funcion/getAllProductos"; 
    
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



function activarProducto() {
    
    let idRol = sessionStorage.getItem("idRol");
    
    // Verificar si el usuario tiene el rol de administrador (idRol = 1)
    if (idRol !== '1') {
        Swal.fire({
            icon: 'error',
            title: 'Acceso denegado',
            text: 'Solo los administradores pueden reactivar un producto',
            showConfirmButton: true
        });
        return; // Terminar la función aquí si el usuario no tiene permisos de administrador
    }
    
    let nombreProducto = $('#ticketDetails').find('p').eq(1).text().split(':')[1].trim();
    Swal.fire({
        title: '¿Estás seguro de activar este producto?',
        text: "¡El producto será activado!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, activar producto',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma, realiza la activación del producto
            fetchActivation(nombreProducto, 'activar');
        }
    });
}

function desactivarProducto() {
    
    let idRol = sessionStorage.getItem("idRol");
    
    // Verificar si el usuario tiene el rol de administrador (idRol = 1)
    if (idRol !== '1') {
        Swal.fire({
            icon: 'error',
            title: 'Acceso denegado',
            text: 'Solo los administradores pueden dar de baja un producto',
            showConfirmButton: true
        });
        return; // Terminar la función aquí si el usuario no tiene permisos de administrador
    }
    
    let nombreProducto = $('#ticketDetails').find('p').eq(1).text().split(':')[1].trim();
    Swal.fire({
        title: '¿Estás seguro de desactivar este producto?',
        text: "¡El producto será desactivado!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, desactivar producto',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma, realiza la desactivación del producto
            fetchActivation(nombreProducto, 'desactivar');
        }
    });
}

function fetchActivation(nombreProducto, action) {
    
    let URL;
    if (action === 'activar') {
        URL = "http://localhost:8080/ControlDeInventariosEnAlmacen/api/funcion/activarProducto";
    } else if (action === 'desactivar') {
        URL = "http://localhost:8080/ControlDeInventariosEnAlmacen/api/funcion/desactivarProducto";
    }

    // Configura la solicitud fetch para enviar los datos
    fetch(URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({nombreProducto: nombreProducto})
    })
    .then(response => {
        if (response.ok) {
            // Si la respuesta es exitosa, actualiza la tabla de productos
            actualizarTablaProductos();
            Swal.fire(
                '¡Hecho!',
                'El producto ha sido modificado exitosamente.',
                'success'
            );
        } else {
            throw new Error('Hubo un problema al cambiar el estatus del producto.');
        }
    })
    .catch(error => {
        console.error('Error al cambiar el estatus del producto:', error);
        Swal.fire(
            'Error',
            'Hubo un problema al cambiar el estatus del producto.',
            'error'
        );
    });
}


//Funcion para limpiar los campos despues de registrar 
function clear() {
    const elements = document.querySelectorAll('input[type="text"], input[type="number"], input[type="password"],textarea');
    elements.forEach(element => {
        element.value = "";
    });
}


function aumentarStock() {
    
    let idRol = sessionStorage.getItem("idRol");
    
    // Verificar si el usuario tiene el rol de administrador (idRol = 1)
    if (idRol !== '1') {
        Swal.fire({
            icon: 'error',
            title: 'Acceso denegado',
            text: 'Solo los administradores pueden aumentar el stock',
            showConfirmButton: true
        });
        return; // Terminar la función aquí si el usuario no tiene permisos de administrador
    }

    
    let URL = "http://localhost:8080/ControlDeInventariosEnAlmacen/api/funcion/entradaProducto";
    let idProducto = $('#ticketDetails').find('p').eq(0).text().split(':')[1].trim();
    let cantidad = document.getElementById("txtCantidad").value;
    let idUsuario = sessionStorage.getItem("idUsuario");

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({
            idProducto: idProducto,
            cantidad: cantidad,
            idUsuario: idUsuario
        })
    };
    
    console.log("id producto"+ idProducto);
    console.log("cantidad"+ cantidad);
    console.log("id usuario"+ idUsuario);

    fetch(URL, requestOptions)
        .then(response => {
            if (response.ok) {
                // Si la respuesta es exitosa, actualiza la tabla de productos
                actualizarTablaProductos();
                Swal.fire({
                    icon: 'success',
                    title: 'Stock aumentado correctamente',
                    showConfirmButton: true
                });
                    clear();
            } else {
                throw new Error('Hubo un problema al aumentar el stock del producto.');
            }
        })
        .catch(error => {
            console.error('Error al aumentar el stock del producto:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al aumentar el stock del producto',
                text: error.message,
                showConfirmButton: true
            });
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

