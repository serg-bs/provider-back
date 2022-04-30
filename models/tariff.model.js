module.exports = (sequelize, Sequelize) => {
    const Tariff = sequelize.define("tariff", {
        name: {
            type: Sequelize.STRING
        },
        speed: {
            type: Sequelize.INTEGER
        },
        price: {
            type: Sequelize.FLOAT
        }
    });
    return Tariff;
};
