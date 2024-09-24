INSERT INTO usuarios (username, contraseña, sudo) VALUES
('user1', 'password1', false),
('user2', 'password2', true),
('user3', 'password3', false),
('user4', 'password4', true),
('user5', 'password5', false);

INSERT INTO donaciones (id_usuario, fecha, cantidad, tipo, estado, pais) VALUES
(1, '2023-01-01', 100, 'digital', 'completed', 'USA'),
(2, '2023-02-01', 200, 'efectivo', 'pending', 'Canada'),
(3, '2023-03-01', 300, 'especie', 'completed', 'Mexico'),
(4, '2023-04-01', 400, 'digital', 'failed', 'Brazil'),
(5, '2023-05-01', 500, 'efectivo', 'completed', 'Argentina');