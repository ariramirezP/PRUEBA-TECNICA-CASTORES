/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.inventarios.controller;

import org.inventarios.model.Productos;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import org.inventarios.db.ConexionMysql;
import org.inventarios.model.Usuarios;

/**
 *
 * @author pc
 */
public class ControllerProductos {

    public Productos fill(ResultSet rs) throws SQLException {
        Productos producto = new Productos();

        producto.setIdProducto(rs.getInt("idProducto"));
        producto.setNombreProducto(rs.getString("nombreProducto"));
        producto.setEstatus(rs.getString("estatus"));
        producto.setDescripcion(rs.getString("descripcion"));
        producto.setPaisOrigen(rs.getString("paisOrigen"));
        producto.setCantidad(rs.getInt("cantidad"));
        
        return producto;
    }
    
    public Productos registrarProductos(Productos producto) throws SQLException{
        String query = "CALL sp_ingresarProductoNuevo(?,?,?)";
        
        ConexionMysql connMySQL = new ConexionMysql();
        Connection conn = connMySQL.open();
        PreparedStatement cstm = conn.prepareStatement(query);
        
        //llenamos los campos de la consulta
        cstm.setString(1, producto.getNombreProducto());
        cstm.setString(2,producto.getDescripcion());
        cstm.setString(3,producto.getPaisOrigen());
        
        //Ejecutamos la consulta
        cstm.execute();
        cstm.close();
        
        connMySQL.close();
        
        return producto;
    }
    
    public void activarProducto(String nombreProducto) throws SQLException {
        String query = "CALL sp_activarProducto(?)";
        
        ConexionMysql connMySQL = new ConexionMysql();
        Connection conn = connMySQL.open();
        PreparedStatement pstm = conn.prepareStatement(query);

        pstm.setString(1, nombreProducto); 
        pstm.execute();
        pstm.close();
        connMySQL.close();
    }
    
     public void desactivarProducto(String nombreProducto) throws SQLException {
        String query = "CALL sp_desactivarProducto(?)";
        
        ConexionMysql connMySQL = new ConexionMysql();
        Connection conn = connMySQL.open();
        PreparedStatement pstm = conn.prepareStatement(query);

        pstm.setString(1, nombreProducto); 
        pstm.execute();
        pstm.close();
        connMySQL.close();
    }
    
    public List<Productos> getAll() throws SQLException {
        //La consulta SQL a ejecutar:
        String sql = "SELECT * FROM productos";
        //Con este objeto nos vamos a conectar a la Base de Datos:
        ConexionMysql connMySQL = new ConexionMysql();
        //Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();
        //Con este objeto ejecutaremos la consulta:
        PreparedStatement pstmt = conn.prepareStatement(sql);
        //Aquí guardaremos los resultados de la consulta:
        ResultSet rs = pstmt.executeQuery();
        List<Productos> productos = new ArrayList<>();
        while (rs.next()) {
            productos.add(fill(rs));
        }
        rs.close();
        pstmt.close();
        connMySQL.close();
        return productos;
    }
    
     public List<Productos> getAllActivos() throws SQLException {
        //La consulta SQL a ejecutar:
        String sql = "SELECT * FROM productos WHERE estatus = 'activo'";
        //Con este objeto nos vamos a conectar a la Base de Datos:
        ConexionMysql connMySQL = new ConexionMysql();
        //Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();
        //Con este objeto ejecutaremos la consulta:
        PreparedStatement pstmt = conn.prepareStatement(sql);
        //Aquí guardaremos los resultados de la consulta:
        ResultSet rs = pstmt.executeQuery();
        List<Productos> productos = new ArrayList<>();
        while (rs.next()) {
            productos.add(fill(rs));
        }
        rs.close();
        pstmt.close();
        connMySQL.close();
        return productos;
    }
    

}
