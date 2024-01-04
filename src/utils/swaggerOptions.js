module.exports = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentación del e-commerce",
      description: "Mi primer api",
    },
  },
  apis: [`${__dirname}/../../docs/**/*.yaml`],
};
