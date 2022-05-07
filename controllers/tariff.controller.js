const db = require("../models");
const Tariff = db.tariff;
const Op = db.Sequelize.Op;

// Create and Save a new Tariff
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tariff
  const tariff = {
    name: req.body.name,
    speed: req.body.speed,
    price: req.body.price
  };

  // Save Tariff in the database
  Tariff.create(tariff)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while creating the Tariff."
        });
      });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Tariff.findAll({ where: condition })
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

// Find a single Tariff with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tariff.findByPk(id)
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
          message: "Error retrieving Tariff with id=" + id
        });
      });
};

// Update a Tariff by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Tariff.update(req.body, {
    where: { id: id }
  })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tariff was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tariff with id=" + id
        });
      });
};

// Delete a Tariff with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tariff.destroy({
    where: { id: id }
  })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tariff was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tariff with id=" + id
        });
      });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tariff.destroy({
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

// find all published Tariff
exports.findAllPublished = (req, res) => {
  Tariff.findAll({ where: { published: true } })
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
