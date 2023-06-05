'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GoogleOrderLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GoogleOrderLog.init({
    actionOrderId: DataTypes.STRING,
    googleOrderConversationId: DataTypes.STRING,
    requestData: DataTypes.TEXT,
    responseData: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'GoogleOrderLog',
  });
  return GoogleOrderLog;
};