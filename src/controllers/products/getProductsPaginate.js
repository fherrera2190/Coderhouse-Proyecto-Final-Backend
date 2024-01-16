const { productService } = require("../../services/index.service");

module.exports = async (req, res) => {
  const limit = req.query.limit && +req.query.limit > 0 ? +req.query.limit : 10;
  try {
    let sort = req.query.sort;
    if (sort && "asc" === req.query.sort.toLocaleLowerCase()) {
      sort = { price: 1 };
    }
    if (sort && "desc" === req.query.sort.toLocaleLowerCase()) {
      sort = { price: -1 };
    }

    let query = { owner: { $ne: req.user.email } };

    if (req.query.query === "true") {
      query.status = true;
    }
    if (req.query.query === "false") {
      query.status = false;
    }
    if (
      req.query.query &&
      req.query.query !== "true" &&
      req.query.query !== "false"
    ) {
      query.category = req.query.query;
    }
    const options = {
      limit,
      page: req.query.page ?? 1,
      sort,
    };
    const products = await productService.get(query, options);
    const {
      docs,
      totalPages,
      prevPage,
      nextPage,
      page,
      hasPrevPage,
      hasNextPage,
    } = products;

    const prevLink = !prevPage
      ? null
      : `/api/products/paginate${"?page=" + prevPage}${
          req.query.limit ? "&limit=" + req.query.limit : ""
        }${req.query.sort ? "&sort=" + req.query.sort : ""}${
          req.query.query ? "&query=" + req.query.query : ""
        }`;
    const nextLink = !nextPage
      ? null
      : `/api/products/paginate${"?page=" + nextPage}${
          req.query.limit ? "&limit=" + req.query.limit : ""
        }${req.query.sort ? "&sort=" + req.query.sort : ""}${
          req.query.query ? "&query=" + req.query.query : ""
        }`;
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
      nextLink,
    });
  } catch (error) {
    req.logger.error(error.message);
    return res.sendServerError(error.message);
  }
};
