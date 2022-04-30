module.exports = (sequelize, Sequelize) => {
    const Account = sequelize.define("account", {
        accountId: {
            type: Sequelize.STRING
        },
        clientId: {
            type: Sequelize.INTEGER
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
    return Account;
};
