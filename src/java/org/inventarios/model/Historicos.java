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
    private Date fecha;
    private String tipoMovimiento;
    private Usuarios usuarios;
    private Productos producto;
    
    public Historicos() {
    }

    public Historicos(int idHistorico, Date fecha, String tipoMovimiento, Usuarios usuarios, Productos producto) {
        this.idHistorico = idHistorico;
        this.fecha = fecha;
        this.tipoMovimiento = tipoMovimiento;
        this.usuarios = usuarios;
        this.producto = producto;
    }

    public int getIdHistorico() {
        return idHistorico;
    }

    public void setIdHistorico(int idHistorico) {
        this.idHistorico = idHistorico;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public String getTipoMovimiento() {
        return tipoMovimiento;
    }

    public void setTipoMovimiento(String tipoMovimiento) {
        this.tipoMovimiento = tipoMovimiento;
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
