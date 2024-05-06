# PRUEBA-TECNICA-CASTORES
Proyecto-prueba-tecnica-castores

IDE utilizado NETBEANS 

javajdk 17

DBMS MysqlWorbench 8.0 CE

PASOS PARA CORRER LA APLICACIÓN 
BASE DE DATOS
Despues de descargar el proyecto y de haberlo descomprimido,
debes de ir a tu DBMS y abrir los scripts de la base de datos (controlInventarios)
para posteriormente ejecutar todos los comandos que estan en el mismo.
NOTA- el usuario y contraseña de la bae de datos debe de ser 'root' para ambos campos.


IDE 
Despues de abrir el ide, debes de seleccionar la opcion para abrir un proyecto y seleccionar el proyecto descargado,
posteriormente solo debes de seleccionar un navegador en donde se ejecutara la aplicacion WEB.

NOTA- Para esta aplicacion se utilizo un servidor (apacheTomcat-10.1.13)
para agregar un servidor debes de dirigirte a la pestaña de services, seleccionas serves y das click derecho agregar servidor Apache Tomcat or TOM EE
SERVER LOCATION deberas de poner la ruta del servidor 
CATALINA BASE ruta de una nueva carpeta que se debera de crear, esta se debe de agregar vacia. nombre de la carpeta (catalina_base)
desabilitar la opción de crear usuario si no existe y despues finish.

posteriormente debes de correr el servidor en la pestaña de servers, aparecera el servidor que se acaba de agregar, click derecho start.esperas a que se termine de iniciar y despues lo detienes.

despues de esto, en la carpeta de catalina_base se crearon varios archivos, buscar en conf el archivo tomcat-users.xml, clik derecho editar y agregas 
<user password ="" roles="gui-admin,manager-gui,manager-script,admin" username="admin"/> antes de la ultima linea  de la etiqueta de cierre </tomcat-users>
despues solo guardas cambios. 

por ultimo solo se deberia de ejecutar la aplicacion.
