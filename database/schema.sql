DROP DATABASE IF EXISTS `sandersCRM`;
CREATE DATABASE `sandersCRM`;
USE `sandersCRM`;

CREATE TABLE usuarios (
    id int NOT NULL AUTO_INCREMENT,
    username varchar(50) NOT NULL DEFAULT 'none',
    contraseña varchar(255) NOT NULL,
    sudo boolean NOT NULL DEFAULT false,
    PRIMARY KEY (id)  -- Corrected primary key column name
);

CREATE TABLE donaciones (
    id int NOT NULL AUTO_INCREMENT,
    id_usuario int NOT NULL,
    fecha date NOT NULL,
    cantidad int NOT NULL,
    tipo enum('digital', 'efectivo', 'especie') NOT NULL,
    estado varchar(50) NOT NULL DEFAULT 'none',
    pais varchar(50) NOT NULL DEFAULT 'none',
    PRIMARY KEY (id),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)  -- Corrected foreign key reference
);