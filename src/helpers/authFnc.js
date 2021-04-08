const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

const saltRounds = process.env.SALT_ROUND
const secretKey = process.env.JWT_SECRET;

const salt = bcrypt.genSaltSync(+saltRounds);

const hashPassword = (password) => bcrypt.hashSync(password, salt);

const comparePassword = (hashedPassword, password) =>
    bcrypt.compareSync(password, hashedPassword);

const generateToken = async(payload, secret = secretKey) => {
    const token = await jwt.sign(payload, secret, { expiresIn: "1d" });
    return token;
}

const verifyToken = async(token, secret = secretKey) => {
    const decoded = await jwt.verify(token, secret);
    return decoded;
}


module.exports = {
    hashPassword,
    comparePassword,
    generateToken,
    verifyToken
};