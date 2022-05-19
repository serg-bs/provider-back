const db = require("./index");
module.exports = (sequelize, Sequelize) => {
    const Account = sequelize.define("account", {
        tariffId: {
            type: Sequelize.INTEGER
        },
        clientId: {
            type: Sequelize.INTEGER
            // references: {
            //     model: 'clients',
            //     key: 'id'
            // },
        },
        address: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        balance: {
            type: Sequelize.FLOAT
        },
        dateClose: {
            type: Sequelize.DATE
        }
    });
    // Account.associate = function(models) {
    //     Account.hasOne(models.client, {foreignKey: 'id',sourceKey: 'clientId'});
    // }
    return Account;
};

