DROP DATABASE IF EXISTS `sandersCRM`;
CREATE DATABASE `sandersCRM`;
USE `sandersCRM`;

CREATE TABLE usuarios (
    id_usuario int NOT NULL AUTO_INCREMENT,
    username varchar(50) NOT NULL DEFAULT 'none',
    contraseña varchar(50) NOT NULL,
    sudo boolean NOT NULL DEFAULT false,
    PRIMARY KEY (id_usuario)
);

CREATE TABLE donaciones (
    id_donacion int NOT NULL AUTO_INCREMENT,
    id_usuario int NOT NULL,
    fecha date NOT NULL,
    cantidad int NOT NULL,
    tipo enum('digital', 'efectivo', 'especie') NOT NULL,
    estado varchar(50) NOT NULL DEFAULT 'none',
    pais varchar(50) NOT NULL DEFAULT 'none',
    PRIMARY KEY (id_donacion),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);