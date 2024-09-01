use sandersCRM;

INSERT INTO usuarios (email, telefono, contraseña, sudo) VALUES
('user1@example.com', '1234567890', 'password1', false),
('user2@example.com', '0987654321', 'password2', true),
('user3@example.com', '1122334455', 'password3', false),
('user4@example.com', '5566778899', 'password4', false),
('user5@example.com', '6677889900', 'password5', true);

INSERT INTO donaciones (id_usuario, fecha, cantidad, tipo, estado, pais) VALUES
(1, '2023-01-01', 100, 'digital', 'Pennsylvania', 'USA'),
(2, '2023-02-01', 200, 'efectivo', 'Ottawa', 'Canada'),
(3, '2023-03-01', 300, 'especie', 'Ciudad de Mexico', 'Mexico'),
(4, '2023-04-01', 400, 'digital', 'no se', 'Brazil'),
(5, '2023-05-01', 500, 'efectivo', 'Buenos Aires', 'Argentina');