const express = require('express');
const router = express.Router();
const db = require('../database/connection');
const logger = require('../src/logging');

const queries = {
  findExistingUser:
    'SELECT User_ID FROM Users WHERE First_Name = ? AND Last_Name = ? AND Email = ?;',
  createNewUser:
    'INSERT INTO USERS(EMAIL, USERS.PASSWORD, FIRST_NAME, LAST_NAME, PERMISSION) VALUES	(?, "", ?, ?, "CUSTOMER");',
  createNewOrder: 'INSERT INTO ORDERS (DATE) VALUES (NOW());',
};

router.post('/order', async (req, res) => {
  try {
    requestData = req.body;
    let cartID = requestData.cartID;
    const { firstName, lastName, contact } = requestData;

    let customerID;

    // check for existing user using name and email
    const existingUser = (
      await db
        .promise()
        .execute(queries.findExistingUser, [firstName, lastName, contact])
    )[0];

    // create new user or set current customer to existing user id
    if (existingUser.length === 0) {
      const newUserID = (
        await db
          .promise()
          .execute(queries.createNewUser, [contact, firstName, lastName])
      )[0].insertId;
      customerID = newUserID;
    } else {
      customerID = existingUser[0].User_ID;
    }
    logger(customerID, `${firstName} ${lastName} placed an order`);

    const orderID = (await db.promise().execute(queries.createNewOrder))[0]
      .insertId;

    // get maximum item ID in database
    let getLargestItemIDQuery = `SELECT ITEM_ID FROM ITEMS
    ORDER BY ITEM_ID DESC
    LIMIT 1
    ;`;
    let maxItemID = (await db.promise().query(getLargestItemIDQuery))[0][0]
      .ITEM_ID;
    const itemsArray = [];
    for (let i = 1; i <= maxItemID; i++) {
      itemsArray.push(i);
    }

    // add items to order
    for (const key in requestData) {
      if (key === 'order') {
        for (const value in requestData[key]) {
          let itemid = parseInt(value);
          let quantity = requestData[key][value];
          if (itemsArray.includes(itemid) && quantity > 0) {
            let addItemQuery = await `INSERT INTO ORDERS_ITEMS
          (ORDER_ID, ITEM_ID, QUANTITY)
          VALUES 	
            (${orderID}, ${itemid}, ${quantity});
          `;
            let addItem = await db.promise().query(addItemQuery);
          }
        }
      }
    }

    // add order to CART_ORDERS
    let addItemsCartQuery = `INSERT INTO CART_ORDERS(CART_ID, ORDER_ID, COMPLETE)
    VALUES	(${cartID}, ${orderID}, "N")
    ;`;

    let cartOrders = await db.promise().query(addItemsCartQuery);

    // add order to ORDER_USERS
    let orderUsersQuery = `INSERT INTO ORDER_USERS(USER_ID, ORDER_ID)
    VALUES  (${customerID}, ${orderID})
    ;`;
    let userOrders = await db.promise().query(orderUsersQuery);

    res.send(`Order placed successfully, your order ID is ${orderID}`);
  } catch {
    res.status(400).send('Something went wrong.');
  }
});

// customers/cartID route
router.get('/:cartID', (req, res, next) => {
  let cartID = req.params.cartID;
  let custCartQuery = `SELECT ITEM_ID, ITEM_NAME, DESCRIPTION_ITEM, PRICE
    FROM MENU 
    JOIN ITEMS_MENU USING (MENU_ID) 
    JOIN ITEMS USING (ITEM_ID) 
    JOIN CART USING (MENU_ID) 
    WHERE CART_ID = ${cartID} AND ITEMS_MENU.AVAILABLE ="Y";`;

  // querry database
  db.query(custCartQuery, (err, results) => {
    if (err) throw err;
    let output = { data: results };
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(output);
  });
});

module.exports = router;
