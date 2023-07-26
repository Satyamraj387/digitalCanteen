/** @format */

const db = require("../config/db");

module.exports.fetcher = async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM items");

    return res.json(200, {
      message: "Success",
      data: results.rows,
      success: true,
    });
  } catch (error) {
    return res.json(400, {
      message: error,
      success: false,
    });
  }
};


module.exports.updateItem = async (req, res) => {
  try {
    console.log(req.body);

    await db.query(
      `UPDATE items SET "name"=$2, "description"=$3, "price"=$4, "availability"=$5 
            WHERE "id"=$1`,
      [
        req.body.id,
        req.body.name,
        req.body.description,
        req.body.price,
        req.body.availability,
      ]
    ); // sends queries
    return res.json(200, {
      message: "Successfully updated item in menu",
      success: true,
    });
  } catch (error) {
    return res.json(400, {
      message: "Sorry try again",
      error: error,
      success: false,
    });
  }
};


module.exports.deleteItem = async (req, res) => {
  try {
    console.log(req.body);

    await db.query(
      `DELETE FROM items where id=$1`,
      [
        req.body.id,
      ]
    ); // sends queries
    return res.json(200, {
      message: "Successfully deleted item from menu",
      success: true,
    });
  } catch (error) {
    return res.json(400, {
      message: "Sorry try again",
      error: error,
      success: false,
    });
  }
};



module.exports.insertItem = async (req, res) => {
  try {
    console.log(req.body);

    await db.query(
      `INSERT INTO "items" ("id", "name", "description", "price", "availability")  
            VALUES ($1, $2,$3, $4, $5)`,
      [
        req.body.id,
        req.body.name,
        req.body.description,
        req.body.price,
        req.body.availability,
      ]
    ); // sends queries
    console.log(req.body)
    return res.json(200, {
      message: "Successfully inserted item in menu",
      success: true,
    });
  } catch (error) {
    return res.json(400, {
      message: "Sorry try again",
      error: error,
      success: false,
    });
  }
};
