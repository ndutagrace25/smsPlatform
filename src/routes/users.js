const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

// Create user
router.post("/register", (req, res) => {
  userController.createUser(req.body, (error, registered) => {
    if (error) {
      res.status(400).json(error);
    } else {
      res.status(200).json(registered);
    }
  });
});

// Update user
router.patch("/update", (req, res) => {
  userController.updateUser(req.body, (error, updated) => {
    if (error) {
      res.status(400).json(error);
    } else {
      res.status(200).json(updated);
    }
  });
});

//  getall users
router.get("/all", (req, res) => {
  userController.getAllusers((error, displayed) => {
    if (error) {
      res.status(400).json(error);
    } else {
      res.status(200).json(displayed);
    }
  });
});

// login a user
router.post("/login", (req, res) => {
  userController.loginUser(req.body, (error, message) => {
    if (error) {
      res.status(400).json(error);
    } else {
      res.status(200).json(message);
    }
  });
});

// delete a user
router.delete("/delete/:userId", (req, res) => {
  userController.deleteUser(req.params.userId, (error, deleted) => {
    if (error) {
      res.status(400).json(error);
    } else {
      res.status(200).json(deleted);
    }
  });
});

module.exports = router;
