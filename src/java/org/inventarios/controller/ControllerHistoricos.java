/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.inventarios.controller;

import org.inventarios.model.Historicos;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import org.inventarios.db.ConexionMysql;
import org.inventarios.model.Productos;
import org.inventarios.model.Usuarios;

/**
 *
 * @author pc
 */
public class ControllerHistoricos {
    
    public Historicos fill(ResultSet rs) throws SQLException{
    Historicos historicos = new Historicos();
    Usuarios usuarios = new Usuarios();
    Productos producto = new Productos();
    
    historicos.setIdHistorico(rs.getInt("idHistorico"));
    usuarios.setNombre(rs.getString("nombre"));
    usuarios.setIdUsuario(rs.getInt("idUsuario"));
    historicos.setUsuarios(usuarios);
    historicos.setFechaEntrada(rs.getTimestamp("fechaEntrada"));
    
    return historicos;
}

        public Historicos fillSalidas(ResultSet rs) throws SQLException{
    Historicos historicos = new Historicos();
    Usuarios usuarios = new Usuarios();
    Productos producto = new Productos();
    
    historicos.setIdHistorico(rs.getInt("idHistorico"));
    usuarios.setNombre(rs.getString("nombre"));
    usuarios.setIdUsuario(rs.getInt("idUsuario"));
    historicos.setUsuarios(usuarios);
    historicos.setFechaEntrada(rs.getTimestamp("fechaSalida"));
    
    return historicos;
}
    
    public void entradas (int idProducto, int idUsuario, int cantidad) throws SQLException{
        String query = "CALL sp_aumentarInventarioProducto(?,?,?); ";
        ConexionMysql connMySQL = new ConexionMysql();
        Connection conn = connMySQL.open();
        PreparedStatement cstm = conn.prepareStatement(query);
        
        cstm.setInt(1, idProducto);
        cstm.setInt(2, cantidad);
        cstm.setInt(3,idUsuario);
        
        //Ejecutamos la consulta
        cstm.execute();
        cstm.close();
        
        connMySQL.close();
         
    }
    
    public void salidas (int idProducto, int idUsuario, int cantidad) throws SQLException{
        String query = "CALL sp_disminuirInventarioProducto(?,?,?); ";
        ConexionMysql connMySQL = new ConexionMysql();
        Connection conn = connMySQL.open();
        PreparedStatement cstm = conn.prepareStatement(query);
        
        cstm.setInt(1, idProducto);
        cstm.setInt(2, cantidad);
        cstm.setInt(3,idUsuario);
        
        //Ejecutamos la consulta
        cstm.execute();
        cstm.close();
        
        connMySQL.close();
         
    }
    
    public List<Historicos> getAll() throws SQLException {
        //La consulta SQL a ejecutar:
        String sql = "SELECT * FROM vista_historicos";
        //Con este objeto nos vamos a conectar a la Base de Datos:
        ConexionMysql connMySQL = new ConexionMysql();
        //Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();
        //Con este objeto ejecutaremos la consulta:
        PreparedStatement pstmt = conn.prepareStatement(sql);
        //Aquí guardaremos los resultados de la consulta:
        ResultSet rs = pstmt.executeQuery();
        List<Historicos> historicos = new ArrayList<>();
        while (rs.next()) {
            historicos.add(fill(rs));
        }
        rs.close();
        pstmt.close();
        connMySQL.close();
        return historicos;
    }
    
   
}
