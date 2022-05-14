const express = require("express");
const cors = require('cors');

const app = express();
app.use(express.json());

const db = require("./models");
// db.client.sync()
// db.client.belongsTo(db.account, {as: 'clientId'});


require("./routes/client.routes")(app);
require("./routes/account.routes")(app);
require("./routes/tariff.routes")(app);
require("./routes/payment.routes")(app);

db.sequelize.sync();

app.use(cors({
    origin: '*'
}));

// set port, listen for requests
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});