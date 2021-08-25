"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sms_reports extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sms_reports.belongsTo(models.User, {
        foreignKey: "created_by",
        as: "sms_reports",
      });
    }
  }
  Sms_reports.init(
    {
      message: DataTypes.STRING,
      recepient: DataTypes.STRING,
      created_by: DataTypes.INTEGER,
      status: DataTypes.STRING,
      sms_cost: DataTypes.STRING,
      sms_type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Sms_reports",
    }
  );
  return Sms_reports;
};
