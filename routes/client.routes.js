const client = require("../controllers/client.controller");
const auth = require("../middleware/auth");
const cors = require("cors");
const config = process.env;

module.exports = app => {
    const client = require("../controllers/client.controller.js");

    var router = require("express").Router();

    // Create a new Client
    router.post("/", client.create);

    // Retrieve all Clients
    router.get("/", auth, client.findAll);

    // Retrieve all published Clients
    router.post("/findByLogin", client.findByLogin);

    // Retrieve a single Client with id
    router.get("/:id", auth, client.findOne);

    // Update a Client with id
    router.put("/:id", auth, client.update);

    // Delete a Client with id
    router.delete("/:id", auth, client.delete);

    // Delete all Clients
    router.delete("/", auth, client.deleteAll);

    router.post("/login", client.login);
    if (config.CORS_ENABLES !== 'true') {
        app.use(cors({
            origin: '*'
        }));
    }

    app.use("/api/clients", router);
};
