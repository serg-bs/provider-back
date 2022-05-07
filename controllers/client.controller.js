const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const Client = db.client;
const Op = db.Sequelize.Op;

// Create and Save a new Client
exports.create =  async (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Client
    let password = await bcrypt.hash(req.body.password, 10);
    const client = {
        name: req.body.name,
        surename: req.body.surename,
        middlename: req.body.middlename,
        address: req.body.address,
        login: req.body.login,
        password: password,
        phone: req.body.phone,
        email: req.body.email
    };

    // Save Client in the database
    Client.create(client)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Client."
            });
        });
};

exports.login = (req, res) => {
    if (!req.body.login || !req.body.password) {
        res.status(400).send({
            message: "Login or password could not be empty!"
        });
        return;
    }

    const login = req.body.login;
    var condition = login ? {login: {[Op.iLike]: `%${login}%`}} : null;
    Client.findOne({where: condition})
        .then(data => {
            const token = jwt.sign(
                {user_id: data.id},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            data.access_token = token;
            res.send(data);
        })
        .catch(err => {
            res.status(401).send({
                message:
                    err.message || "Login or password is wrong."
            });
        });
}

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? {name: {[Op.iLike]: `%${name}%`}} : null;

    Client.findAll({where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// Find a single Client with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Client.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Tutorial with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Client with id=" + id
            });
        });
};

// Update a Client by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Client.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Client was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Client with id=" + id
            });
        });
};

// Delete a Client with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Client.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Client was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Client with id=" + id
            });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Client.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({message: `${nums} Tutorials were deleted successfully!`});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials."
            });
        });
};

// find all published Client
exports.findAllPublished = (req, res) => {
    Client.findAll({where: {published: true}})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};
