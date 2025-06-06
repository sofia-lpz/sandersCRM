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

export async function countAdminUsers() {
    const conn = await connectToDB();
    const [rows] = await conn.execute("SELECT COUNT(*) as count FROM usuarios WHERE role = 'admin'");
    conn.end();
    return rows[0].count;
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

export async function getDonanteByEmail(email) {
    const conn = await connectToDB();
    const [rows] = await conn.execute(
        "SELECT * FROM donantes WHERE email = ?",
        [email]
    );
    conn.end();
    return rows[0];
}

//Donaciones
export const getDonaciones = async (req) => {
        try {
            const connection = await connectToDB();
            let query = "SELECT * FROM donaciones";
            let params = [];
            let ids = [];
    
            const filters = [];
    
            if ("id" in req.query) {
                for (let index = 0; index < req.query.id.length; index++) {
                    ids.push(Number(req.query.id[index]));
                }
                filters.push("id IN (" + ids.map(() => "?").join(",") + ")");
                params = params.concat(ids);
            }
    
            if ("q" in req.query) {
                const searchValue = `%${req.query.q}%`;
                filters.push("(tipo LIKE ? OR campana LIKE ? OR estado LIKE ? OR pais LIKE ? OR cantidad LIKE ?)");
                params.push(searchValue, searchValue, searchValue, searchValue, searchValue);
            }
            
            for (const [key, value] of Object.entries(req.query)) {
                if (key !== "_sort" && key !== "_order" && key !== "_start" && key !== "_end" && key !== "id" && key !== "q" && key !== "fecha_gte" && key !== "fecha_lte" && key !== "cantidad_min" && key !== "cantidad_max") {
                    filters.push(`${connection.escapeId(key)} = ?`);
                    params.push(value);
                }
            }

            if ("fecha_gte" in req.query) {
                filters.push("fecha >= ?");
                params.push(req.query.fecha_gte);
            }

            if ("fecha_lte" in req.query) {
                filters.push("fecha <= ?");
                params.push(req.query.fecha_lte);
            }

            if ("cantidad_min" in req.query) {
                filters.push("cantidad >= ?");
                params.push(req.query.cantidad_min);
            }

            if ("cantidad_max" in req.query) {
                filters.push("cantidad <= ?");
                params.push(req.query.cantidad_max);
            }
            
            if (filters.length > 0) {
                query += " WHERE " + filters.join(" AND ");
            }
    
            // Sorting and pagination
            if ("_sort" in req.query) {
                let sortBy = req.query._sort;
                let sortOrder = req.query._order === "ASC" ? "ASC" : "DESC";
                let start = Number(req.query._start) || 0;
                let end = Number(req.query._end) || 10;
    
                query += ` ORDER BY ${connection.escapeId(sortBy)} ${sortOrder} LIMIT ?, ?`;
                params.push(start, end - start);
            }

            console.log(query);
            const [data] = await connection.query(query, params);

            const formattedData = data.map(row => ({
                ...row,
                fecha: new Date(row.fecha).toISOString().split('T')[0] // Format date as YYYY-MM-DD
            }));

            return formattedData;
        } catch (error) {
            throw error;
        }
    }

export async function updateDonacion(updateData) {
    try{
    const conn = await connectToDB();

    const keys = Object.keys(updateData);
    const values = Object.values(updateData);
    const setClause = keys.map(key => `${key} = ?`).join(', ');
    
    values.push(updateData.id);
    const query = `UPDATE donaciones SET ${setClause} WHERE id = ?`;
    
    await conn.execute(query, values);
    
    const [updatedRow] = await conn.execute("SELECT * FROM donaciones WHERE id = ?", [updateData.id]);
    conn.end();
    return updatedRow[0];
    }
    catch (error) {
        throw error;
    }
}

export const createDonacion = async (req) => {
    try {
        const conn = await connectToDB();
        const {
            id_donante,
            campana,
            fecha = new Date().toISOString().split('T')[0],
            cantidad = 0,
            tipo = 'digital',
            estado = 'Sin registro', 
            pais = 'Sin registro'
        } = req.body;

        const query = `
            INSERT INTO donaciones (id_donante, campana, fecha, cantidad, tipo, estado, pais)
            VALUES (?, ?, ?, ?, ?, ?, ?);
        `;
        const [result] = await conn.execute(query, [id_donante, campana, fecha, cantidad, tipo, estado, pais]);

        const [newData] = await conn.execute("SELECT * FROM donaciones WHERE id = ?", [result.insertId]);
        conn.end();
        return newData[0];
    } catch (error) {
        throw error;
    }
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
export async function getUsuarios(req) {
    try {
        const connection = await connectToDB();
        let query = "SELECT * FROM usuarios";
        let params = [];
        let ids = [];

        const filters = [];

        if ("id" in req.query) {
            for (let index = 0; index < req.query.id.length; index++) {
                ids.push(Number(req.query.id[index]));
            }
            filters.push("id IN (" + ids.map(() => "?").join(",") + ")");
            params = params.concat(ids);
        }

        if ("q" in req.query) {
            const searchValue = `%${req.query.q}%`;
            filters.push("(username LIKE ? OR role LIKE ?)");
            params.push(searchValue, searchValue);
        }
        
        for (const [key, value] of Object.entries(req.query)) {
            if (key !== "_sort" && key !== "_order" && key !== "_start" && key !== "_end" && key !== "id" && key !== "q") {
                filters.push(`${connection.escapeId(key)} = ?`);
                params.push(value);
            }
        }
        
        if (filters.length > 0) {
            query += " WHERE " + filters.join(" AND ");
        }

        // Sorting and pagination
        if ("_sort" in req.query) {
            let sortBy = req.query._sort;
            let sortOrder = req.query._order === "ASC" ? "ASC" : "DESC";
            let start = Number(req.query._start) || 0;
            let end = Number(req.query._end) || 10;

            query += ` ORDER BY ${connection.escapeId(sortBy)} ${sortOrder} LIMIT ?, ?`;
            params.push(start, end - start);
        }

        console.log(query);
        const [data] = await connection.query(query, params);
        return data;
    } catch (error) {
        throw error;
    }
}

export async function updateUsuario(id, updateData) {
    try{
    const conn = await connectToDB();

    const keys = Object.keys(updateData);
    const values = Object.values(updateData);
    const setClause = keys.map(key => `${key} = ?`).join(', ');
    
    values.push(id);
    const query = `UPDATE usuarios SET ${setClause} WHERE id = ?`;
    
    await conn.execute(query, values);
    
    const [updatedRow] = await conn.execute("SELECT * FROM usuarios WHERE id = ?", [id]);
    conn.end();
    return updatedRow[0];
    }
    catch (error) {
        throw error;
    }
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
export async function getDonantes(req) {
    try {
        const connection = await connectToDB();
        let query = "SELECT * FROM donantes";
        let params = [];
        let ids = [];

        const filters = [];

        if ("id" in req.query) {
            for (let index = 0; index < req.query.id.length; index++) {
                ids.push(Number(req.query.id[index]));
            }
            filters.push("id IN (" + ids.map(() => "?").join(",") + ")");
            params = params.concat(ids);
        }

        if ("q" in req.query) {
            const searchValue = `%${req.query.q}%`;
            filters.push("(telefono LIKE ? OR email LIKE ? OR nombre LIKE ? OR apellido LIKE ?)");
            params.push(searchValue, searchValue, searchValue, searchValue);
        }
        
        for (const [key, value] of Object.entries(req.query)) {
            if (key !== "_sort" && key !== "_order" && key !== "_start" && key !== "_end" && key !== "id" && key !== "q") {
                filters.push(`${connection.escapeId(key)} = ?`);
                params.push(value);
            }
        }
        
        if (filters.length > 0) {
            query += " WHERE " + filters.join(" AND ");
        }

        // Sorting and pagination
        if ("_sort" in req.query) {
            let sortBy = req.query._sort;
            let sortOrder = req.query._order === "ASC" ? "ASC" : "DESC";
            let start = Number(req.query._start) || 0;
            let end = Number(req.query._end) || 10;

            query += ` ORDER BY ${connection.escapeId(sortBy)} ${sortOrder} LIMIT ?, ?`;
            params.push(start, end - start);
        }

        console.log(query);
        const [data] = await connection.query(query, params);
        return data;
    } catch (error) {
        throw error;
    }
}

export async function updateDonante(id, updateData) {
    try{
        const conn = await connectToDB();
    
        const keys = Object.keys(updateData);
        const values = Object.values(updateData);
        const setClause = keys.map(key => `${key} = ?`).join(', ');
        
        values.push(id);
        const query = `UPDATE donantes SET ${setClause} WHERE id = ?`;
        
        await conn.execute(query, values);
        
        const [updatedRow] = await conn.execute("SELECT * FROM donantes WHERE id = ?", [id]);
        conn.end();
        return updatedRow[0];
        }
        catch (error) {
            throw error;
        }
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

export async function createDonante(req) {
    try {
        const conn = await connectToDB();
        const {
            email = 'Sin registro',
            nombre = 'Sin registro',
            apellido = 'Sin registro',
        } = req.body;

        const query = `
            INSERT INTO donantes (email, nombre, apellido)
            VALUES (?, ?, ?);
        `;
        const [result] = await conn.execute(query, [email, nombre, apellido]);

        const [newData] = await conn.execute("SELECT * FROM donantes WHERE id = ?", [result.insertId]);
        conn.end();
        return newData[0];
    } catch (error) {
        throw error;
    }
}
//Donantes end

//Dashboard
export async function getDonacionesDashboardTotal() {
    const conn = await connectToDB();
    const [rows] = await conn.execute(
        `SELECT tipo, SUM(cantidad) AS total, COUNT(DISTINCT id_donante) AS donantes 
         FROM donaciones 
         GROUP BY tipo`
    );
    conn.end();

    const result = rows.map(row => ({
        name: row.tipo.charAt(0).toUpperCase() + row.tipo.slice(1), // Capitalize first letter
        value: row.total,
        donantes: row.donantes
    }));

    // Ensure all types are included, even if they have no donations
    const types = ['Digital', 'Efectivo'];
    const formattedResult = types.map(type => {
        const found = result.find(r => r.name === type);
        return found ? found : { name: type, value: 0, donantes: 0 };
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