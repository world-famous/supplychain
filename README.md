# Supply Chain Business App


Hyperledger Composer business Application for Supply Chain

Build a supply chain application consisting of the following components:

## 5 participants:

1. Buyer
2. Seller
3. Shipper
4. Provider
5. Finance Company

## A Single Asset:
- Order

## 14 Transactions:

1. CreateOrder 
2. OrderCancel 
3. Buy 
4. OrderFromSupplier 
5. RequestShipping 
6. Deliver 
7. Delivering 
8. BackOrder
9. Dispute 
10. Resolve 
11. RequestPayment 
12. AuthorizePayment
13. Pay 
14. Refund

## 14 Events:

1. Created  
2. Bought  
3. Ordered  
4. Cancelled  
5. Backordered  
6. ShipRequest  
7. DeliveryStarted  
8. DeliveryCompleted
9. DisputeOpened  
10. Resolved  
11. Refunded  
12. PaymentRequested 
13. PaymentAuthorized  
14. Paid

Instructions for completing the project:

Let's start with building a model for our business network:

In the **models** folder, open the **org.acme.supplychain.cto** file:

Participants **Buyer, Seller, Shipper, Provider and FinanceCo** have been declared already for you.

The asset **Order** has also been declared for you with all its attributes.

Bunch of events have also have been declared for you at the bottom of the file.

Some guidelines for declaring objects:

An attribute can be declared as follows:

```
o <Datatype> <attribute_name>
```
eg:

```
o String orderNumber
```
A reference to another object can be declared as follows:
```
--> <Object_Name> <reference_name>
```
eg:
```
--> Buyer buyer
```

Every Transaction object declared specifies the input given to transaction processor function which will be completed at a later stage.

## Instructions for completing each transaction objects:
---------------------

1. For **CreateOrder** include an attribute amount. There will be references to Order, Buyer, Seller and FinanceCo.

2. For **OrderCancel**
there will be references to Order, Buyer and Seller involved.

3. For **Buy**
there will be references to Order, Buyer and Seller involved.

4. For **OrderFromSupplier** there will be references to Order, Provider and Seller

5. For **RequestShipping** there will be references to Order, Shipper and Provider

6. For **Deliver** there will be references to Order, Shipper.

7. For **Delivering** there will be references to Order, Shipper. Also there'll be an attribute called deliveryStatus.

8. For **BackOrder** there'll be a string attribute called backorder and there'll be a reference to Order and Provider.

9. For **Dispute** there'll be a string attribute called dispute and there'll be a reference to Order, Buyer, Seller and FinanceCo.

10. For **Resolve** there'll be a string called resolve and there'll be a reference to Order and all 5 actors involved with the order.

11. For **RequestPayment** there'll be references to Order, Seller and FinanceCo.

12. For **AuthorizePayment** there'll be reference to Order, Buyer and FinanceCo

13. For **Pay** there will be references to Order, Seller and FinancCo.

14. For **Refund** there will be an attribute called refund and there will be references to Order, Seller and FinanceCo.


 Further we need to fill up the transaction processor functions:

In the **lib** folder there exists a file called **logic.js** that has all the transaction processor functions:

You'll notice a variable called orderStatus has already been declared that tracks the status of an order.

The transaction processor function for **CreateOrder** has already been written for you.

## Some guidelines for writing transaction processor functions:
------------------------------------------------------------------

If you remember the transaction **CreateOrder** could declared in the **org.acme.supplychain.cto** file as follows:

```
transaction CreateOrder {
    o Integer amount
    --> Order order
    --> Buyer buyer
    --> Seller seller
    --> FinanceCo financeCo
}
```
In the **logic.js** you'll notice this line:
```
 @param {org.acme.supplychain.CreateOrder} purchase - the order to be processed
 * @transaction
```
This line links the transaction processor function in the logic.js file to the object declared in the models folder. All the inputs to the transaction are packed in the purchase variable.

To access/update the inputs given to this transaction:

 Suppose we want to update the buyer of the order, amount of the order, Finance Company involved with the order, date created and status of the order we can use the following code template. 
```
purchase.order.buyer = purchase.buyer;
purchase.order.amount = purchase.amount;
purchase.order.financeCo = purchase.financeCo;
purchase.order.created = new Date().toISOString();

```
All objects are stored in registries which can be updated using JavaScript promises using the following code template:

```
return getAssetRegistry('org.acme.supplychain.Order')
        .then(function (assetRegistry) {
            return assetRegistry.update(purchase.order)
            .then (function (_res) 
            {
                z2bEmit('Created', purchase.order);
                return (_res);
            }).catch(function(error){return(error);});
        });

```

