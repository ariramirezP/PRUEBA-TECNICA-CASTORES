DROP DATABASE IF EXISTS controlInventarios;
CREATE DATABASE controlInventarios;
USE controlInventarios;


CREATE TABLE productos (
idProducto INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
nombreProducto VARCHAR (20)NOT NULL,
descripcion LONGTEXT,
paisOrigen VARCHAR(20),
estatus VARCHAR(10) NOT NULL,
cantidad INT NOT NULL
);

CREATE TABLE roles(
idRol INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
tipoRol VARCHAR (45) NOT NULL
);

CREATE TABLE usuarios(
idUsuario INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
nombre VARCHAR(45) NOT NULL,
correo VARCHAR(45) NOT NULL,
contrasena VARCHAR(45) NOT NULL,
estatus VARCHAR(10) NOT NULL,
token VARCHAR(100),
idRol INT,
CONSTRAINT fk_idRol_usuarios
    FOREIGN KEY (idRol)
    REFERENCES roles (idRol)
);

CREATE TABLE historicos(
idHistorico INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
fechaEntrada DATETIME,
fechaSalida DATETIME,
idUsuario INT,
idProducto INT,
CONSTRAINT fk_idUsuario_historicos
    FOREIGN KEY (idUsuario)
    REFERENCES usuarios (idUsuario),
CONSTRAINT fk_idProducto_historicos
    FOREIGN KEY (idProducto)
    REFERENCES productos (idProducto)
);

INSERT INTO roles (tipoRol) VALUES ('Administrador'),('Almacenista');
INSERT INTO usuarios (nombre,correo,contrasena,estatus,idRol) VALUES ('Ari','arirapalci@gmail.com','ariRa','activo',2);
INSERT INTO usuarios (nombre,correo,contrasena,estatus,idRol) VALUES ('Emilio','angelRamirez@gmail.com','angel','activo',1);
INSERT INTO usuarios (nombre,correo,contrasena,estatus,idRol) VALUES ('Cris','crisRamirez@gmail.com','cris','activo',1);
INSERT INTO usuarios (nombre,correo,contrasena,estatus,idRol) VALUES ('Arleth','arlethRa@gmail.com','arlet','activo',2);


-- ---------------- PROCEDURE PARA AGREGAR UN PRODUCTO NUEVO-------------
DROP PROCEDURE IF EXISTS sp_ingresarProductoNuevo;
DELIMITER $$
CREATE PROCEDURE sp_ingresarProductoNuevo (
				IN var_nombreProducto VARCHAR(20),
                IN var_descripcion LONGTEXT,
                IN var_paisOrigen VARCHAR(20)
)
	BEGIN 
		INSERT INTO productos (nombreProducto, descripcion, paisOrigen, estatus, cantidad) 
			VALUES (var_nombreProducto, var_descripcion, var_paisOrigen,'activo',0);
    END $$
DELIMITER ;

CALL sp_ingresarProductoNuevo('TARJETA MADRE','La tarjeta madre es la columna vertebral que une los componentes de la computadora','Japon');
SELECT * FROM productos;
SELECT * FROM productos WHERE estatus = 'activo';

-- -----------------------------------------------------------------------------------
-- ---------------- PROCEDURE PARA DESACTIVAR DE FORMA LOGOCA UN PRODUCTO-------------
DROP PROCEDURE IF EXISTS sp_desactivarProducto;
DELIMITER $$

CREATE PROCEDURE sp_desactivarProducto(
    IN var_nombreProducto VARCHAR(20) -- 1
)
BEGIN
    -- Actualizar el estatus del producto a 'inactivo'
    UPDATE productos
    SET estatus = 'inactivo'
    WHERE nombreProducto = var_nombreProducto;
END $$

DELIMITER ;

CALL sp_desactivarProducto('TARJETA MADRE');
SELECT * FROM productos;
-- -----------------------------------------------------------------------------------

