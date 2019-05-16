/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


//Use this variable to change the status of the order
var orderStatus = {
    Created: {code: 1, text: 'Order Created'},
    Bought: {code: 2, text: 'Order Purchased'},
    Cancelled: {code: 3, text: 'Order Cancelled'},
    Ordered: {code: 4, text: 'Order Submitted to Provider'},
    ShipRequest: {code: 5, text: 'Shipping Requested'},
    Delivered: {code: 6, text: 'Order Delivered'},
    Delivering: {code: 15, text: 'Order being Delivered'},
    Backordered: {code: 7, text: 'Order Backordered'},
    Dispute: {code: 8, text: 'Order Disputed'},
    Resolve: {code: 9, text: 'Order Dispute Resolved'},
    PayRequest: {code: 10, text: 'Payment Requested'},
    Authorize: {code: 11, text: 'Payment Approved'},
    Paid: {code: 14, text: 'Payment Processed'},
    Refund: {code: 12, text: 'Order Refund Requested'},
    Refunded: {code: 13, text: 'Order Refunded'}
};


//Namespace Variable that can be reused while accessing registries
var ns = 'org.acme.supplychain';



//Function to create an order, Reference this function to fill all other functions
/**
 * create an order to purchase
 * @param {org.acme.supplychain.CreateOrder} purchase - the order to be processed
 * @transaction
 */
function CreateOrder(purchase) {
    purchase.order.buyer = purchase.buyer;
    purchase.order.amount = purchase.amount;
    purchase.order.financeCo = purchase.financeCo;
    purchase.order.created = new Date().toISOString();
    purchase.order.status = JSON.stringify(orderStatus.Created);
    return getAssetRegistry('org.acme.supplychain.Order')
        .then(function (assetRegistry) {
            return assetRegistry.update(purchase.order)
            .then (function (_res) 
            {
                z2bEmit('Created', purchase.order);
                return (_res);
            }).catch(function(error){return(error);});
        });
}
/**
 * Record a request to purchase
 * @param {org.acme.supplychain.Buy} purchase - the order to be processed
 * @transaction
 */
function Buy(purchase) {
    // YOUR CODE HERE


}
/**
 * Record a request to cancel an order
 * @param {org.acme.supplychain.OrderCancel} purchase - the order to be processed
 * @transaction
 */
function OrderCancel(purchase) {
    // YOUR CODE HERE



}
/**
 * Record a request to order by seller from supplier
 * @param {org.acme.supplychain.OrderFromSupplier} purchase - the order to be processed
 * @transaction
 */
function OrderFromSupplier(purchase) {
    // YOUR CODE HERE



}
/**
 * Record a request to ship by supplier to shipper
 * @param {org.acme.supplychain.RequestShipping} purchase - the order to be processed
 * @transaction
 */
function RequestShipping(purchase) {
    // YOUR CODE HERE



}
/**
 * Record a delivery by shipper
 * @param {org.acme.supplychain.Delivering} purchase - the order to be processed
 * @transaction
 */
function Delivering(purchase) {
    // YOUR CODE HERE



}
/**
 * Record a delivery by shipper
 * @param {org.acme.supplychain.Deliver} purchase - the order to be processed
 * @transaction
 */
function Deliver(purchase) {
    // YOUR CODE HERE



}
 /**
 * Record a request for payment by the seller
 * @param {org.acme.supplychain.RequestPayment} purchase - the order to be processed
 * @transaction
 */
function RequestPayment(purchase) {
    // YOUR CODE HERE



}
 /**
 * Record a payment to the seller
 * @param {org.acme.supplychain.AuthorizePayment} purchase - the order to be processed
 * @transaction
 */
function AuthorizePayment(purchase) {
    // YOUR CODE HERE



}
 /**
 * Record a payment to the seller
 * @param {org.acme.supplychain.Pay} purchase - the order to be processed
 * @transaction
 */
function Pay(purchase) {
    // YOUR CODE HERE



}
 /**
 * Record a dispute by the buyer
 * @param {org.acme.supplychain.Dispute} purchase - the order to be processed
 * @transaction
 */
function Dispute(purchase) {
        // YOUR CODE HERE



}
 /**
 * Resolve a seller initiated dispute
 * @param {org.acme.supplychain.Resolve} purchase - the order to be processed
 * @transaction
 */
function Resolve(purchase) {
        // YOUR CODE HERE



}
 /**
 * Record a refund to the buyer
 * @param {org.acme.supplychain.Refund} purchase - the order to be processed
 * @transaction
 */
function Refund(purchase) {
        // YOUR CODE HERE



}
 /**
 * Record a backorder by the supplier
 * @param {org.acme.supplychain.BackOrder} purchase - the order to be processed
 * @transaction
 */
function BackOrder(purchase) {
        // YOUR CODE HERE



}

/**
 * display using console.log the properties of each property in the inbound object
 * @param {displayObjectProperties} _string - string name of object
 * @param {displayObjectProperties}  _object - the object to be parsed
 * @utility
 */
function displayObjectValues (_string, _object)
{
    for (var prop in _object){
        console.log(_string+'-->'+prop+':\t '+(((typeof(_object[prop]) === 'object') || (typeof(_object[prop]) === 'function'))  ? typeof(_object[prop]) : _object[prop]));
    }
}

/**
 * z2bEmit emits an event of the type passed in on param 1
 * all Z2BEvents have one extra parameter, which is the order identifier
 * @param {String} _event - the event to be emitted
 * @param {org.acme.supplychain.Order} _order - the orderID to be associated with this event
 */
function z2bEmit(_event, _order)
{
    var method = 'z2bEmit';
    var factory = getFactory();
    var z2bEvent = factory.newEvent(ns, _event);
    z2bEvent.orderID = _order.$identifier;
    z2bEvent.buyerID = _order.buyer.$identifier;
    switch (_event)
    {
        case 'Created':

        break;
        case 'Bought':
        case 'PaymentRequested':
            z2bEvent.sellerID = _order.seller.$identifier;
            z2bEvent.financeCoID = _order.financeCo.$identifier;
        break;
        case 'Ordered':
        case 'Cancelled':
        case 'Backordered':
            z2bEvent.sellerID = _order.seller.$identifier;
            z2bEvent.providerID = _order.provider.$identifier;
        break;
        case 'ShipRequest':
        case 'DeliveryStarted':
        case 'DeliveryCompleted':
            z2bEvent.sellerID = _order.seller.$identifier;
            z2bEvent.providerID = _order.provider.$identifier;
            z2bEvent.shipperID = _order.shipper.$identifier;
        break;
        case 'DisputeOpened':
        case 'Resolved':
        case 'Refunded':
        case 'Paid':
            z2bEvent.sellerID = _order.seller.$identifier;
            z2bEvent.providerID = _order.provider.$identifier;
            z2bEvent.shipperID = _order.shipper.$identifier;
            z2bEvent.financeCoID = _order.financeCo.$identifier;
        break;
        case 'PaymentAuthorized':
            z2bEvent.sellerID = _order.seller.$identifier;
            z2bEvent.financeCoID = _order.financeCo.$identifier;
        break;
        default:
        break;
    }
    emit(z2bEvent);
    return 
}