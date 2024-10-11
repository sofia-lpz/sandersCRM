import mysql from "mysql2/promise";
import bcrypt from "bcrypt";

async function connectToDB() {
    return await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
    });
}

export const query = async (query) => {
    const connection = await connectToDB();
    const [data] = await connection.query(query);
    connection.end();
    return data;
}

export async function verifyPassword(username, password) {
    const user = await getUserByUsername(username);
    if (!user) {
        throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.contraseña);
    if (!isMatch) {
        throw new Error('Invalid password');
    }
    return user;
}

export async function getUserByUsername(username) {
    const conn = await connectToDB();
    const [rows] = await conn.execute(
        "SELECT * FROM usuarios WHERE username = ?",
        [username]
    );
    conn.end();
    return rows[0];
}

//Donaciones
export const getDonaciones = async (req, res) => {
    try {
        const connection = await connectToDB();  // Assuming you're using a connection pool
        let query = "SELECT * FROM donaciones";
        let params = [];

        // Sorting and pagination
        if ("_sort" in req.query) {
            let sortBy = req.query._sort;
            let sortOrder = req.query._order === "ASC" ? "ASC" : "DESC";
            let start = Number(req.query._start) || 0;
            let end = Number(req.query._end) || 10;

            // Modify the query for sorting and pagination
            query += ` ORDER BY ${connection.escapeId(sortBy)} ${sortOrder} LIMIT ?, ?`;
            params.push(start, end - start);  // Limit takes (offset, count)

            // Execute the query
            const [data] = await connection.query(query, params);

            // Get the total count
            const [countResult] = await connection.query("SELECT COUNT(*) AS total FROM donaciones");
            const totalCount = countResult[0].total;

            return (data);

        } else if ("id" in req.query) {
            let ids = req.query.id;
            if (!Array.isArray(ids)) {
                ids = [ids];  // Convert to array if it's a single id
            }

            // Modify the query to fetch specific IDs
            query += ` WHERE id_donacion IN (${ids.map(() => '?').join(',')})`;
            params = ids;

            // Execute the query
            const [data] = await connection.query(query, params);
            return (data);

        } else {
            // Fetch all donations if no sorting or filtering
            const [data] = await connection.query(query);

            // Get the total count
            const [countResult] = await connection.query("SELECT COUNT(*) AS total FROM donaciones");
            const totalCount = countResult[0].total;

            // Set headers and return the data
            return (data);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createDonacion = async ({ id_usuario, fecha, cantidad, tipo, estado, pais }) => {
    const query = `
        INSERT INTO donaciones (id_usuario, fecha, cantidad, tipo, estado, pais)
        VALUES (?, ?, ?, ?, ?, ?);
    `;
    const connection = await connectToDB();
    const [result] = await connection.execute(query, [id_usuario, fecha, cantidad, tipo, estado, pais]);
    connection.end();
    return result.insertId;
};

export const deleteDonacion = async (id) => {
    const connection = await connectToDB();
    const [result] = await connection.execute(
        "DELETE FROM donaciones WHERE id = ?",
        [id]
    );
    connection.end();
    return result.affectedRows;
}

export async function updateDonacion(id, donacionData) {
    const { id_usuario, fecha, cantidad, tipo, estado, pais } = donacionData;
    const conn = await connectToDB();
    const [result] = await conn.execute(
        `UPDATE donaciones SET id_usuario = ?, fecha = ?, cantidad = ?, tipo = ?, estado = ?, pais = ? WHERE id = ?`,
        [id_usuario, fecha, cantidad, tipo, estado, pais, id]
    );
    conn.end();
    return result;
}

export async function getOneDonacion(id) {
    const conn = await connectToDB();
    const [rows] = await conn.execute(
        "SELECT * FROM donaciones WHERE id = ?",
        [id]
    );
    conn.end();
    return rows[0];
}
//Donaciones end

//Usuarios
export async function getUsuarios(query) {
    const conn = await connectToDB();
    let sql = "SELECT * FROM usuarios";
    let params = [];

    if ("_sort" in query) {
        let sortBy = query._sort;
        let sortOrder = query._order === "ASC" ? "ASC" : "DESC";
        let start = Number(query._start) || 0;
        let end = Number(query._end) || 10;

        sql += ` ORDER BY ${conn.escapeId(sortBy)} ${sortOrder} LIMIT ?, ?`;
        params.push(start, end - start);
    }

    const [rows] = await conn.query(sql, params);
    conn.end();
    return rows;
}

export async function updateUsuario(id, updateData) {
    const conn = await connectToDB();
    const [result] = await conn.execute(
        `UPDATE usuarios SET ? WHERE id = ?`,
        [updateData, id]
    );
    conn.end();
    return result;
}

export async function deleteUsuario(id) {
    const conn = await connectToDB();
    const [result] = await conn.execute(
        "DELETE FROM usuarios WHERE id = ?",
        [id]
    );
    conn.end();
    return result;
}

export async function getOneUsuario(id) {
    const conn = await connectToDB();
    const [rows] = await conn.execute(
        "SELECT * FROM usuarios WHERE id = ?",
        [id]
    );
    conn.end();
    return rows[0];
}

export async function createUsuario(username, password, role) {
    if (!username || !password || !role) {
        throw new Error('Username, password, and role are required');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const conn = await connectToDB();
    try {
        const [result] = await conn.execute(
            "INSERT INTO usuarios (username, contraseña, role) VALUES (?, ?, ?)",
            [username, hashedPassword, role]
        );
        conn.end();
        return result.insertId;
    } catch (error) {
        conn.end();
        if (error.code === 'ER_DUP_ENTRY') {
            throw new Error('Username already exists');
        }
        throw error;
    }
}
//Usuarios End

//Donantes
export async function getDonantes(query) {
    const conn = await connectToDB();
    let sql = "SELECT * FROM donantes";
    let params = [];

    if ("_sort" in query) {
        let sortBy = query._sort;
        let sortOrder = query._order === "ASC" ? "ASC" : "DESC";
        let start = Number(query._start) || 0;
        let end = Number(query._end) || 10;

        sql += ` ORDER BY ${conn.escapeId(sortBy)} ${sortOrder} LIMIT ?, ?`;
        params.push(start, end - start);

        console.log(`SQL Query: ${sql}`);
        console.log(`Params: ${params}`);
    }

    const [rows] = await conn.query(sql, params);
    conn.end();
    return rows;
}

export async function updateDonante(id, updateData) {
    const conn = await connectToDB();
    const [result] = await conn.execute(
        `UPDATE donantes SET ? WHERE id = ?`,
        [updateData, id]
    );
    conn.end();
    return result;
}

export async function deleteDonante(id) {
    const conn = await connectToDB();
    const [result] = await conn.execute(
        "DELETE FROM donantes WHERE id = ?",
        [id]
    );
    conn.end();
    return result;
}

export async function getOneDonante(id) {
    const conn = await connectToDB();
    const [rows] = await conn.execute(
        "SELECT * FROM donantes WHERE id = ?",
        [id]
    );
    conn.end();
    return rows[0];
}

export async function createDonante({ nombre, apellido, email }) {
    const conn = await connectToDB();
    const [result] = await conn.execute(
        "INSERT INTO donantes (nombre, apellido, email) VALUES (?, ?, ?)",
        [nombre, apellido, email]
    );
    const [rows] = await conn.execute(
        "SELECT * FROM donantes WHERE id = ?",
        [result.insertId]
    );
    conn.end();
    return rows[0]; // Return the newly created record
}
//Donantes end

//Dashboard
export async function getDonacionesDashboardTotal() {
    const conn = await connectToDB();
    const [rows] = await conn.execute(
        "SELECT tipo, SUM(cantidad) AS total FROM donaciones GROUP BY tipo"
    );
    conn.end();

    const result = rows.map(row => ({
        name: row.tipo.charAt(0).toUpperCase() + row.tipo.slice(1), // Capitalize first letter
        value: row.total
    }));

    // Ensure all types are included, even if they have no donations
    const types = ['Digital', 'Efectivo'];
    const formattedResult = types.map(type => {
        const found = result.find(r => r.name === type);
        return found ? found : { name: type, value: 0 };
    });

    return formattedResult;
}

export async function getDonacionesDashboard(tipo) {
    const conn = await connectToDB();
    const [rows] = await conn.execute(
        "SELECT SUM(cantidad) AS total FROM donaciones WHERE tipo = ?",
        [tipo]
    );
    conn.end();
    return rows;
}