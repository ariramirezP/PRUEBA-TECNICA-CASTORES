/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.inventarios.model;

import java.security.Timestamp;
import java.util.Date;
import org.glassfish.grizzly.http.util.TimeStamp;

/**
 *
 * @author pc
 */
public class Historicos {
    private int idHistorico;
    private Date fechaEntrada;
    private Date fechaSalida;
    private Usuarios usuarios;
    private Productos producto;
    
    public Historicos() {
    }

    public Historicos(int idHistorico, Date fechaEntrada, Date fechaSalida, Usuarios usuarios, Productos producto) {
        this.idHistorico = idHistorico;
        this.fechaEntrada = fechaEntrada;
        this.fechaSalida = fechaSalida;
        this.usuarios = usuarios;
        this.producto = producto;
    }

    public int getIdHistorico() {
        return idHistorico;
    }

    public void setIdHistorico(int idHistorico) {
        this.idHistorico = idHistorico;
    }

    public Date getFechaEntrada() {
        return fechaEntrada;
    }

    public void setFechaEntrada(Date fechaEntrada) {
        this.fechaEntrada = fechaEntrada;
    }

    public Date getFechaSalida() {
        return fechaSalida;
    }

    public void setFechaSalida(Date fechaSalida) {
        this.fechaSalida = fechaSalida;
    }

    public Usuarios getUsuarios() {
        return usuarios;
    }

    public void setUsuarios(Usuarios usuarios) {
        this.usuarios = usuarios;
    }

    public Productos getProducto() {
        return producto;
    }

    public void setProducto(Productos producto) {
        this.producto = producto;
    }
    
    
}
