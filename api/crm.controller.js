import { router } from "./crm.routes.js";
import * as crmService from "./crm.service.js";

const getUsers = async (req, res) => {
    try {
        const users = await crmService.getUsers();
        res.send({ status: "OK", data: users });
        } catch (error) {
        console.error(error);
        res.status(500).send({ status: "Error", data: error.message });
        }
}

export { getUsers };