import jwt from 'jsonwebtoken';
import * as crmService from './crm.service.js';
import * as crmMysql from './crm.mysql.js';

const login = async (req, res) => {
    console.log('Login request');
    try {
        const { username, password } = req.body;
        const user = await crmService.login(username, password);
        if (user) {
            // Generate a JWT token
            const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.send({ status: "OK", token });
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

const createUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const userId = await crmService.createUser(username, password, role);
        res.json({ id: userId, username, role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getDonaciones = async (req, res) => {
    try {
        if ("_sort" in req.query) {
            let sortBy = req.query._sort;
            let sortOrder = req.query._order === "ASC" ? 1 : -1;
            let start = Number(req.query._start);
            let end = Number(req.query._end);
            let sorter = {};
            sorter[sortBy] = sortOrder;

            let data = await crmMysql.getDonaciones(req, res);

            res.set("Access-Control-Expose-Headers", "X-Total-Count");
            res.set("X-Total-Count", data.length);
            res.set("Content-Range", `${start}-${end}/${data.length}`);
            data = data.slice(start, end);
            res.json(data);
        } else if ("id" in req.query) {
            let data = [];
            for (let index = 0; index < req.query.id.length; index++) {
                let dbData = await crmMysql.getDonaciones(req, res);
                data = data.concat(dbData);
            }
            res.json(data);
        } else {
            let data = await crmMysql.getDonaciones(req, res);
            res.set("Access-Control-Expose-Headers", "X-Total-Count");
            res.set("X-Total-Count", data.length);
            res.set("Content-Range", `0-${data.length}/${data.length}`);
            res.json(data);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateDonacion = async (req, res) => {
    try {
        const data = await crmService.updateDonacion(req.params.id, req.body);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createDonacion = async (req, res) => {
    try {
        const { id_usuario, fecha, cantidad, tipo, estado, pais } = req.body;
        const newData = await crmService.createDonacion({ id_usuario, fecha, cantidad, tipo, estado, pais });
        res.json(newData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteDonacion = async (req, res) => {
    try {
        const data = await crmService.deleteDonacion(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getOneDonacion = async (req, res) => {
try {
    const data = await crmService.getOneDonacion(req.params.id);
    res.json(data);
} catch (error) {
    res.status(500).json({ error: error.message });
}
};

const getUsuarios = async (req, res) => {
    try {
        if ("_sort" in req.query) {
            let sortBy = req.query._sort;
            let sortOrder = req.query._order === "ASC" ? 1 : -1;
            let start = Number(req.query._start);
            let end = Number(req.query._end);
            let sorter = {};
            sorter[sortBy] = sortOrder;

            let data = await crmMysql.getUsuarios(req, res);

            res.set("Access-Control-Expose-Headers", "X-Total-Count");
            res.set("X-Total-Count", data.length);
            res.set("Content-Range", `${start}-${end}/${data.length}`);
            data = data.slice(start, end);
            res.json(data);
        } else if ("id" in req.query) {
            let data = [];
            for (let index = 0; index < req.query.id.length; index++) {
                let dbData = await crmMysql.getUsuarios(req, res);
                data = data.concat(dbData);
            }
            res.json(data);
        } else {
            let data = await crmMysql.getUsuarios(req, res);
            res.set("Access-Control-Expose-Headers", "X-Total-Count");
            res.set("X-Total-Count", data.length);
            res.set("Content-Range", `0-${data.length}/${data.length}`);
            res.json(data);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateUsuario = async (req, res) => {
    try {
        const data = await crmService.updateUsuario(req.params.id, req.body);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUsuario = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const newData = await crmService.createUsuario({ username, password, role });
        res.json(newData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUsuario = async (req, res) => {
    try {
        const data = await crmService.deleteUsuario(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getOneUsuario = async (req, res) => {
    try {
        const data = await crmService.getOneUsuario(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getDonantes = async (req, res) => {
    try {
        if ("_sort" in req.query) {
            let sortBy = req.query._sort;
            let sortOrder = req.query._order === "ASC" ? 1 : -1;
            let start = Number(req.query._start);
            let end = Number(req.query._end);
            let sorter = {};
            sorter[sortBy] = sortOrder;

            let data = await crmMysql.getDonantes(req, res);

            res.set("Access-Control-Expose-Headers", "X-Total-Count");
            res.set("X-Total-Count", data.length);
            res.set("Content-Range", `${start}-${end}/${data.length}`);
            data = data.slice(start, end);
            res.json(data);
        } else if ("id" in req.query) {
            let data = [];
            for (let index = 0; index < req.query.id.length; index++) {
                let dbData = await crmMysql.getDonantes(req, res);
                data = data.concat(dbData);
            }
            res.json(data);
        } else {
            let data = await crmMysql.getDonantes(req, res);
            res.set("Access-Control-Expose-Headers", "X-Total-Count");
            res.set("X-Total-Count", data.length);
            res.set("Content-Range", `0-${data.length}/${data.length}`);
            res.json(data);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateDonante = async (req, res) => {
    try {
        const data = await crmService.updateDonante(req.params.id, req.body);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createDonante = async (req, res) => {
    try {
        const { nombre, apellido, email, telefono, pais } = req.body;
        const newData = await crmService.createDonante({ nombre, apellido, email });
        res.json(newData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteDonante = async (req, res) => {
    try {
        const data = await crmService.deleteDonante(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getOneDonante = async (req, res) => {
    try {
        const data = await crmService.getOneDonante(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getDonacionesDashboardTotal = async (req, res) => {
    try {
        const data = await crmService.getDonacionesDashboardTotal();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getDonacionesDashboard = async (req, res) => {
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

export {
    login,
    getDonaciones,
    updateDonacion,
    createDonacion,
    deleteDonacion,
    createUser,
    getOneDonacion,
    getUsuarios,
    updateUsuario,
    createUsuario,
    deleteUsuario,
    getOneUsuario,
    getDonantes,
    updateDonante,
    createDonante,
    deleteDonante,
    getOneDonante,
    getDonacionesDashboardTotal,
    getDonacionesDashboard
}