module.exports = ({ page, pageSize = 4 }) => {
    const offset = +page * pageSize;
    const limit = pageSize;

    return {
        offset,
        limit,
    };
};