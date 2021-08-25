const express = require("express");
const router = express.Router();

const departmentController = require("../controllers/departmentController");

// Create department
router.post("/createDepartment", (req, res) => {
  departmentController.createDepartment(req.body, (error, created) => {
    if (error) {
      res.status(400).json(error);
    } else {
      res.status(200).json(created);
    }
  });
});

// Update department
router.patch("/updateDepartment", (req, res) => {
  departmentController.updateDepartment(req.body, (error, updated) => {
    if (error) {
      res.status(400).json(error);
    } else {
      res.status(200).json(updated);
    }
  });
});

//  get all departments
router.get("/allDepartments", (req, res) => {
  departmentController.getAllDepartments((error, displayed) => {
    if (error) {
      res.status(400).json(error);
    } else {
      res.status(200).json(displayed);
    }
  });
});

// delete a department
router.delete("/delete/:departmentId", (req, res) => {
  departmentController.deleteDepartment(req.params.departmentId, (error, deleted) => {
    if (error) {
      res.status(400).json(error);
    } else {
      res.status(200).json(deleted);
    }
  });
});

module.exports = router;
