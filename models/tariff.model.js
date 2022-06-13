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
        },
        disabled: {
            type: Sequelize.BOOLEAN,
            default: false
        }
    });
    return Tariff;
};