Also at the end of every transaction there exists an event emitted that notifies our application about the change in the status of the order 

You'll notice that all the events have been implemented in theh logic.js file at the very bottom in a function called **z2bEmit**

To explore more about Hyperledger composer syntax and methods you can refer to this link:

[Hyperledger Composer Documentation](https://hyperledger.github.io/composer/latest/introduction/introduction.html)

Complete the transaction processor functions according to these guidelines:

1. For the **Buy** transaction processor function, you need to:
- Check whether the order has been created.
- Update the Buyer of the order.
- Update the Seller of the order.
- Update the bought attribute of the order to the current date.
- Update the order status to Bought.
- Update the Order AssetRegistry.
- Emit 'Bought' event after updating the AssetRegistry.

2. For the **OrderCancel** transaction processor function, you need to:
- Check whether the order has been created or whether the order has been bought.
- Update the Buyer of the order.
- Update the Seller of the order.
- Update the cancelled attribute of the order to the current date.
- Update the order status to Cancelled.
- Update the Order AssetRegistry.
- Emit 'Cancelled' event after updating the AssetRegistry.
 
3. For the **OrderFromSupplier** transaction processor function, you need to:
- Check whether the order  has been bought.
- Update the Provider of the order.
- Update the ordered attribute of the order to the current date.
- Update the order status to Ordered.
- Update the Order AssetRegistry.
- Emit 'Ordered' event after updating the AssetRegistry.

4. For the **RequestShipping** transaction processor function, you need to:
- Check whether the order  status is 'Ordered'.
- Update the Shipper of the order.
- Update the requestShipment attribute of the order to the current date.
- Update the order status to ShipRequest.
- Update the Order AssetRegistry.
- Emit 'ShipRequest' event after updating the AssetRegistry.

5. For the **Delivering** transaction processor function, you need to:
- Check whether the order  status is 'ShipRequest' or 'Delivering'.
- Update the delivering attribute of the order to the current date.
- Update the order status to deliveryStatus.
- Update the Order AssetRegistry.
- Emit 'DeliveryStarted' event after updating the AssetRegistry.

6. For the **Deliver** transaction processor function, you need to:
- Check whether the order  status is 'ShipRequest' or 'Delivering'.
- Update the delivered attribute of the order to the current date.
- Update the order status to Delivered.
- Update the Order AssetRegistry.
- Emit 'DeliveryCompleted' event after updating the AssetRegistry.

7. For the **RequestPayment** transaction processor function, you need to:
- Check whether the order  status is 'Delivered' or 'Resolved'.
- Update the FinanceCo of the order.
- Update the paymentRequested attribute of the order to the current date.
- Update the order status to PayRequest.
- Update the Order AssetRegistry.
- Emit 'PaymentRequested' event after updating the AssetRegistry.

8. For the **AuthorizePayment** transaction processor function, you need to:
- Check whether the order  status is 'Delivered' or 'Resolved'.
- Update the approved attribute of the order to the current date.
- Update the order status to Authorize.
- Update the Order AssetRegistry.
- Emit 'PaymentAuthorized' event after updating the AssetRegistry.

9. For the **Pay** transaction processor function, you need to:
- Check whether the order  is authorized.
- Update the paid attribute of the order to the current date.
- Update the order status to Authorize.
- Update the Order AssetRegistry.
- Emit 'Paid' event after updating the AssetRegistry.

10. For the **Dispute** transaction processor function, you need to:
- Update the order status to Dispute.
- Update the dispute attribute of the order.
- Update the disputeOpened attribute of the order to the current date.
- Update the Order AssetRegistry.
- Emit 'DisputeOpened' event after updating the AssetRegistry.

11. For the **Resolve** transaction processor function, you need to:
- Update the order status to Resolve.
- Update the resolve attribute of the order.
- Update the disputeResolved attribute of the order to the current date.
- Update the Order AssetRegistry.
- Emit 'Resolved' event after updating the AssetRegistry.

12. For the **Refund** transaction processor function, you need to:
- Update the order status to Refund.
- Update the refund attribute of the order.
- Update the orderRefunded attribute of the order to the current date.
- Update the Order AssetRegistry.
- Emit 'Refunded' event after updating the AssetRegistry.

13. For the **BackOrder** transaction processor function, you need to:
- Update the order status to BackOrdered.
- Update the BackOrder attribute of the order.
- Update the dateBackordered attribute of the order to the current date.
- Update the Provider of the order.
- Update the Order AssetRegistry.
- Emit 'Backordered' event after updating the AssetRegistry.

## Updating Permission Files:
------------------------------------------------------------------

In a hyperledger application every actor is governed by a set of rules by which we decide what aspects of the application they can accesss.

These rules are enlisted in the **permissions.acl** file. 

If you open this file you'll notice the rule BuyerACLCreate aleardy declared which looks something like this:

```
rule BuyerACLCreate {
    description: "Enable Buyers to execute all actions on an Order"
    participant(m): "org.acme.supplychain.Buyer"
    operation: READ, CREATE, UPDATE
    resource(v): "org.acme.supplychain.**"
    transaction(tx): "org.acme.supplychain.CreateOrder"
    condition: (v.buyer.buyerID == m.getIdentifier())
    action: ALLOW
}

```

For a conditional ACL Rule we define the participant, resource, transaction involved, along with the operations that the actor is permitted to perform while executing the transaction. 

To complete this application you need to update all ACL rules according to these guidelines:

1. For the rule **BuyerACLBuy** allow the actor to READ, CREATE and UPDATE while executing the Buy transaction.

2. For the rule **BuyerACL Cancel** allow the actor to READ, CREATE, DELETE and UPDATE while executing the Buy transaction.

3. For the rule **BuyerACLDispute** allow the actor to READ, CREATE and UPDATE while executing the Dispute transaction.

4. For the rule **BuyerACLResolve** allow the actor to READ, CREATE and UPDATE while executing the Resolve transaction.

5. For the rule **BuyerACLAuthorize Payment** allow the actor to READ, CREATE and UPDATE while executing the AuthorizePayment transaction.

6. For the rule **BuyerACL** allow the actor full access to any order where they are listed as Buyer.

7. For the rule **netAccessBuyer** allow the actor to fully access the network. The resource here will be "org.hyperledger.composer.system.**".

8. For the rule **SellerOrderFromSupplier** allow the actor to READ, CREATE and UPDATE while executing the OrderFromSupplier transaction.

9. For the rule **SellerRequestPayment** allow the actor to READ, CREATE and UPDATE while executing the RequestPayment transaction.

10. For the rule **SellerRefund** allow the actor to READ, CREATE and UPDATE while executing the Refund transaction.

11. For the rule **SellerACL** allow the actor to READ and UPDATE orders wherever they are listed as Seller.

12. For the rule **netAccessSeller** allow the actor full access to the network.

13. For the rule **ProviderRequestShipping** allow the actor to READ, CREATE and UPDATE while executing the RequestShipping transaction.

14. For the rule **ProviderBackorder** allow the actor to READ, CREATE and UPDATE while executing the BackOrder transaction.

15. For the rule **ProviderPayRequest** allow the actor to READ, CREATE and UPDATE while executing the RequestPayment transaction.

16. For the rule **ProviderResolve** allow the actor to READ, CREATE and UPDATE while executing the Resolve transaction.

17. For the rule **ProviderRefund** allow the actor to READ, CREATE and UPDATE while executing the Refund transaction.

18. For the rule **ProviderACL** allow the actor to READ and UPDATE where they are listed as seller and the order has been submitted to them to provide (Seller issues OrderFromSupplier transaction.

19. For the rule **netAccessProvider** allow the provider full access to the network.

20. For the rule **ShipperRefund**  allow the actor to READ, CREATE and UPDATE while executing the Refund transaction.

21. For the rule **ShipperResolve**  allow the actor to READ, CREATE and UPDATE while executing the Resolve transaction.

22. For the rule **ShipperDelivering**  allow the actor to READ, CREATE and UPDATE while executing the Delivering transaction.

23. For the rule **ShipperDelivered**  allow the actor to READ, CREATE and UPDATE while executing the Refund Deliver.

24. For the rule **ShipperACL**  allow the actor to READ and UPDATE where they are listed as shipper and the order has been Submitted for delivery.

25. For the rule **netAccessShipper** allow the Shipper full access to the network.

26. For the rule **FinanceCoACL2** allow Finance Company to access all orders.

27. For the rule **FinanceCoACL** allow Finance Company full access to order where they are listed as FinanceCo and the order has been Submitted for delivery.

28. For the rule **netAccessFinanceCo** allow the Finance Company access to the network.

Also write a script called **buildanddeploy.sh** that creates the business archive file, create network and admin connection cards and deploys the network.

Help can be found here :

[Hyperledger Fabric Developer Tutorial](https://hyperledger.github.io/composer/latest/tutorials/developer-tutorial)