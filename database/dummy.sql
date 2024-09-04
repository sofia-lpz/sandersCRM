-- Dummy data for `usuarios` table
INSERT INTO usuarios (username, contraseña, sudo) VALUES
('user1', 'password1', false),
('user2', 'password2', false),
('user3', 'password3', true),
('user4', 'password4', false),
('user5', 'password5', true);

-- Dummy data for `donaciones` table
INSERT INTO donaciones (id_usuario, fecha, cantidad, tipo, estado, pais) VALUES
(1, '2022-01-01', 100, 'digital', 'cdmx', 'USA'),
(2, '2022-01-02', 50, 'efectivo', 'cdmx', 'Canada'),
(3, '2022-01-03', 200, 'especie', 'cdmx', 'Mexico'),
(4, '2022-01-04', 150, 'digital', 'cdmx', 'Germany'),
(5, '2022-01-05', 75, 'efectivo', 'cdmx', 'France');