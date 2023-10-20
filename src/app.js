const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const express = require('express');
const cors = require("cors");
const morgan = require("morgan");

const config = require("./config/config");
const app = express();
app.use(cors());
app.use(express.json());

// Define tus rutas y controladores aquí

// rutas
if (config.NODE_ENV !== 'production') {
  app.use(morgan("dev"));
  // rutas
  const swaggerDocument = YAML.load("./docs/swagger.yaml");
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Welcome to Bindstender microservice",
    environment: config.NODE_ENV,
  });
});
module.exports = app;