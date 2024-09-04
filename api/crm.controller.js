import jwt from 'jsonwebtoken';
import * as crmService from './crm.service.js';

const login = async (req, res) => {
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

export { login };