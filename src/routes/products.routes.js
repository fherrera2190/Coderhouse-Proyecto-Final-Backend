const express = require("express");
const router = express.Router();
// const ProductManager = require('../modules/ProductManager');
// pm = new ProductManager();
const productsModels = require("../dao/mongo/models/products.models");
const { mongoose } = require("mongoose");
const auth = require("../middlewares/auth");


// GET Produucts
router.get("/",async (req, res) => {
  const limit =(req.query.limit&& +req.query.limit>0) ? +req.query.limit : 10;
  try {
    let sort = req.query.sort;
    if (sort && "asc" === req.query.sort.toLocaleLowerCase()) {
      sort = { price: 1 };
    }
    if (sort && "desc" === req.query.sort.toLocaleLowerCase()) {
      sort = { price: -1 };
    }

    let query ={};

    if (req.query.query === "true") {
      query.status = true;
    } 
     if (req.query.query === "false") {
      query.status = false;
    } 
    if(req.query.query && req.query.query!=="true" && req.query.query!=="false") {
      query.category = req.query.query;
    }
    const products = await productsModels.paginate(query, {
      limit,
      page: req.query.page ?? 1,
      sort
    });

    const {
      docs,
      totalPages,
      prevPage,
      nextPage,
      page,
      hasPrevPage,
      hasNextPage
    } = products;
    
    const prevLink= !prevPage
    ? null
    :  `/products${"?page="+prevPage}${req.query.limit?"&limit="+req.query.limit:""}${req.query.sort?"&sort="+ req.query.sort:""}${req.query.query?"&query="+ req.query.query:""}`
    const nextLink=!nextPage
    ? null
    :  `/products${"?page="+nextPage}${req.query.limit?"&limit="+req.query.limit:""}${req.query.sort?"&sort="+ req.query.sort:""}${req.query.query?"&query="+ req.query.query:""}`
    
    return res.status(200).json({
      status: "Success",
      products: docs,
      totalPages,
      prevPage,
      nextPage,
      page,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink
    });
  } catch (error) {
    return res.status(500).json({ error: error.code, detalle: error.message });
  }
});

// GET Products by ID
router.get("/:pid", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.pid.trim()))
      return res.status(400).json({ error: "Id invalido" });
    const product = await productsModels.findOne({
      _id: { $eq: req.params.pid.trim() }
    });
    if (!product)
      return res
        .status(200)
        .json({ status: "OK", msg: "No existe producto con ese pid" });
    return res.status(200).json({ status: "OK", product: product });
  } catch (error) {
    return res.status(500).json({ error: error.code, detalle: error.message });
  }
});

// ADD PRODUCT
router.post("/", auth,async (req, res) => {
  try {
    await productsModels.create(req.body);
    const productos = await productsModels.find().lean();
    req.io.emit("actualizarProductos", productos);
    return res
      .status(201)
      .json({ status: "OK", msg: "Producto creado exitosamente" });
  } catch (error) {
    return res.status(500).json({ error: error.code, detalle: error.message });
  }
});

// MODIFY PRODUCT BY ID
router.put("/:pid", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.pid.trim()))
      return res.status(400).json({ error: "Id invalido" });
    const product = await productsModels.findByIdAndUpdate(
      req.params.pid.trim(),
      req.body
    );
    if (!product)
      return res
        .status(200)
        .json({ status: "OK", msg: "No existe producto con ese pid" });
    const productos = await productsModels.find().lean();
    req.io.emit("actualizarProductos", productos);
    return res.status(200).json({ status: "OK", product: product });
  } catch (error) {
    return res.status(500).json({ error: error.code, detalle: error.message });
  }
});
// DELETE PRODUCT BY ID
router.delete("/:pid", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.pid.trim()))
      return res.status(400).json({ error: "Id invalido" });
    const product = await productsModels.deleteOne({
      _id: { $eq: req.params.pid.trim() }
    });
    if (!product)
      return res
        .status(200)
        .json({ status: "OK", msg: "No existe producto con ese pid" });
    const productos = await productsModels.find().lean();
    req.io.emit("actualizarProductos", productos);
    return res
      .status(200)
      .json({ status: "OK", msg: "Producto eliminado exitosamente" });
  } catch (error) {
    return res.status(500).json({ error: error.code, detalle: error.message });
  }
});

// ------------------ClasePM---------------------------------

// router.get('/', async (req, res) => {
//     let products = await pm.getProducts()
//     if (req.query.limit && +req.query.limit > 0) {
//         products = products.slice(0, +req.query.limit)
//         return res.status(200).send({ status: 'OK', data: products });
//     }
//     res.status(200).send({ status: 'OK', data: products });
// })

// router.get('/:pid', async (req, res) => {
//     const product = await pm.getProductById(+req.params.pid)
//     if (product) {
//         res.status(200).send({ status: 'OK', data: product });
//     }
// })

// router.post('/', async (req, res) => {
//     const result = await pm.addProduct(req.body);
//     req.io.emit('actualizarProductos', await pm.getProducts());
//     res.status(200).json({ status: result });
// })

// router.put('/:pid', async (req, res) => {
//     const result = await pm.modifyProductById(+req.params.pid, Object.entries(req.body))
//     if (result === 'El producto se modifico correctamente') res.status(200).json({ status: 'OK', msg: result });
//     res.status(400).json({ status: 'Error', msg: result })
// })

// router.delete('/:pid', async (req, res) => {
//     const result = await pm.deleteProductById(+req.params.pid)
//     req.io.emit('actualizarProductos', await pm.getProducts());
//     res.status(200).json({ status: true, msg: result });
// })

module.exports = router;
