module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("client", {
        name: {
            type: Sequelize.STRING
        },
        surename: {
            type: Sequelize.STRING
        },
        middlename: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        login: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        access_token: {
            type: Sequelize.VIRTUAL
        }
    });
    return Client;
};
