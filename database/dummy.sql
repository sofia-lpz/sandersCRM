-- Insert dummy data into donantes table
INSERT INTO donantes (email, nombre, apellido) VALUES
('john.doe@example.com', 'John', 'Doe'),
('jane.smith@example.com', 'Jane', 'Smith'),
('alice.jones@example.com', 'Alice', 'Jones'),
('bob.brown@example.com', 'Bob', 'Brown'),
('charlie.davis@example.com', 'Charlie', 'Davis');

-- Insert dummy data into donaciones table
INSERT INTO donaciones (id_donante, campana, fecha, cantidad, tipo, estado, pais) VALUES
(1, 'reproductiva', '2023-01-15', 100, 'digital', 'toluca', 'USA'),
(2, 'agua', '2023-02-20', 200, 'efectivo', 'fghj', 'Canada'),
(3, 'nutricion', '2023-03-10', 150, 'especie', 'dshkfjl', 'UK'),
(4, 'reproductiva', '2023-04-05', 250, 'digital', 'sahdjfkl', 'Australia'),
(5, 'agua', '2023-05-25', 300, 'efectivo', 'ahjkfl', 'India'),
(1, 'nutricion', '2023-06-15', 120, 'especie', 'sdbfkj', 'USA'),
(2, 'reproductiva', '2023-07-20', 220, 'digital', 'ahdjk', 'Canada'),
(3, 'agua', '2023-08-10', 180, 'efectivo', 'agjhdjkjl', 'UK'),
(4, 'nutricion', '2023-09-05', 260, 'especie', 'asdjk', 'Australia'),
(5, 'reproductiva', '2023-10-25', 320, 'digital', 'asjkdf', 'India');