import * as db from './crm.mysql.js'

export const login = async (username, password) => {
  try {
      const user = await db.verifyPassword(username, password);
      return user;
    } catch (error) {
        throw error;
    }
};

/*
const createUser = async (username, password, role) => {
    try {
        const userId = await db.createUser(username, password, role);
        return userId;
    } catch (error) {
        throw error;
    }
}
*/

//Donanciones
export const getDonaciones = async (query) => {
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

export const updateDonacion = async (id, updateData) => {
    try {
        const result = await db.updateDonacion(Number(id), updateData);
        return result;
    }
    catch (error) {
        throw error;
    }
};

export const createDonacion = async (newData) => {
    try {
        const result = await db.createDonacion(newData);
        return result;
    }
    catch (error) {
        throw error;
    }
};

export const deleteDonacion = async (id) => {
    try {
        const result = await db.deleteDonacion(Number(id));
        return result;
    }
    catch (error) {
        throw error;
    }
};

export const getOneDonacion = async (id) => {
    try {
        const result = await db.getOneDonacion(Number(id));
        return result;
    }
    catch (error) {
        throw error;
    }
}
//Donaciones end

//Usuarios
export const getUsuarios = async (query) => {
    let result;
    let totalCount;
    const columns = ["username", "role"];
    
    if ("_sort" in query) {
        let sortBy = query._sort;
        let sortOrder = query._order === "ASC" ? 'ASC' : 'DESC';
        let start = Number(query._start);
        let end = Number(query._end);

        const [rows] = await db.query(
            `SELECT ${columns} FROM usuarios ORDER BY ?? ${sortOrder} LIMIT ?, ?`, 
            [sortBy, start, end - start]
        );
        const [count] = await db.query(`SELECT COUNT(*) AS total FROM usuarios`);
        totalCount = count[0].total;
        result = rows;
    } else if ("id" in query) {
        const ids = query.id.map(Number);
        const [rows] = await db.query(`SELECT ${columns} FROM usuarios WHERE id_usuario IN (?)`, [ids]);
        result = rows;
    } else {
        const [rows] = await db.query(`SELECT ${columns} FROM usuarios`);
        const [count] = await db.query(`SELECT COUNT(*) AS total FROM usuarios`);
        totalCount = count[0].total;
        result = rows;
    }

    return { result, totalCount };
}

export const updateUsuario = async (id, updateData) => {
    try {
        const result = await db.updateUsuario(Number(id), updateData);
        return result;
    }
    catch (error) {
        throw error;
    }
};

export const createUsuario = async (username, password, role) => {
    try {
        const result = await db.createUsuario(username, password, role);
        return result;
    }
    catch (error) {
        throw error;
    }
};

export const deleteUsuario = async (id) => {
    try {
        const result = await db.deleteUsuario(Number(id));
        return result;
    }
    catch (error) {
        throw error;
    }
};

export const getOneUsuario = async (id) => {
    try {
        const result = await db.getOneUsuario(Number(id));
        return result;
    }
    catch (error) {
        throw error;
    }
}   
//Usuarios end

//Donantes
export const getDonantes = async (query) => {
    let result;
    let totalCount;
    
    if ("_sort" in query) {
        let sortBy = query._sort;
        let sortOrder = query._order === "ASC" ? 'ASC' : 'DESC';
        let start = Number(query._start);
        let end = Number(query._end);

        const [rows] = await db.query(
            `SELECT * FROM donantes ORDER BY ?? ${sortOrder} LIMIT ?, ?`, 
            [sortBy, start, end - start]
        );
        console.log (`SELECT * FROM donantes ORDER BY ?? ${sortOrder} LIMIT ?, ?`, 
            [sortBy, start, end - start])
        const [count] = await db.query(`SELECT COUNT(*) AS total FROM donantes`);
        totalCount = count[0].total;
        result = rows;
    } else if ("id" in query) {
        const ids = query.id.map(Number);
        const [rows] = await db.query(`SELECT * FROM donantes WHERE id_donante IN (?)`, [ids]);
        result = rows;
    } else {
        const [rows] = await db.query(`SELECT * FROM donantes`);
        const [count] = await db.query(`SELECT COUNT(*) AS total FROM donantes`);
        totalCount = count[0].total;
        result = rows;
    }

    return { result, totalCount };
}

export const updateDonante = async (id, updateData) => {
    try {
        const result = await db.updateDonante(Number(id), updateData);
        return result;
    }
    catch (error) {
        throw error;
    }
};

export const createDonante = async (newData) => {
    try {
        const result = await db.createDonante(newData);
        return result;
    }
    catch (error) {
        throw error;
    }
};

export  const deleteDonante = async (id) => {
    try {
        const result = await db.deleteDonante(Number(id));
        return result;
    }
    catch (error) {
        throw error;
    }
};

export const getOneDonante = async (id) => {
    try {
        const result = await db.getOneDonante(Number(id));
        return result;
    }
    catch (error) {
        throw error;
    }
}
//Donantes end

export const getDonacionesDashboardTotal = async () => {
    try {
        const result = await db.getDonacionesDashboardTotal();
        return result;
    }
    catch (error) {
        throw error;
    }
}

export const getDonacionesDashboard = async (tipo) => {
    try {
        const result = await db.getDonacionesDashboard(tipo);
        return result;
    }
    catch (error) {
        throw error;
    }
}
