const GoogleOrderLog = require('../models').GoogleOrderLog;

class OrderLoggerController{
    async logOrderRequest(req){
        const requestBody = req.body;
        const googleOrderConversationId = requestBody.conversation.conversationId;
        const logger = GoogleOrderLog.build({
            googleOrderConversationId: googleOrderConversationId,
            requestData: JSON.stringify(requestBody),
        });
        await logger.save();
        req.logger = logger;
    }

    async logOrderResponse({req, orderResponse}){
        const logger = req.logger;
        logger.actionOrderId = orderResponse.finalResponse.richResponse.items[0].structuredResponse.orderUpdate.actionOrderId;
        logger.responseData = JSON.stringify(orderResponse);
        await logger.save();
    }
}

module.exports = new OrderLoggerController();
