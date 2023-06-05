const Order = require('../models').Order;
const orderLoggerController = require('./order-logger.controller');

class OrderController{
    async create(req, res) {
        try{
            await orderLoggerController.logOrderRequest(req);
            const order = await Order.create({orderId: '123'});
            const orderResponse = this.constructOrderResponse(order);
            await orderLoggerController.logOrderResponse({req, orderResponse});
            res.status(201).send(orderResponse);
        } catch(error){
            console.error('Error here', error);
            res.status(400).send(error);
        }
    }

    constructOrderResponse(order){
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
