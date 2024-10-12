DROP DATABASE IF EXISTS `sandersCRM`;
CREATE DATABASE `sandersCRM`;
USE `sandersCRM`;

CREATE TABLE usuarios (
    id int NOT NULL AUTO_INCREMENT,
    username varchar(50) NOT NULL DEFAULT 'none',
    contraseña varchar(255) NOT NULL,
    role enum('admin', 'user') NOT NULL DEFAULT 'user',
    PRIMARY KEY (id)
);

CREATE TABLE donantes (
    id int NOT NULL AUTO_INCREMENT,
    email varchar(50) NOT NULL,
    nombre varchar(50) NOT NULL,
    apellido varchar(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE donaciones (
    id int NOT NULL AUTO_INCREMENT,
    id_donante int NOT NULL,
    campana enum('reproductiva', 'agua', 'nutricion') NOT NULL,
    fecha date NOT NULL,
    cantidad float NOT NULL,
    tipo enum('digital', 'efectivo', 'especie') NOT NULL,
    estado varchar(50) NOT NULL DEFAULT 'none',
    pais varchar(50) NOT NULL DEFAULT 'none',
    PRIMARY KEY (id),
    FOREIGN KEY (id_donante) REFERENCES donantes(id)
);

CREATE TABLE stats (
    id int NOT NULL AUTO_INCREMENT,
    total_donaciones int NOT NULL,
    total_donantes int NOT NULL,
    fecha_actualizacion timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);