const cors = require("cors");
const auth = require("../middleware/auth");
const config = process.env;
module.exports = app => {
    const account = require("../controllers/account.controller.js");

    var router = require("express").Router();

    // Create a new Account
    router.post("/", account.create);

    // Retrieve account by ClientId
    router.get("/", auth, account.findByClientId);

    // Retrieve a single Account with id
    router.get("/:id", account.findOne);

    // Update a Account with id
    router.put("/:id", account.update);

    // Delete a Account with id
    router.delete("/:id", account.delete);

    // Delete all Accounts
    router.delete("/", account.deleteAll);

    if (config.CORS_ENABLES !== 'true') {
        app.use(cors({
            origin: '*'
        }));
    }

    app.use("/api/accounts", router);
};
