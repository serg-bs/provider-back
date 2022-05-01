const express = require("express");

const app = express();
app.use(express.json());

const db = require("./models");

require("./routes/client.routes")(app);
require("./routes/account.routes")(app);
require("./routes/tariff.routes")(app);

db.sequelize.sync();

// set port, listen for requests
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});