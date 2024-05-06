/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.inventarios.rest;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.List;
import org.inventarios.controller.ControllerHistoricos;
import org.inventarios.controller.ControllerProductos;
import org.inventarios.controller.ControllerUsuarios;
import org.inventarios.model.Historicos;
import org.inventarios.model.Productos;
import org.inventarios.model.Usuarios;

/**
 *
 * @author pc
 */
@Path("funcion")
public class RestApis {

    @Path("saveDataProducto")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response saveProducto(@FormParam("producto") @DefaultValue("{}") String producto) {
        String out;
        Gson gson = new Gson();
        System.out.println("Datos de el producto:" + producto);
        try {
            // Parsear el JSON a un objeto de tipo Persona
            Productos product = gson.fromJson(producto, Productos.class);

            // Interactuar con el controlador de persona para registrar la persona
            ControllerProductos cp = new ControllerProductos();
            cp.registrarProductos(product);

            // Crear una respuesta de éxito
            out = """
                  {"response":"action succes"}
                  """;
            return Response.ok(out).build();
        } catch (JsonSyntaxException | SQLException e) {
            // Manejar errores de parsing JSON o de la base de datos
            out = """
                  {"response":"action failed"}
                  """;
            e.printStackTrace();
            return Response.ok(out).build();
        }
    }

    
    @Path("loguear")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response asignarTokenUnique(@FormParam("nombre") String usuario,
            @FormParam("contrasena") String contrasenia) {
        String out;
        try {
            ControllerUsuarios cl = new ControllerUsuarios();

            // Get all records from the database
            List<Usuarios> allRecords = cl.getAll();

            // Check if the provided usuario and contrasenia exist in the database
            boolean userExists = false;
            String nombre = "";
            int idUsuario = 0;
            int idRol = 0;
            for (Usuarios record : allRecords) {
                if (record.getNombre().equals(usuario) && record.getContrasena().equals(contrasenia)) {
                    userExists = true;
                    idUsuario = record.getIdUsuario();
                    nombre = record.getNombre();
                    idRol = record.getRol().getIdRol();
                    break;
                }
            }

            if (userExists) {
                // User exists, proceed to generate and assign a token
                String timeStamp = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new java.util.Date());
                String tokenString = usuario + ":" + timeStamp;
                byte[] tokenBytes = tokenString.getBytes(java.nio.charset.StandardCharsets.UTF_8);
                String token = cl.bytesToHex(tokenBytes);

                // Call the generarToken method to update the token in the database
                cl.validarCredencialesUsuario(usuario, token);

                System.out.println("El usuario que intentó ingresar es: " + usuario);
                System.out.println("El token generado para el usuario es " + token);
                System.out.println("El idUsuario es " + idUsuario);
                System.out.println("El nombre del usuario es " + nombre);
                System.out.println("El id de rol es " + idRol);

                out = """
                        {"response": 1, "token": "%s", "idUsuario": "%d" ,"idRol": "%d", "nombre":"%s"}
                      """;
                out = String.format(out, token, idUsuario, idRol,nombre); // Cambiado a idUsuario en lugar de usuario
                return Response.status(Response.Status.OK).entity(out).build();

            } else {
                // Usuario no existe en la base de datos, devolver una respuesta de error
                out = """
                        {"response": 0}
                      """;
                return Response.status(Response.Status.OK).entity(out).build();

            }
        } catch (SQLException e) {
            // Handle the exception, for example, by logging it or returning an error message
            e.printStackTrace();
            out = """
                    {"error": "Error al generar o actualizar el token"}
                     """;
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(out).build();
        }

    }

    
    @Path("getAllProductos")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response getAllDatosProducto() {
        String out;
        List<Productos> productos;
        ControllerProductos ct = new ControllerProductos();
        try {
            productos = ct.getAll();

            out = new Gson().toJson(productos);
        } catch (SQLException e) {
            out = """
                  {"response": "Error en la transaccion"}
                  """;
            e.getMessage();
            System.out.println(e.getMessage());
        }
        return Response.ok(out).build();
    }
    
    
    @Path("getAllProductosActivos")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response getAllDatosProductoActivos() {
        String out;
        List<Productos> productos;
        ControllerProductos ct = new ControllerProductos();
        try {
            productos = ct.getAllActivos();

            out = new Gson().toJson(productos);
        } catch (SQLException e) {
            out = """
                  {"response": "Error en la transaccion"}
                  """;
            e.getMessage();
            System.out.println(e.getMessage());
        }
        return Response.ok(out).build();
    }
    
    @Path("getAllHistoricos")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response getAllHistoricosEntrada() {
        String out;
        List<Historicos> historicos;
        ControllerHistoricos ch = new ControllerHistoricos();
        try {
            historicos = ch.getAll();

            out = new Gson().toJson(historicos);
        } catch (SQLException e) {
            out = """
                  {"response": "Error en la transaccion"}
                  """;
            e.getMessage();
            System.out.println(e.getMessage());
        }
        return Response.ok(out).build();
    }

    
    @Path("entradaProducto")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response aumentarInventario(@FormParam("idProducto") @DefaultValue("0") int idProducto,
            @FormParam("cantidad") @DefaultValue("0") int cantidad,
            @FormParam("idUsuario") @DefaultValue("0") int idUsuario) {
        String out;
        try {
            
            
            // Interactuar con el controlador de historicos para registrar la entrada
            ControllerHistoricos ch = new ControllerHistoricos();
            ch.entradas(idProducto, idUsuario, cantidad);
            out = """
                  {"response":"action succes"}
              """;
            // Crear una respuesta de éxito
            return Response.ok(out).build();
        } catch (JsonSyntaxException | SQLException e) {
            // Manejar errores de parsing JSON o de la base de datos
            out = """
                  {"response":"action failed"}
                  """;
            e.printStackTrace();
            return Response.ok(out).build();
        }
    }

    @Path("salidaProducto")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response disminuirInventario(@FormParam("idProducto") @DefaultValue("0") int idProducto,
            @FormParam("cantidad") @DefaultValue("0") int cantidad,
            @FormParam("idUsuario") @DefaultValue("0") int idUsuario) {
        String out;
        try {
            
            // Interactuar con el controlador de historicos para registrar la entrada
            ControllerHistoricos ch = new ControllerHistoricos();
            ch.salidas(idProducto, idUsuario, cantidad);
            out = """
                  {"response":"action succes"}
              """;
            // Crear una respuesta de éxito
            return Response.ok(out).build();
        } catch (JsonSyntaxException | SQLException e) {
            // Manejar errores de parsing JSON o de la base de datos
            out = """
                  {"response":"action failed"}
                  """;
            e.printStackTrace();
            return Response.ok(out).build();
        }
    }
    
    @Path("activarProducto")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response activarProducto(@FormParam("nombreProducto") @DefaultValue("") String nombreProducto  
                                  ) {
        String out;
        ControllerProductos cp = new ControllerProductos();
        
        try {
            cp.activarProducto(nombreProducto);
            out = """
              {"response": "estado actualizado"}
              """;
        } catch (SQLException err) {
            err.printStackTrace();
            out = """
              {"response": "Error en la transaccion"}
              """;
        }
        return Response.ok(out).build();
    }
    
    
     @Path("desactivarProducto")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response desactivarProducto(@FormParam("nombreProducto") @DefaultValue("") String nombreProducto  
                                  ) {
        String out;
        ControllerProductos cp = new ControllerProductos();
        
        try {
            cp.desactivarProducto(nombreProducto);
            out = """
              {"response": "estado actualizado"}
              """;
        } catch (SQLException err) {
            err.printStackTrace();
            out = """
              {"response": "Error en la transaccion"}
              """;
        }
        return Response.ok(out).build();
    }
}
