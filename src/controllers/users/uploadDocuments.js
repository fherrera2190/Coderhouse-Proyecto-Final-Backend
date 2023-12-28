module.exports = async (req, res) => {
  console.log(req.files);
  return res.json({msg:"se subieron correctamente los archivos"})
};
