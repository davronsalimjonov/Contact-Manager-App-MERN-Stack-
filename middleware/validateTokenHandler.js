import jwt from "jsonwebtoken"

const validateToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Not authorized, no token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.user;
        console.log("Token issued", new Date(decoded.iat * 1000).toLocaleString());
        console.log("Token expires", new Date(decoded.exp * 1000).toLocaleString());
        next();
    } catch (err) {
        return res.status(401).json({ message: "Not authorized, token failed or expired" });
    }
};


export default validateToken