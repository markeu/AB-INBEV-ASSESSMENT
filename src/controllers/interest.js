const { interests } = require("../services");
const { response } = require("../helpers");

const createInterest = async(req, res) => {
    const data = await interests.createInterest(req.form)
    return response(res, data);
};

const getInterest = async(req, res) => {
    const data = await interests.fetchAllInterests(req.query)
    return response(res, data);
}

const getInterestById = async(req, res) => {
    const data = await interests.fetchSpecificInterest(req.query)
    return response(res, data);
}

const truncateInterestById = async(req, res) => {
    const data = await interests.deleteSpecificInterest(req.query)
    return response(res, data);
}

const updateInterestById = async(req, res) => {
    const query = req.query
    const data = await interests.editInterestDetails(query, req.form)
    return response(res, data);
}

module.exports = {
    createInterest,
    getInterest,
    getInterestById,
    truncateInterestById,
    updateInterestById
};