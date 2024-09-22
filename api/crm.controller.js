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
        } else {
            res.status(401).send({ status: "Error", message: "Invalid credentials" });
            console.log(`Failed login attempt for user ${username}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "Error", message: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { username, password, sudo } = req.body;
        const userId = await crmService.createUser(username, password, sudo);
        res.json({ id: userId, username, sudo });
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
        const data = await crmService.createDonacion(req.body);
        res.json(data);
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

export {
    login,
    getDonaciones,
    updateDonacion,
    createDonacion,
    deleteDonacion ,
    createUser
}