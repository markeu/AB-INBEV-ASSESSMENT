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

const deleteSpecificUserInterest = async(body) => {
    try {
        const { id } = body;
        const specificUserInterest =
            await UserInterest.findOne({ where: { id } });
        if (!specificUserInterest) {
            return {
                status: false,
                message: constants.NOT_FOUND("Interest"),
            };
        }

        await UserInterest.destroy({ where: { id } });
        return {
            status: true,
            message: `Interest with id-${id} deleted`,
        }
    } catch (error) {
        return {
            status: false,
            message: "An error occurred trying to delete the interest",
        };
    }
}

const getAllInterests = async(UserId) => {

    try {
        const userInterests = await UserInterest.findAll({
            where: UserId
        })

        const mappedInterest = userInterests.map(
            async elem => {
                return await Interest.findAll({
                    where: {
                        [or]: { id: elem.dataValues.InterestId }
                    }
                }).then(title =>
                    title[0].dataValues.title
                );
            });

        let resolvePromiseResponse = await Promise.allSettled(mappedInterest);
        let outputArray = [];
        for (let index = 0; index < resolvePromiseResponse.length; index++) {
            let item = resolvePromiseResponse[index]
            if (item.status === 'fulfilled') {
                outputArray.push(item.value)
            }
        }
        return {
            status: true,
            message: "Interest retrieved successfully",
            data: outputArray
        }
    } catch (error) {
        return {
            status: false,
            message: "An error occurred trying to delete the interest",

        };
    }
}




module.exports = {
    signup
};