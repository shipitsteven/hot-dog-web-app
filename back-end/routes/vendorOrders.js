const express = require('express');
const router = express.Router();
const db = require('../database/connection');

const queries = {
  getTotal:
    'SELECT ORDER_ID, SUM(ITEM_TOTAL) AS TOTAL FROM (SELECT DATE, ORDER_ID, FIRST_NAME, LAST_NAME, ITEM_NAME, PRICE, QUANTITY, (PRICE*QUANTITY) AS ITEM_TOTAL    FROM ORDERS JOIN CART_ORDERS USING (ORDER_ID) JOIN CART USING (CART_ID) JOIN ORDERS_ITEMS USING (ORDER_ID) JOIN ITEMS USING (ITEM_ID) JOIN ORDER_USERS USING (ORDER_ID) JOIN USERS USING (USER_ID) WHERE COMPLETE = ? AND CART_ID = ? ORDER BY DATE) AS Order_Summary GROUP BY ORDER_ID;',
  getOrders:
    'SELECT DATE, ORDER_ID, FIRST_NAME, LAST_NAME, ITEM_NAME, PRICE, QUANTITY, EMAIL AS CONTACT FROM ORDERS JOIN CART_ORDERS USING (ORDER_ID) JOIN CART USING (CART_ID) JOIN ORDERS_ITEMS USING (ORDER_ID) JOIN ITEMS USING (ITEM_ID) JOIN ORDER_USERS USING (ORDER_ID) JOIN USERS USING (USER_ID) WHERE COMPLETE = ? AND CART_ID = ? ORDER BY DATE;',
};

// vendor/orders/complete/orderID
router.post('/complete/:orderID', (req, res, next) => {
  try {
    let orderID = req.params.orderID;
    let completeOrderQuery = `
    UPDATE CART_ORDERS
    SET COMPLETE = "Y"
    WHERE ORDER_ID = ${orderID}; 
  `;

    // query database for cart orders
    db.query(completeOrderQuery, (err, results, fields) => {
      if (err) throw err;
      res.send('success');
    });
  } catch {
    res.status(400).send('Something went wrong.');
  }
});

// vendor/orders/complete/cartID
router.get('/complete/:cartID', async (req, res) => {
  try {
    let cartID = req.params.cartID;
    const results = (
      await db.promise().execute(queries.getOrders, ['Y', cartID])
    )[0];
    res.json({ data: results });
  } catch {
    res.status(400).send('Something went wrong.');
  }
});

// vendor/orders/cartID
router.get('/:cartID', async (req, res) => {
  try {
    let cartID = req.params.cartID;
    const results = (
      await db.promise().execute(queries.getOrders, ['N', cartID])
    )[0];
    res.json({ data: results });
  } catch {
    res.status(400).send('Something went wrong.');
  }
});

// vendor/orders/cartID/subtotal
router.get('/:cartID/subtotal', async (req, res) => {
  try {
    let cartID = req.params.cartID;
    const results = (
      await db.promise().execute(queries.getTotal, ['N', cartID])
    )[0];
    res.json({ data: results });
  } catch {
    res.status(400).send('Something went wrong.');
  }
});

// vendor/orders/cartID/subtotal/complete
router.get('/:cartID/subtotal/complete', async (req, res) => {
  try {
    let cartID = req.params.cartID;
    const results = (
      await db.promise().execute(queries.getTotal, ['Y', cartID])
    )[0];
    res.json({ data: results });
  } catch {
    res.status(400).send('Something went wrong.');
  }
});

module.exports = router;
