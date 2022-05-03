const cors = require("cors");
module.exports = app => {
  const account = require("../controllers/account.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", account.create);

  // Retrieve all Tutorials
  router.get("/", account.findAll);

  // Retrieve all published Tutorials
  router.get("/published", account.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", account.findOne);

  // Update a Tutorial with id
  router.put("/:id", account.update);

  // Delete a Tutorial with id
  router.delete("/:id", account.delete);

  // Delete all Tutorials
  router.delete("/", account.deleteAll);

  app.use(cors({
    origin: '*'
  }));

  app.use("/api/accounts", router);
};
