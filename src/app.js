const express = require("express");
const bodyParser = require("body-parser");
const upload = require("express-fileupload");
const app = express();





app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "POST, GET, OPTIONS, DELETE, PUT, PATCH"
  );
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "10gb",
  })
);
app.use(
  bodyParser.json({
    limit: "10gb",
  })
);

app.use(upload());
app.use("/uploads", express.static("uploads"));

const { users, departments, smsReport } = require("./routes");

app.use("/users", users);
app.use("/departments", departments);
app.use("/singleSms", smsReport);


module.exports = app;
