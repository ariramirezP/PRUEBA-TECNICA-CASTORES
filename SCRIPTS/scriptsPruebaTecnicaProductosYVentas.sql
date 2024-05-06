DROP DATABASE IF EXISTS negocio;
CREATE DATABASE negocio;
USE negocio;

CREATE TABLE productos (
idProducto INT PRIMARY KEY AUTO_INCREMENT ,
nombre VARCHAR(20),
precio DECIMAL (10,2)
);

CREATE TABLE ventas (
idVenta INT PRIMARY KEY AUTO_INCREMENT,
cantidad INT,
idProducto INT,
CONSTRAINT fk_ventas_producto FOREIGN KEY (idProducto) REFERENCES productos(idProducto)
);

INSERT INTO productos (nombre, precio) VALUES("LAPTOP",3000.00);
INSERT INTO productos (nombre, precio) VALUES('PC',4000.00);
INSERT INTO productos (nombre, precio) VALUES('MOUSE',100.00);
INSERT INTO productos (nombre, precio) VALUES('TECLADO',150.00);
INSERT INTO productos (nombre, precio) VALUES('MONITOR',2000.00);
INSERT INTO productos (nombre, precio) VALUES('MICROFONO',350.00);
INSERT INTO productos (nombre, precio) VALUES('AUDIFONOS',450.00);

INSERT INTO ventas (idProducto, cantidad) VALUES (5,8);
INSERT INTO ventas (idProducto, cantidad) VALUES (1,15);
INSERT INTO ventas (idProducto, cantidad) VALUES (6,13);
INSERT INTO ventas (idProducto, cantidad) VALUES (6,4);
INSERT INTO ventas (idProducto, cantidad) VALUES (2,3);
INSERT INTO ventas (idProducto, cantidad) VALUES (5,1);
INSERT INTO ventas (idProducto, cantidad) VALUES (4,5);
INSERT INTO ventas (idProducto, cantidad) VALUES (2,5);
INSERT INTO ventas (idProducto, cantidad) VALUES (6,2);
INSERT INTO ventas (idProducto, cantidad) VALUES (1,8);

SELECT p.idProducto, p.nombre, p.precio
FROM productos p
JOIN ventas v ON p.idProducto = v.idProducto
GROUP BY p.idProducto
HAVING COUNT(*) = 1;

SELECT p.idProducto, p.nombre, p.precio, SUM(v.cantidad) AS total_cantidad
FROM productos p
JOIN ventas v ON p.idProducto = v.idProducto
GROUP BY p.idProducto, p.nombre, p.precio
HAVING COUNT(*) > 1;

SELECT p.idProducto, p.nombre, p.precio, IFNULL(SUM(v.cantidad * p.precio), 0) AS total_vendido
FROM productos p
LEFT JOIN ventas v ON p.idProducto = v.idProducto
GROUP BY p.idProducto, p.nombre, p.precio;

