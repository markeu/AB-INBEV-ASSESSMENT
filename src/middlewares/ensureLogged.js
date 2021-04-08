const { verifyToken } = require("../helpers")

module.exports = async(req, res, next) => {

    try {
        const authorizarions = req.headers.authorization;

        if (authorizarions === undefined) throw new Error("no auth");
        const token = authorizarions.split(" ")[1];

        if (!token || token === "") {
            return errorResponse(res, 401, "Access denied");
        }
        const decoded = await verifyToken(token);

        req.user = decoded;

        return next();
    } catch (error) {
        if (error.message === "no auth" || error.message === "jwt expired") {
            return res.status(401).json({ message: "Authorisation failed" });

        }
        return res.status(500).json({ message: "Internal SERVER error" });
    }
}