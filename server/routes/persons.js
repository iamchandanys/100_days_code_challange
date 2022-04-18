const express = require("express");
const router = express.Router();

// config for database
const config = {
  user: process.env.DB_USER_NAME,
  password: process.env.DB_USER_PASSWORD,
  server: process.env.DB_SERVER_NAME,
  database: process.env.DB_DATABASE_NAME,
};

router.get("/getpersonslist", (req, res) => {
  var sql = require("mssql");

  // connect to database
  sql.connect(config, (err) => {
    if (err) {
      console.log(err);
      res.status(400).send(`Error while connecting - ${err}`);
    }

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query("SELECT * FROM [dbo].[Persons]", (err, recordset) => {
      if (err) {
        console.log(err);
        res.status(400).send(`Error while querying - ${err}`);
      }

      // send records as a response
      res.send(recordset.recordsets);
    });
  });
});

router.get("/getpersonbyid/:id", (req, res) => {
  // sample url - http://localhost:3002/api/persons/getpersonbyid/1/chandan?sortby=name
  // req.params holds all the path params.
  console.log(req.params); // returns { id: '1', name: 'chandan' }
  // req.query holds all the query params.
  console.log(req.query); // returns { sortby: 'name' }

  var sql = require("mssql");

  sql.connect(config, (err) => {
    if (err) {
      console.log(err);
      res.status(400).send(`Error while connecting - ${err}`);
    }

    var request = new sql.Request();

    request.query(`SELECT TOP (1) * FROM [dbo].[Persons] where PersonID = ${req.params.id}`, (err, recordset) => {
      if (err) {
        console.log(err);
        res.status(400).send(`Error while querying - ${err}`);
      }

      if (recordset.recordset && recordset.recordset.length > 0) {
        res.send(recordset.recordset);
      } else {
        res.status(404).send("Record not found.");
      }
    });
  });
});

router.post("/addperson", (req, res) => {
  const sql = require("mssql");

  sql.connect(config, (err) => {
    if (err) {
      console.log(err);
      res.status(400).send(`Error while connecting - ${err}`);
    }

    const request = new sql.Request();

    request.query(`INSERT INTO [dbo].[Persons] VALUES (${req.body.id}, '${req.body.lastName}', '${req.body.firstName}', '${req.body.address}', '${req.body.city}')`, (err, recordset) => {
      if (err) {
        console.log(err);
        res.status(400).send(`Error while querying - ${err}`);
      }

      res.status(200).send(recordset);
    });
  });
});

module.exports = router;
