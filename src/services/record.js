const { v4: uuid } = require("uuid");
const { Records } = require("../models");
const { constants } = require("../configs");
const { paginate } = require("../helpers")

const calculate = async(body, user) => {
    try {
        const { shape, dimension } = body;
        const shapeLowerCase = shape.toLowerCase();
        switch (shapeLowerCase) {
            case 'triangle':
                {
                    const { a, b, c } = dimension;
                    const result = TriangleCal(a, b, c);
                    const value = await Records.create({
                        id: uuid(),
                        shape,
                        result: result.toFixed(2),
                        createBy: user,
                    });
                    return customValue(true, value)
                }
            case 'circle':
                {
                    const result = circleCal(dimension);
                    const value = await Records.create({
                        id: uuid(),
                        shape,
                        result: result.toFixed(2),
                        createBy: user,
                    });
                    return customValue(true, value)
                }
            case 'rectangle':
                {
                    const { a, b } = dimension;
                    const result = RectangleCal(a, b);
                    const value = await Records.create({
                        id: uuid(),
                        shape,
                        result: result.toFixed(2),
                        createBy: user,
                    });
                    return customValue(true, value)
                }
            case 'square':
                {
                    const result = squareCal(dimension);
                    const value = await Records.create({
                        id: uuid(),
                        shape,
                        result: result.toFixed(2),
                        createBy: user,
                    });
                    return customValue(true, value)
                }
            default:
                return {
                    status: false,
                    message: "Use a valid shape, [circle, sqaure, rectangle, triangle]"
                };
        }

    } catch (error) {
        return {
            status: false,
            message: "An error occurred trying to add a new interest",
        };
    }
}

const fetchPrevComputations = async(params) => {
    try {
        const calculations = await Records
            .findAll({ where: { createBy: params } });

        if (!calculations) {
            return {
                status: false,
                message: constants.NOT_FOUND("calculations"),
            };
        }
        return {
            status: true,
            message: "Records retrieved successfully",
            data: calculations
        }
    } catch (error) {
        return {
            status: false,
            message: "An error occurred trying to fetch records",
        };
    }
}

function customValue(bool, data) {
    return {
        status: bool,
        message: "Successful computation",
        data
    };
}

const circleCal = (radius) => Math.PI * radius

const squareCal = (side) => side * side

const RectangleCal = (length, breadth) => length * breadth

const TriangleCal = (a, b, c) => {
    const s = (a + b + c) / 2;
    return Math.sqrt(s * ((s - a) * (s - b) * (s - c)));
}


module.exports = {
    calculate,
    fetchPrevComputations
};