'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER
      },
      merchantId: { type: Sequelize.STRING },
      lineItems: { type: Sequelize.TEXT },
      location: { type: Sequelize.TEXT },
      contact: { type: Sequelize.TEXT },
      contactEmail: { type: Sequelize.STRING },
      contactPhone: { type: Sequelize.STRING },
      deliveryFee: { type: Sequelize.INTEGER },
      subTotal: { type: Sequelize.INTEGER },
      total: { type: Sequelize.INTEGER },
      googleOrderId: { type: Sequelize.STRING },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};
