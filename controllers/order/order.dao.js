const Order = require('../../models').Order;
const lodash = require('lodash');
const {get: _get} = lodash;

class OrderDao{
    async create(orderRequestData){
        const orderData = this.getOrderData(orderRequestData);
        return await Order.create(orderData);
    }

    getOrderData(orderRequestData){
        const orderObj = _get(orderRequestData, 'inputs[0].arguments[0].transactionDecisionValue.order');
        const reqOrderDetails = _get(orderObj, 'finalOrder');
        const merchantId = _get(reqOrderDetails, 'cart.merchant.id');
        const lineItems = JSON.stringify(_get(reqOrderDetails, 'cart.lineItems'));
        const location = JSON.stringify(_get(reqOrderDetails, 'cart.extension.location'));
        const contactObj = _get(reqOrderDetails, 'cart.extension.contact');
        const contact = JSON.stringify(contactObj);
        const contactEmail = _get(contactObj, 'email');
        const contactPhone = _get(contactObj, 'phoneNumber');
        const otherItems = _get(reqOrderDetails, 'otherItems',  []);
        const deliveryFee = Number(_get(otherItems.find(({type})=>type==='DELIVERY'), 'price.amount.units'));
        const subTotal = Number(_get(otherItems.find(({type})=>type==='SUBTOTAL'), 'price.amount.units'));
        const total = Number(_get(reqOrderDetails, 'totalPrice.amount.units'));
        const googleOrderId = _get(orderObj, 'googleOrderId');
        const paymentType = _get(orderObj, 'paymentInfo.paymentType');


        return {
            merchantId,
            lineItems,
            location,
            contact,
            contactEmail,
            contactPhone,
            deliveryFee,
            subTotal,
            total,
            googleOrderId,
            paymentType
        }
    }
}

module.exports =  new OrderDao();
