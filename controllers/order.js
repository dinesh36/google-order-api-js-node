const Order = require('../models').Order;

module.exports = {
    async create(req, res) {
        const { name } = req.body;
        try{
            const order = Order.build({orderId: '123'});
            const createdOrder = await order.save();
            res.status(201).send(createdOrder);
        } catch(error){
            console.error('Error here', error);
            res.status(400).send(error);
        }
    },
};
