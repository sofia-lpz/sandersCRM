DROP DATABASE IF EXISTS `test`;
CREATE DATABASE `test`;
USE `test`;

create table usuarios(
    id_usuario int NOT NULL AUTO_INCREMENT,
    email varchar(50) NOT NULL DEFAULT 'none',
    telefono varchar(50) DEFAULT 'none',
    contraseña varchar(50) NOT NULL,
    sudo boolean NOT NULL DEFAULT false,
    primary key (id_usuario)
)

create table donaciones
(
    id_donacion int NOT NULL AUTO_INCREMENT,
    id_usuario int NOT NULL,
    fecha date NOT NULL,
    cantidad int NOT NULL,
    tipo enum('digital', 'efectivo', 'especie') NOT NULL,
    primary key (id_donacion),
    foreign key (id_usuario) references usuarios(id_usuario)
)

