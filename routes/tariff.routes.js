module.exports = app => {
  const tariff = require("../controllers/tariff.controller");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", tariff.create);

  // Retrieve all Tutorials
  router.get("/", tariff.findAll);

  // Retrieve all published Tutorials
  router.get("/published", tariff.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", tariff.findOne);

  // Update a Tutorial with id
  router.put("/:id", tariff.update);

  // Delete a Tutorial with id
  router.delete("/:id", tariff.delete);

  // Delete all Tutorials
  router.delete("/", tariff.deleteAll);

  app.use("/api/tariffs", router);
};
