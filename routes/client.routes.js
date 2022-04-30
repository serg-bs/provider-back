const client = require("../controllers/client.controller");
module.exports = app => {
  const client = require("../controllers/client.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", client.create);

  // Retrieve all Tutorials
  router.get("/", client.findAll);

  // Retrieve all published Tutorials
  router.get("/published", client.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", client.findOne);

  // Update a Tutorial with id
  router.put("/:id", client.update);

  // Delete a Tutorial with id
  router.delete("/:id", client.delete);

  // Delete all Tutorials
  router.delete("/", client.deleteAll);

  router.post("/login", client.login);

  app.use("/api/clients", router);
};
