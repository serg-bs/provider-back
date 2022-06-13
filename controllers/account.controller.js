const db = require("../models");
const Account = db.account;
const Op = db.Sequelize.Op;

// Create and Save a new Account
exports.create = (req, res) => {
  // Validate request
  if (!req.body.tariffId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create Account
  const account = {
      tariffId: req.body.tariffId,
      clientId: req.body.clientId,
      address: req.body.address,
      status: req.body.status,
      balance: req.body.balance
  };

  // Save Account in the database
  Account.create(account)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while creating the Account."
        });
      });
};

// Retrieve all Tutorials from the database.
exports.findByClientId = (req, res) => {
  const clientId = req.clientId;

  var condition = clientId ? { clientId: { [Op.eq]: `${clientId}` } } : null;

  Account.findOne({ where: condition })
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

// Find a single Account with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Account.findByPk(id)
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
          message: "Error retrieving Account with id=" + id
        });
      });
};

// Update a Account by the id in the request
exports.update = (req, res) => {
  // req.clientId


  const id = req.params.id;

  Account.update(req.body, {
    where: { id: id }
  })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Account was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Account with id=" + id
        });
      });
};

// Delete a Account with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Account.destroy({
    where: { id: id }
  })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Account was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Account with id=" + id
        });
      });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Account.destroy({
    where: {},
    truncate: false
  })
      .then(nums => {
        res.send({ message: `${nums} Tutorials were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while removing all tutorials."
        });
      });
};

// find all published Account
exports.findAllPublished = (req, res) => {
  Account.findAll({ where: { published: true } })
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
