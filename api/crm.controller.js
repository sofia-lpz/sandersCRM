import jwt from 'jsonwebtoken';
import * as crmService from './crm.service.js';
import { response } from 'express';

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await crmService.login(username, password);
        if (user) {
            // Generate a JWT token
            const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            const role = user.role;
            res.send({ status: "OK", token, role });
            console.log(`User ${username} logged in`);
        }
    } catch (error) {
        if (error.message === 'User not found' || error.message === 'Invalid password') {
            res.status(401).send({ status: "Error", message: "Invalid credentials" });
        } else {
            console.error(error);
            res.status(500).send({ status: "Error", message: "Internal Server Error" });
        }
    }
};

//Donanciones
export const getDonaciones = async (req, res) => {
    try {
        if ("_sort" in req.query) {
            let start = Number(req.query._start);
            let end = Number(req.query._end);

            let data = await crmService.getDonaciones(req);

            res.set("Access-Control-Expose-Headers", "X-Total-Count");
            res.set("X-Total-Count", data.length);
            res.set("Content-Range", `${start}-${end}/${data.length}`);
            data = data.slice(start, end);
            res.json(data);
        } else {
            let data = await crmService.getDonaciones(req);
            res.set("Access-Control-Expose-Headers", "X-Total-Count");
            res.set("X-Total-Count", data.length);
            res.set("Content-Range", `0-${data.length}/${data.length}`);
            res.json(data);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// TODO: Add validation for the fields in updates: robustness
export const updateDonacion = async (req, res) => {
    if (!req.body.id_donante || !req.body.campana || !req.body.fecha || !req.body.cantidad || !req.body.tipo) {
        res.status(400).json({ error: "Data is required" });
        return;
    } else if (req.body.cantidad <= 0) {
        res.status(400).json({ error: "Cantidad must be greater than 0" });
        return;
    } else if (req.body.fecha.length > 10) {
        req.body.fecha = req.body.fecha.slice(0, 10);
    }
    console.log(req.body.fecha);
    try {
        const data = await crmService.updateDonacion(req.params.id, req.body);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//send email here
export const createDonacion = async (req, res) => {
    try {
        const newData = await crmService.createDonacion(req);
        res.json(newData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteDonacion = async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: "ID is required" });
        return;
    }
    try {
        const data = await crmService.deleteDonacion(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOneDonacion = async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: "ID is required" });
        return;
    }
try {
    const data = await crmService.getOneDonacion(req.params.id);
    res.json(data);
} catch (error) {
    res.status(500).json({ error: error.message });
}
};
// Donaciones End

//Usuarios
export const getUsuarios = async (req, res) => {
    try {
        if ("_sort" in req.query) {
            let start = Number(req.query._start);
            let end = Number(req.query._end);

            let data = await crmService.getUsuarios(req);

            res.set("Access-Control-Expose-Headers", "X-Total-Count");
            res.set("X-Total-Count", data.length);
            res.set("Content-Range", `${start}-${end}/${data.length}`);
            data = data.slice(start, end);
            res.json(data);
        } else {
            let data = await crmService.getUsuarios(req);
            res.set("Access-Control-Expose-Headers", "X-Total-Count");
            res.set("X-Total-Count", data.length);
            res.set("Content-Range", `0-${data.length}/${data.length}`);
            res.json(data);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateUsuario = async (req, res) => {
    try {
        const data = await crmService.updateUsuario(req.params.id, req.body);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createUsuario = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const userId = await crmService.createUsuario(username, password, role);
        res.json({ id: userId, username, role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteUsuario = async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: "ID is required" });
        return;
    }
    try {
        const data = await crmService.deleteUsuario(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOneUsuario = async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: "ID is required" });
        return;
    }
    try {
        const data = await crmService.getOneUsuario(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//Usuarios End

//Donantes
export const getDonantes = async (req, res) => {
    try {
        if ("_sort" in req.query) {
            let start = Number(req.query._start);
            let end = Number(req.query._end);

            let data = await crmService.getDonantes(req);

            res.set("Access-Control-Expose-Headers", "X-Total-Count");
            res.set("X-Total-Count", data.length);
            res.set("Content-Range", `${start}-${end}/${data.length}`);
            data = data.slice(start, end);
            res.json(data);
        } else {
            let data = await crmService.getDonantes(req);
            res.set("Access-Control-Expose-Headers", "X-Total-Count");
            res.set("X-Total-Count", data.length);
            res.set("Content-Range", `0-${data.length}/${data.length}`);
            res.json(data);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateDonante = async (req, res) => {
    try {
        const data = await crmService.updateDonante(req.params.id, req.body);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createDonante = async (req, res) => {
    try {
        const newData = await crmService.createDonante(req);
        res.json(newData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteDonante = async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: "ID is required" });
        return;
    }
    try {
        const data = await crmService.deleteDonante(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOneDonante = async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: "ID is required" });
        return;
    }
    try {
        const data = await crmService.getOneDonante(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//Donantes End

// extra
export const getDonacionesDashboardTotal = async (req, res) => {
    try {
        const data = await crmService.getDonacionesDashboardTotal();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getDonacionesDashboard = async (req, res) => {
    try {
        const data = await crmService.getDonacionesDashboard(req.params.tipo);
        res.set("Access-Control-Expose-Headers", "X-Total-Count");
        res.set("X-Total-Count", data.length);
        res.set("Content-Range", `0-${data.length}/${data.length}`);
        
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
