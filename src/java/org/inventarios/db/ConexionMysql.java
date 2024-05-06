/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.inventarios.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author manue
 */
public class ConexionMysql {

    Connection conn;

    public Connection open() {
        String user = "root";
        String password = "root";
        String url = "jdbc:mysql://127.0.0.1:3306/controlInventarios";
        String parametros = "?useSSL=false&useUnicode=true&characterEncoding=UTF-8";

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(url + parametros, user, password);
            return conn;
        } catch (ClassNotFoundException | SQLException e) {
            throw new RuntimeException(e);
        }
    }
    
    public void close(){
        if(conn != null){
            try {
                conn.close();
            } catch (SQLException e) {
               e.printStackTrace();
                System.out.println("Excepcion controlada.");
            }
        }
    }
}
