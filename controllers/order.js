const Order = require('../models').Order;

module.exports = {
    async create(req, res) {
        const { name } = req.body;
        try{
            const order = Order.build({orderId: '123'});
            // await order.save();
        } catch(e){
            console.error('Error here', e);
        }
        res.send('After creating the order...');
        // return Order
        //     .create({name})
        //     .then(order => res.status(201).send(order))
        //     .catch(error => res.status(400).send(error));
    },
};
