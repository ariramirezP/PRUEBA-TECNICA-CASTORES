



function validarLogin() {
    // Obtener valores de usuario y contraseña del formulario
    let usuario = document.getElementById("txtUsuario").value;
    let contrasenia = document.getElementById("txtPassword").value;

    let URL = 'http://localhost:8080/ControlDeInventariosEnAlmacen/api/funcion/loguear';
    // Realizar la validación del formulario
    if (usuario === "" || contrasenia === "") {

        Swal.fire({
            icon: 'warning',
            title: 'Campos vacios',
            showConfirmButton: true
        });

        return;
    }

    // Realizar la solicitud al servidor para validar el usuario y la contraseña
    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'nombre=' + encodeURIComponent(usuario) + '&contrasena=' + encodeURIComponent(contrasenia)
    })
            .then(response => response.json())
            .then(response => {
                // Verificar la respuesta del servidor
                if (response !== undefined && response.response !== 0) {


                    Swal.fire({
                        icon: 'success',
                        title: 'Credenciales validas!',
                        timer: 2500
                    });
                    //Guardar el token que se genera al verificar las credenciales en-- sessionStorage

                    sessionStorage.setItem("token", String(response.token));
                    sessionStorage.setItem("idUsuario", String(response.idUsuario));
                    sessionStorage.setItem("nombre", String(response.nombre));
                    sessionStorage.setItem("idRol", String(response.idRol));
                    
                    clear();
                    setTimeout("location.href ='http://localhost:8080/ControlDeInventariosEnAlmacen/inventario.html';",2500);
                    window.onload = function () {
                        let token = sessionStorage.getItem('token');
                        if ((!token || token === '')) {
                            window.location.href = 'index.html';
                        }
                    };
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Credenciales incorrectas!'
                    });
                }
            })
            .catch(error => {
                console.error('Error al realizar la solicitud:', error);
                alert("Ocurrió un error al intentar iniciar sesión. Por favor, inténtelo nuevamente.");
            });
}

//Funcion para limpiar los campos despues de registrar 
function clear() {
    const elements = document.querySelectorAll('input[type="text"], input[type="number"], input[type="password"]');
    elements.forEach(element => {
        element.value = "";
    });
}
