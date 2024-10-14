import * as db from './crm.mysql.js'

export const login = async (username, password) => {
  try {
      const user = await db.verifyPassword(username, password);
      return user;
    } catch (error) {
        throw error;
    }
};

//Donanciones
export const getDonaciones = async (req) => {
    try {
        const result = await db.getDonaciones(req);
        return result;
    }
    catch (error) {
        throw error;
    }
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

export const createDonacion = async (req) => {
    try {
        const result = await db.createDonacion(req);
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
export const getUsuarios = async (req) => {
    try {
        const result = await db.getUsuarios(req);
        return result;
    }
    catch (error) {
        throw error;
    }
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
export const getDonantes = async (req) => {
    try {
        const result = await db.getDonantes(req);
        return result;
    }
    catch (error) {
        throw error;
    }
}

export const getDonanteByEmail = async (email) => {
    try {
        const result = await db.getDonanteByEmail(email);
        return result;
    }
    catch (error) {
        throw error;
    }
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

export const createDonante = async (req) => {
    try {
        const result = await db.createDonante(req);
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
