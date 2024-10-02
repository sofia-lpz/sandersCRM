-- Insert dummy data into donantes table
INSERT INTO donantes (email, nombre, apellido) VALUES
('john.doe@example.com', 'John', 'Doe'),
('jane.smith@example.com', 'Jane', 'Smith'),
('alice.jones@example.com', 'Alice', 'Jones'),
('bob.brown@example.com', 'Bob', 'Brown'),
('charlie.davis@example.com', 'Charlie', 'Davis'),
('emily.clark@example.com', 'Emily', 'Clark'),
('michael.johnson@example.com', 'Michael', 'Johnson'),
('sarah.wilson@example.com', 'Sarah', 'Wilson'),
('david.martin@example.com', 'David', 'Martin'),
('linda.moore@example.com', 'Linda', 'Moore'),
('james.taylor@example.com', 'James', 'Taylor'),
('patricia.anderson@example.com', 'Patricia', 'Anderson'),
('robert.thomas@example.com', 'Robert', 'Thomas'),
('barbara.jackson@example.com', 'Barbara', 'Jackson'),
('william.white@example.com', 'William', 'White'),
('elizabeth.harris@example.com', 'Elizabeth', 'Harris'),
('charles.lewis@example.com', 'Charles', 'Lewis'),
('jennifer.walker@example.com', 'Jennifer', 'Walker'),
('joseph.hall@example.com', 'Joseph', 'Hall'),
('maria.allen@example.com', 'Maria', 'Allen');

-- Insert dummy data into donaciones table
INSERT INTO donaciones (id_donante, campana, fecha, cantidad, tipo, estado, pais) VALUES
(1, 'reproductiva', '2023-01-15', 100, 'digital', 'California', 'USA'),
(2, 'agua', '2023-02-20', 200, 'efectivo', 'Ontario', 'Canada'),
(3, 'nutricion', '2023-03-10', 150, 'digital', 'England', 'UK'),
(4, 'reproductiva', '2023-04-05', 250, 'digital', 'New South Wales', 'Australia'),
(5, 'agua', '2023-05-25', 300, 'efectivo', 'Maharashtra', 'India'),
(1, 'nutricion', '2023-06-15', 120, 'digital', 'California', 'USA'),
(2, 'reproductiva', '2023-07-20', 220, 'digital', 'Ontario', 'Canada'),
(3, 'agua', '2023-08-10', 180, 'efectivo', 'England', 'UK'),
(4, 'nutricion', '2023-09-05', 260, 'digital', 'New South Wales', 'Australia'),
(5, 'reproductiva', '2023-10-25', 320, 'digital', 'Maharashtra', 'India'),
(6, 'agua', '2023-11-15', 400, 'efectivo', 'California', 'USA'),
(7, 'nutricion', '2023-12-20', 500, 'digital', 'Ontario', 'Canada'),
(8, 'reproductiva', '2024-01-10', 600, 'digital', 'England', 'UK'),
(9, 'agua', '2024-02-05', 700, 'efectivo', 'New South Wales', 'Australia'),
(10, 'nutricion', '2024-03-25', 800, 'efectivo', 'Maharashtra', 'India'),
(11, 'reproductiva', '2024-04-15', 900, 'digital', 'California', 'USA'),
(12, 'agua', '2024-05-20', 1000, 'efectivo', 'Ontario', 'Canada'),
(13, 'nutricion', '2024-06-10', 1100, 'efectivo', 'England', 'UK'),
(14, 'reproductiva', '2024-07-05', 1200, 'digital', 'New South Wales', 'Australia'),
(15, 'agua', '2024-08-25', 1300, 'efectivo', 'Maharashtra', 'India'),
(16, 'nutricion', '2024-09-15', 1400, 'efectivo', 'California', 'USA'),
(17, 'reproductiva', '2024-10-20', 1500, 'digital', 'Ontario', 'Canada'),
(18, 'agua', '2024-11-10', 1600, 'efectivo', 'England', 'UK'),
(19, 'nutricion', '2024-12-05', 1700, 'efectivo', 'New South Wales', 'Australia'),
(20, 'reproductiva', '2025-01-25', 1800, 'digital', 'Maharashtra', 'India');

-- Insert dummy data into stats table
INSERT INTO stats (total_donaciones, total_donantes) VALUES
(2000, 20);