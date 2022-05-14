const db = require("./index");
module.exports = (sequelize, Sequelize) => {
    const Payment = sequelize.define("payment", {
        accountId: {
            type: Sequelize.INTEGER
        },
        amount: {
            type: Sequelize.FLOAT
        },
        payDateTime: {
            type: Sequelize.DATE
        }
    });
    // Payment.associate = function(models) {
    //     Payment.hasOne(models.client, {foreignKey: 'id',sourceKey: 'clientId'});
    // }
    return Payment;
};

