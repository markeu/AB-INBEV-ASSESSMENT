module.exports = (res, data, code = 200) => {
  res.status(code).send({ ...data, timestamp: Date.now() });
};