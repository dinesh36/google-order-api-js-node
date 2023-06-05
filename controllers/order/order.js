const orderDao = require('./order.dao');

class OrderController {
    async create(req, res) {
        try{
            const order = await orderDao.create(req.body);
            const orderResponse = this.generateOrderResponse(order);
            res.status(201).send(orderResponse);
        } catch(error){
            res.status(400).send(error);
        }
    }

    generateOrderResponse(order){
        return {
            "finalResponse": {
            "richResponse": {
                "items": [
                    {
                        "structuredResponse": {
                            "orderUpdate": {
                                "actionOrderId": `${order.id}`,
                                "orderState": {
                                    "state": "CONFIRMED",
                                    "label": "Pending"
                                },
                                "updateTime": "2020-10-22T02:02:08-07:00",
                                "orderManagementActions": [
                                    {
                                        "type": "CUSTOMER_SERVICE",
                                        "button": {
                                            "title": "Call customer service",
                                            "openUrlAction": {
                                                "url": "tel:+61234561000"
                                            }
                                        }
                                    },
                                    {
                                        "type": "VIEW_DETAILS",
                                        "button": {
                                            "title": "View order details",
                                            "openUrlAction": {
                                                "url": "https://partner.com/view/orderstatus"
                                            }
                                        }
                                    }
                                ],
                                "receipt": {
                                    "userVisibleOrderId": "BXZ-1603357328"
                                }
                            }
                        }
                    }
                ]
            }
        }
        }
    }
}

module.exports = new OrderController();
