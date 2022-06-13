const cors = require("cors");
const auth = require("../middleware/auth");
module.exports = app => {
  const tariff = require("../controllers/tariff.controller");

  var router = require("express").Router();

  // Create a new Tariff
  router.post("/", tariff.create);

  // Retrieve all Tariffs
  router.get("/", auth, tariff.findAll);

  // Retrieve all published Tariffs
  router.get("/published", tariff.findAllPublished);

  // Retrieve a single Tariff with id
  router.get("/:id", tariff.findOne);

  // Update a Tariff with id
  router.put("/:id", tariff.update);

  // Delete a Tariff with id
  router.delete("/:id", tariff.delete);

  // Delete all Tariffs
  router.delete("/", tariff.deleteAll);

  app.use(cors({
    origin: '*'
  }));

  app.use("/api/tariffs", router);
};
