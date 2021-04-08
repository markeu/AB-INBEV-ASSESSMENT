const { v4: uuid } = require("uuid");
const {
    Op: { or, and },
} = require("sequelize");
const { Users } = require("../models");
const { constants } = require("../configs");
const {
    generateToken,
    hashPassword,
    comparePassword
} = require("../helpers/authFnc")



const signup = async(body) => {
    const { name, password, email } = body;
    try {
        const registeredUser = await Users.findOne({ email });
        if (registeredUser) {
            return {
                status: false,
                message: "User already exists !",
            }
        }
        const user = await Users.create({
            id: uuid(),
            name,
            password: password ? hashPassword(password) : undefined,
            email,
        });

        if (user) {
            const token = await generateToken({ id: user._id, email });
            const data = {
                user,
                token,
            };
            return {
                status: true,
                message: "User signed up successfully",
                data
            };
        }

        return {
            status: False,
            message: "User Sign up Failed",
        };
    } catch (error) {
        return {
            status: false,
            message: "An error occurred trying to create a user ",
            error
        };
    }
}

const Login = async(body) => {
    try {
        const { email, password } = body;
        const registeredUser = await Users.findOne({ email });;
        if (!registeredUser) {
            return {
                status: false,
                message: "User do not exist !",
            }
        }

        const verifyPassword = comparePassword(registeredUser.password, password);

        if (!verifyPassword) {
            return {
                status: false,
                message: "Not Authorized!",
            }
        }

        const token = await generateToken({ id: registeredUser._id, email });
        const data = { registeredUser, token }
        return {
            status: true,
            message: `User logged in successfully`,
            data
        }
    } catch (error) {
        return {
            status: false,
            message: "An error occurred trying to login",
            error
        };
    }
}


module.exports = {
    signup,
    Login
};