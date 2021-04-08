const { v4: uuid } = require("uuid");
const { Interest } = require("../models");
const { constants } = require("../configs");
const { paginate } = require("../helpers")

const createInterest = async(params) => {
    try {
        const { title, description } = params;
        const novelInterest = await Interest.findAll({ where: { title } });
        if (!novelInterest) {
            return {
                status: false,
                message: constants.NOT_FOUND("Interest already exists"),
            };
        }
        await Interest.create({
            id: uuid(),
            title,
            description,
        });

        return {
            status: true,
            message: "Interest created successfully"
        };

    } catch (error) {
        return {
            status: false,
            message: "An error occurred trying to add a new interest",
        };
    }
}

const fetchAllInterests = async(params) => {
    try {
        const { count, rows } = await Interest.findAndCountAll(paginate(params))
        if (!rows) {
            return {
                status: false,
                message: constants.NOT_FOUND("Interest"),
            };
        }

        return {
            status: true,
            message: "Interest retrieved successfully",
            data: rows,
            metaData: {
                count
            }
        };
    } catch (error) {
        return {
            status: false,
            message: "An error occurred trying to fetch all new interest",
        };
    }
}

const fetchSpecificInterest = async(params) => {
    try {
        const { id } = params
        const specificInterest = await Interest.findOne({ where: { id } });
        if (!specificInterest) {
            return {
                status: false,
                message: constants.NOT_FOUND("Interest"),
            };
        }
        return {
            status: true,
            message: "Interest retrieved successfully",
            data: specificInterest
        }
    } catch (error) {
        return {
            status: false,
            message: "An error occurred trying to fetch the interest",
        };
    }
}

const deleteSpecificInterest = async(params) => {
    try {
        const { id } = params
        const specificInterest = await Interest.findOne({ where: { id } });
        if (!specificInterest) {
            return {
                status: false,
                message: constants.NOT_FOUND("Interest"),
            };
        }
        await Interest.destroy({ where: { id } });
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

const editInterestDetails = async(params, body) => {
    try {
        const { id } = params;

        const specificInterest = await Interest.findAll({ where: { id } });
        if (!specificInterest) {
            return {
                status: false,
                message: constants.NOT_FOUND("Interest"),
            };
        }
        const statusCode = await Interest.update(body, { where: { id: id } })

        return statusCode[0] === 1 ? {
            status: true,
            message: `Interest with id-${id} updated succesfully`
        } : {
            status: false,
            message: `Cannot update Interest with id-${id}`
        }

    } catch (error) {
        return {
            status: false,
            message: "An error occurred trying to update interest",
        };
    }
}



module.exports = {
    createInterest,
    fetchAllInterests,
    fetchSpecificInterest,
    deleteSpecificInterest,
    editInterestDetails
};