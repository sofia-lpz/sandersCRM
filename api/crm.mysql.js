import mysql from "mysql2/promise";

async function connectToDB() {
    return await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
    });
}

async function getUserByUsername(username) {
    const conn = await connectToDB();
    const [rows] = await conn.execute(
        "SELECT * FROM usuarios WHERE username = ?",
        [username]
    );
    conn.end();
    return rows[0];
}

async function getList(resource, { sort, range, filter }) {
    const conn = await connectToDB();
  
    // Construct WHERE clause manually
    const whereClause = Object.keys(filter)
        .map(key => `${mysql.escapeId(key)} = ?`)
        .join(' AND ');
    const queryParams = Object.values(filter);
  
    // Query to get the total count
    const countQuery = `SELECT COUNT(*) as total FROM ${mysql.escapeId(resource)} WHERE ${whereClause}`;
    const [countRows] = await conn.execute(countQuery, queryParams);
    const total = countRows[0].total;
  
    // Query to get the data
    const dataQuery = `
        SELECT * FROM ${mysql.escapeId(resource)} 
        WHERE ${whereClause}
        ORDER BY ${mysql.escapeId(sort[0])} ${mysql.escape(sort[1])} 
        LIMIT ? OFFSET ?
    `;
    const [dataRows] = await conn.execute(
        dataQuery,
        [...queryParams, range[1] - range[0] + 1, range[0]]
    );
  
    conn.end();
    return { data: dataRows, total };
  }

async function getOne(resource, id) {
    const conn = await connectToDB();
    const [rows] = await conn.execute(
        `SELECT * FROM ${mysql.escapeId(resource)} WHERE id = ?`,
        [id]
    );
    conn.end();
    return rows[0];
}

async function getMany(resource, filter) {
    const conn = await connectToDB();
    // Construct WHERE clause manually
    const whereClause = Object.keys(filter)
        .map(key => `${mysql.escapeId(key)} = ?`)
        .join(' AND ');
    const queryParams = Object.values(filter);
    const query = `SELECT * FROM ${mysql.escapeId(resource)} WHERE ${whereClause}`;
    const [rows] = await conn.execute(query, queryParams);
    conn.end();
    return rows;
}

async function getManyReference(resource, id, relatedResource, { sort, range }) {
    const conn = await connectToDB();
    const query = `
        SELECT * FROM ${mysql.escapeId(relatedResource)} 
        WHERE ${mysql.escapeId(resource)} = ? 
        ORDER BY ${mysql.escapeId(sort[0])} ${mysql.escape(sort[1])} 
        LIMIT ? OFFSET ?
    `;
    const [rows] = await conn.execute(
        query,
        [id, range[1] - range[0], range[0]]
    );
    conn.end();
    return rows;
}

async function create(resource, data) {
    const conn = await connectToDB();
    const [result] = await conn.execute(
        `INSERT INTO ${mysql.escapeId(resource)} SET ?`,
        [data]
    );
    conn.end();
    return { id: result.insertId, ...data };
}

async function update(resource, id, data) {
    const conn = await connectToDB();
    const [result] = await conn.execute(
        `UPDATE ${mysql.escapeId(resource)} SET ? WHERE id = ?`,
        [data, id]
    );
    conn.end();
    return { id, ...data };
}

async function updateMany(resource, ids, data) {
    const conn = await connectToDB();
    const query = `
        UPDATE ${mysql.escapeId(resource)} SET ? 
        WHERE id IN (${ids.map(() => '?').join(', ')})
    `;
    const [result] = await conn.execute(query, [data, ...ids]);
    conn.end();
    return { ids, ...data };
}

async function deleteOne(resource, id) {
    const conn = await connectToDB();
    await conn.execute(
        `DELETE FROM ${mysql.escapeId(resource)} WHERE id = ?`,
        [id]
    );
    conn.end();
    return { id };
}

async function deleteMany(resource, ids) {
    const conn = await connectToDB();
    const query = `DELETE FROM ${mysql.escapeId(resource)} WHERE id IN (${ids.map(() => '?').join(', ')})`;
    await conn.execute(query, ids);
    conn.end();
    return { ids };
}

export { 
    getUserByUsername,
    getList, 
    getOne, 
    getMany, 
    getManyReference, 
    create, 
    update, 
    updateMany, 
    deleteOne, 
    deleteMany 
};
