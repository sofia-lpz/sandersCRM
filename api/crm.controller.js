import jwt from 'jsonwebtoken';
import * as crmService from './crm.service.js';

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


const getList = async (req, res) => {
    console.log('Get list request with query:', req.query);
    try {
        const { resource } = req.params;

        if (!req.query) {
            const { sort, range, filter } = null;
        }
        else{
            const { sort, range, filter } = req.query;
        }

        const data = await crmService.getList(resource, { sort, range, filter });
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "Error", message: error.message });
    }
};
const getOne = async (req, res) => {
    console.log('Get one request with params:', req.params);
    try {
        const { resource, id } = req.params;
        const data = await crmService.getOne(resource, id);
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "Error", message: error.message });
    }
};
const getMany = async (req, res) => {
    console.log('Get many request with query:', req.query);
    try {
        const { resource } = req.params;
        const { filter } = req.query;
        const data = await crmService.getMany(resource, filter);
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "Error", message: error.message });
    }
};
const getManyReference = async (req, res) => {
    console.log('Get many reference request with params:', req.params);
    try {
        const { resource, id, relatedResource } = req.params;
        const { sort, range, filter } = req.query;
        const data = await crmService.getManyReference(resource, id, relatedResource, { sort, range, filter });
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "Error", message: error.message });
    }
};

const create = async (req, res) => {
    console.log('Create request with params:', req.params, 'and body:', req.body);
    try {
        const { resource } = req.params;
        const data = await crmService.create(resource, req.body);
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "Error", message: error.message });
    }
}

const update = async (req, res) => {
    console.log('Update request with params:', req.params, 'and body:', req.body);
    try {
        const { resource, id } = req.params;
        const data = await crmService.update(resource, id, req.body);
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "Error", message: error.message });
    }
}

const updateMany = async (req, res) => {
    console.log('Update many request with params:', req.params, 'and body:', req.body);
    try {
        const { resource } = req.params;
        const data = await crmService.updateMany(resource, req.body);
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "Error", message: error.message });
    }
}

const deleteOne = async (req, res) => {
    console.log('Delete one request with params:', req.params);
    try {
        const { resource, id } = req.params;
        const data = await crmService.delete(resource, id);
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "Error", message: error.message });
    }
}

const deleteMany = async (req, res) => {
    console.log('Delete many request with params:', req.params, 'and body:', req.body);
    try {
        const { resource } = req.params;
        const data = await crmService.deleteMany(resource, req.body);
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "Error", message: error.message });
    }
}

export { 
    login,
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