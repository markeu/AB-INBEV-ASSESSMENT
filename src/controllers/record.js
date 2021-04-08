const { records } = require("../services");
const { response } = require("../helpers");

const calculate = async(req, res) => {
    const data = await records.calculate(req.body, req.user.email)
    return response(res, data);
};

const getRecords = async(req, res) => {
    const data = await records.fetchPrevComputations(req.user.email)
    return response(res, data);
};


module.exports = {
    calculate,
    getRecords
};