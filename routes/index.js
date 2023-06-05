const orderController = require('../controllers').order;

module.exports = (app) => {
  app.post('/api/order', orderController.create.bind(orderController));
};
