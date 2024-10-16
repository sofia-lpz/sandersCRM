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
    telefono varchar(50) NOT NULL DEFAULT 'Sin registro',
    email varchar(50) NOT NULL DEFAULT 'Sin registro',
    nombre varchar(50) NOT NULL DEFAULT 'Sin registro',
    apellido varchar(50) NOT NULL DEFAULT 'Sin registro',
    donaciones int NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE donaciones (
    id int NOT NULL AUTO_INCREMENT,
    id_donante int NOT NULL,
    campana enum('reproductiva', 'agua', 'nutricion', 'sin campaña') NOT NULL DEFAULT 'sin campaña',
    fecha date NOT NULL,
    cantidad float NOT NULL,
    tipo enum('digital', 'efectivo') NOT NULL,
    estado varchar(50) NOT NULL DEFAULT 'Sin registro',
    pais varchar(50) NOT NULL DEFAULT 'Sin registro',
    PRIMARY KEY (id),
    CONSTRAINT fk_donaciones_donante FOREIGN KEY (id_donante) REFERENCES donantes(id) ON DELETE CASCADE
);

DELIMITER //

CREATE TRIGGER update_donantes_donaciones_after_insert
AFTER INSERT ON donaciones
FOR EACH ROW
BEGIN
    UPDATE donantes SET donaciones = donaciones + 1 WHERE id = NEW.id_donante;
END;
//

CREATE TRIGGER update_donantes_donaciones_after_delete
AFTER DELETE ON donaciones
FOR EACH ROW
BEGIN
    UPDATE donantes SET donaciones = donaciones - 1 WHERE id = OLD.id_donante;
END;
//

CREATE TRIGGER update_donantes_donaciones_after_update
AFTER UPDATE ON donaciones
FOR EACH ROW
BEGIN
    DECLARE donation_count INT;
    SELECT COUNT(*) INTO donation_count FROM donaciones WHERE id_donante = NEW.id_donante;
    UPDATE donantes SET donaciones = donation_count WHERE id = NEW.id_donante;
END;
//

DELIMITER ;