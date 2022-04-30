module.exports = app => {
  const payment = require("../controllers/payment.controller");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", payment.create);

  // Retrieve all Tutorials
  router.get("/", payment.findAll);

  // Retrieve all published Tutorials
  router.get("/published", payment.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", payment.findOne);

  // Update a Tutorial with id
  router.put("/:id", payment.update);

  // Delete a Tutorial with id
  router.delete("/:id", payment.delete);

  // Delete all Tutorials
  router.delete("/", payment.deleteAll);

  app.use("/api/payments", router);
};
