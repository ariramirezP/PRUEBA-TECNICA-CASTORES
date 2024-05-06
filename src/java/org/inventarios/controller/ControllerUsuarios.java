/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.inventarios.controller;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import org.inventarios.db.ConexionMysql;
import org.inventarios.model.Roles;
import org.inventarios.model.Usuarios;

/**
 *
 * @author pc
 */
public class ControllerUsuarios {
    
    
    public String bytesToHex(byte[] hash) {
        StringBuilder hexString = new StringBuilder(2 * hash.length);
        for (int i = 0; i < hash.length; i++) {
            String hex = Integer.toHexString(0xff & hash[i]);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }

    public Usuarios fill(ResultSet rs) throws SQLException {
        Usuarios usuario = new Usuarios();
        Roles rol = new Roles();

        usuario.setIdUsuario(rs.getInt("idUsuario"));
        usuario.setNombre(rs.getString("nombre"));
        usuario.setCorreo(rs.getString("correo"));
        usuario.setContrasena(rs.getString("contrasena"));
        usuario.setEstatus("estatus");
        rol.setIdRol(rs.getInt("idRol"));
        usuario.setToken(rs.getString("token"));
        usuario.setRol(rol);

        return usuario;
    }
    
    public String validarCredencialesUsuario(String nombre, String token){
        String query = "{CALL sp_insertToken(?, ?)}";
        try {
            ConexionMysql connMysql = new ConexionMysql();
            Connection conn = connMysql.open();
            CallableStatement cstm = (CallableStatement) conn.prepareCall(query);

            cstm.setString(1, nombre);
            cstm.setString(2, token);

            cstm.execute();
            cstm.close();
            connMysql.close();
            
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return token;
    }
    
    public List<Usuarios> getAll() throws SQLException {
        //La consulta SQL a ejecutar:
        String sql = "SELECT * FROM usuarios";
        //Con este objeto nos vamos a conectar a la Base de Datos:
        ConexionMysql connMySQL = new ConexionMysql();
        //Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();
        //Con este objeto ejecutaremos la consulta:
        PreparedStatement pstmt = conn.prepareStatement(sql);
        //Aquí guardaremos los resultados de la consulta:
        ResultSet rs = pstmt.executeQuery();
        List<Usuarios> usuarios = new ArrayList<>();
        while (rs.next()) {
            usuarios.add(fill(rs));
        }
        rs.close();
        pstmt.close();
        connMySQL.close();
        return usuarios;
    }
    
    

    
}
