// import express framework
const express = require("express");
const router = express.Router();

// import controllers
const { smsReportController } = require("../controllers");


// post sms
router.post("/", (req, res) => {
  smsReportController.singleSms(req.body, (err, sms) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(sms);
    }
  });
});

// Find All Sms Reports
router.get("/", (req, res) => {
  smsReportController.getAllSms((error, sms) => {
    if (error) {
      res.status(400).json(error);
    } else {
      res.status(200).json(sms);
    }
  });
});

// post Bulk sms
router.post("/bulk", (req, res) => {
  smsReportController.bulkSms(req, (err, sms) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(sms);
    }
  });
});

module.exports = router;