var pg = require('pg');
var client = new pg.Client("postgres://khqaykpj:bAxWoVHb0fyS3D07pM1tXYRI_n4ChC3S@john.db.elephantsql.com/khqaykpj");

client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }

  client.query('SELECT * FROM items', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0]);
   
  });

});


const insertItem = async (itemId, itemName, desc, price, avail) => {
    try {
          // gets connection
        await client.query(
            `INSERT INTO "items" ("id", "name", "description", "price", "availability")  
             VALUES ($1, $2,$3, $4, $5)`, [itemId, itemName, desc, price, avail]); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await client.end();               // closes connection
    }
};



module.exports = client, insertItem;