-- -----------------PROCEDURE PARA REACTIVAR UN PRODUCTO------------------------------
DROP PROCEDURE IF EXISTS sp_activarProducto;
DELIMITER $$

CREATE PROCEDURE sp_activarProducto(
    IN var_nombreProducto VARCHAR(20) -- 1
)
BEGIN
    -- Actualizar el estatus del producto a 'inactivo'
    UPDATE productos
    SET estatus = 'activo'
    WHERE nombreProducto = var_nombreProducto;
END $$

DELIMITER ;

CALL sp_activarProducto('TARJETA MADRE');
SELECT * FROM productos;
-- ------------------------------------------------------------------------------------


-- --------PROCEDURE PARA AUMENTAR LA CANTIDAD DE PIEZAS DE UN PRODUCTO CON NUEVA FECHA----------
DROP PROCEDURE IF EXISTS sp_aumentarInventarioProducto;

DELIMITER $$

CREATE PROCEDURE sp_aumentarInventarioProducto(
    IN var_idProducto INT, -- ID del producto
    IN var_cantidad INT,   -- Cantidad a aumentar
    IN var_idUsuario INT   -- ID del usuario que realizó el movimiento
)
BEGIN
    -- Actualizamos la fecha de entrada a la actual
    INSERT INTO historicos(fechaEntrada, idUsuario, idProducto)
    VALUES(NOW(), var_idUsuario, var_idProducto);
    
    -- Actualizamos la cantidad del producto en la tabla de productos
    UPDATE productos
    SET cantidad = cantidad + var_cantidad
    WHERE idProducto = var_idProducto;
END $$

DELIMITER ;

CALL sp_aumentarInventarioProducto(1,10,2);

-- --------PROCEDURE PARA DISMINUIR LA CANTIDAD DE PIEZAS DE UN PRODUCTO CON NUEVA FECHA---------
DROP PROCEDURE IF EXISTS sp_disminuirInventarioProducto;

DELIMITER $$

CREATE PROCEDURE sp_disminuirInventarioProducto(
    IN var_idProducto INT, -- ID del producto
    IN var_cantidad INT,   -- Cantidad a disminuir
    IN var_idUsuario INT   -- ID del usuario que realizó el movimiento
)
BEGIN
    -- Actualizamos la fecha de salida a la actual
    INSERT INTO historicos(fechaSalida, idUsuario, idProducto)
    VALUES(NOW(), var_idUsuario, var_idProducto);
    
    -- Actualizamos la cantidad del producto en la tabla de productos
    UPDATE productos
    SET cantidad = cantidad - var_cantidad
    WHERE idProducto = var_idProducto;
END $$

DELIMITER ;


CALL sp_disminuirInventarioProducto(1,10,1);
-- ------------------------------------------------------------------------------------
-- ---------- PROCEDURE PARA CREAR UN TOKEN SI EL USUARIO EXISTE-----------------------
DROP PROCEDURE IF EXISTS sp_insertToken;

DELIMITER $$
CREATE PROCEDURE sp_insertToken(IN var_nombreUsuario VARCHAR(35), IN var_token VARCHAR(255))
BEGIN
    UPDATE usuarios SET token = var_token WHERE nombre = var_nombreUsuario;
END $$
DELIMITER ;


SELECT * FROM usuarios;
SELECT * FROM roles;
SELECT * FROM historicos;
-- ------------------------------------------------------------------------------------


SELECT u.idUsuario, u.nombre, r.tipoRol
FROM usuarios u
JOIN roles r ON u.idRol = r.idRol
GROUP BY u.nombre
ORDER BY u.idUsuario ASC;

DROP VIEW IF EXISTS vista_historicos;

CREATE VIEW vista_historicos AS
SELECT
    h.idHistorico,
    u.nombre,
    h.fechaEntrada,
    u.idUsuario
FROM
    historicos h
JOIN
    usuarios u ON h.idUsuario = u.idUsuario
JOIN
    productos p ON h.idProducto = p.idProducto;

SELECT * FROM vista_historicos;

