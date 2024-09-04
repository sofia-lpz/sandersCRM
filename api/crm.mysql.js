import mysql from "mysql2/promise";

async function connectToDB() {
    return await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
    });
  }

  async function login(username, password) {
    const conn = await connectToDB();
    const [rows] = await conn.execute(
      "SELECT * FROM usuarios WHERE username = ? AND contraseña = ?",
      [username, password]
    );
    conn.end();
    return rows[0];
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

    export { login, getUserByUsername };