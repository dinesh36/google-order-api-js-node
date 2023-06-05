const Order = require('../models').Order;
const GoogleOrderLog = require('../models').GoogleOrderLog;

class OrderController{
    async create(req, res) {
        const requestData = req.body;
        const { conversation: {conversationId} } = requestData;
        try{
            const logger = await this.createLogger({conversationId, requestData});
            const order = await Order.create({orderId: '123'});
            const responseData = this.constructOrderResponse(order);
            await this.logResponseData({logger, responseData});
            res.status(201).send(responseData);
        } catch(error){
            console.error('Error here', error);
            res.status(400).send(error);
        }
    }

    async createLogger({conversationId, requestData}){
        const logger = GoogleOrderLog.build({
            googleOrderConversationId: conversationId,
            requestData: JSON.stringify(requestData),
        });
        await logger.save();
        return logger;
    }

    async logResponseData({logger, responseData}){
        logger.actionOrderId = responseData.finalResponse.richResponse.items[0].structuredResponse.orderUpdate.actionOrderId;
        logger.responseData = JSON.stringify(responseData);
        await logger.save();
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
