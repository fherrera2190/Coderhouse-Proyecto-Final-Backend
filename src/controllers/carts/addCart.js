module.exports = async (req, res) => {
  try {
    const result = await cartsModels.create({});
    return res.sendSuccess(result);
  } catch (error) {
    return res.statsendServerError(error.message);
  }
};
