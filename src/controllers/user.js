const { user } = require("../services");
const { response } = require("../helpers");


const createUser = async(req, res) => {
    const requestBody = req.body;
    const data = await user.signup(requestBody);
    return response(res, data);
};

const login = async(req, res) => {
    const requestBody = req.body;
    const data = await user.Login(requestBody);
    return response(res, data);
};


module.exports = {
    createUser,
    login
};