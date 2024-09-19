import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send({ status: "Error", message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({ status: "Error", message: "Failed to authenticate token" });
        }
        req.userId = decoded.id;
        next();
    });
};

export { verifyToken };