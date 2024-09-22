import * as db from './crm.mysql.js'

const login = async (username, password) => {
  try {
      const user = await db.verifyPassword(username, password);
      return user;
    } catch (error) {
        throw error;
    }
};

const createUser = async (username, password, sudo) => {
    try {
        const userId = await db.createUser(username, password, sudo);
        return userId;
    } catch (error) {
        throw error;
    }
}

const getDonaciones = async (query) => {
    let result;
    let totalCount;
    
    if ("_sort" in query) {
        let sortBy = query._sort;
        let sortOrder = query._order === "ASC" ? 'ASC' : 'DESC';
        let start = Number(query._start);
        let end = Number(query._end);

        const [rows] = await db.query(
            `SELECT * FROM donaciones ORDER BY ?? ${sortOrder} LIMIT ?, ?`, 
            [sortBy, start, end - start]
        );
        const [count] = await db.query(`SELECT COUNT(*) AS total FROM donaciones`);
        totalCount = count[0].total;
        result = rows;
    } else if ("id" in query) {
        const ids = query.id.map(Number);
        const [rows] = await db.query(`SELECT * FROM donaciones WHERE id_donacion IN (?)`, [ids]);
        result = rows;
    } else {
        const [rows] = await db.query(`SELECT * FROM donaciones`);
        const [count] = await db.query(`SELECT COUNT(*) AS total FROM donaciones`);
        totalCount = count[0].total;
        result = rows;
    }

    return { result, totalCount };
};

const updateDonacion = async (id, updateData) => {
    const [result] = await db.query(`UPDATE donaciones SET ? WHERE id_donacion = ?`, [updateData, Number(id)]);
    return result;
};

const createDonacion = async (newData) => {
    const [result] = await db.query(`INSERT INTO donaciones SET ?`, [newData]);
    return { id_donacion: result.insertId, ...newData };
};

const deleteDonacion = async (id) => {
    const [result] = await db.query(`DELETE FROM donaciones WHERE id_donacion = ?`, [Number(id)]);
    return result;
};

export {
    login,
    getDonaciones,
    updateDonacion,
    createDonacion,
    deleteDonacion,
    createUser
};
