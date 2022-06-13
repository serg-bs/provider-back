const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const Client = db.client;
const Op = db.Sequelize.Op;

// Create and Save a new Client
exports.create =  async (req, res) => {
    // Validate request
    var errors = "";
    if (!req.body.name) {
        errors += "Имя не может быть пустым."
    }
    if (!req.body.surename) {
        errors += "Фамилия не может быть пустой."
    }
    if (!req.body.login) {
        errors += "Login не может быть пустым."
    }
    if (!req.body.password) {
        errors += "Password не может быть пустым."
    }
    if (!req.body.phone) {
        errors += "Телефон не может быть пустым."
    }
    if (!req.body.email) {
        errors += "Email не может быть пустым."
    }

    if (errors != '') {
        res.status(400).send({
            message: errors
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
        email: req.body.email,
        type: 'client'
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
                {clientId: data.id,
                        type: data.type
                },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "20000000h",
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
    if(req.type !== 'admin' &&
        (req.type === 'client' && req.clientId !== parseInt(req.params.id))){
        res.status(401).send({
            message: `User have no permission to view=${req.clientId}.`
        });
        return;
    }

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
    // Validate request
    var errors = "";
    if (!req.body.name) {
        errors += "Имя не может быть пустым."
    }
    if (!req.body.surename) {
        errors += "Фамилия не может быть пустой."
    }
    if (!req.body.login) {
        errors += "Login не может быть пустым."
    }
    if (!req.body.phone) {
        errors += "Телефон не может быть пустым."
    }
    if (!req.body.email) {
        errors += "Email не может быть пустым."
    }

    if (errors != '') {
        res.status(400).send({
            message: errors
        });
        return;
    }

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
                    message: `Cannot update Client with id=${id}. Maybe Client was not found or req.body is empty!`
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
exports.findByLogin = (req, res) => {
    if (req.body.login === '') {
        res.status(200).send({
            "found": false
        });
        return;
    }

    Client.findAll({where: {login: req.body.login}})
        .then(data => {
            if(data.length === 0){
                res.send({"found": false});
            } else {
                res.send({"found": true});
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving logins."
            });
        });
};
