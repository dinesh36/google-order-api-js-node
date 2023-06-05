'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    merchantId: DataTypes.STRING,
    lineItems: DataTypes.TEXT,
    location: DataTypes.TEXT,
    contact: DataTypes.TEXT,
    contactEmail: DataTypes.STRING,
    contactPhone: DataTypes.STRING,
    deliveryFee: DataTypes.INTEGER,
    subTotal: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    googleOrderId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
