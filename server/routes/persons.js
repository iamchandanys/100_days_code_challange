const express = require("express");
const router = express.Router();
const Joi = require("joi");

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
      res.status(400).send(`Error while connecting - ${err}`);
      return;
    }

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query("SELECT * FROM [dbo].[Persons]", (err, recordset) => {
      if (err) {
        res.status(400).send(`Error while querying - ${err}`);
        return;
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
      res.status(400).send(`Error while connecting - ${err}`);
      return;
    }

    var request = new sql.Request();

    request.query(`SELECT TOP (1) * FROM [dbo].[Persons] where PersonID = ${req.params.id}`, (err, recordset) => {
      if (err) {
        res.status(400).send(`Error while querying - ${err}`);
        return;
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
  //#region JOI validations

  const schema = Joi.object({
    id: Joi.number().integer().min(1).max(3000).required(),
    firstName: Joi.string().min(3).required(),
  });

  const validationResult = schema.validate({
    id: req.body.id,
    firstName: req.body.firstName,
  });

  if (validationResult.error) {
    res.status(400).send(validationResult.error);
    return;
  }

  //#endregion

  const sql = require("mssql");

  sql.connect(config, (err) => {
    if (err) {
      res.status(400).send(`Error while connecting - ${err}`);
      return;
    }

    const request = new sql.Request();

    request.query(`INSERT INTO [dbo].[Persons] VALUES (${req.body.id}, '${req.body.lastName}', '${req.body.firstName}', '${req.body.address}', '${req.body.city}')`, (err, recordset) => {
      if (err) {
        res.status(400).send(`Error while querying - ${err}`);
        return;
      }

      res.status(200).send("Person added successfully!");
    });
  });
});

router.put("/updateperson/:id", (req, res) => {
  // get person by id...
  const sql = require("mssql");

  sql.connect(config, (err) => {
    if (err) {
      res.status(400).send(`Error while connecting - ${err}`);
      return;
    }

    var request = new sql.Request();

    request.query(`SELECT TOP (1) * FROM [dbo].[Persons] where PersonID = ${req.params.id}`, (err, recordset) => {
      if (err) {
        res.status(400).send(`Error while querying - ${err}`);
        return;
      }

      if (recordset.recordset && recordset.recordset.length > 0) {
        // update person...
        request.query(`UPDATE [dbo].[Persons] SET FirstName='${req.body.firstName}', LastName='${req.body.lastName}' WHERE PersonID=${req.params.id}`, (err, recordset) => {
          if (err) {
            res.status(400).send(`Error while querying - ${err}`);
            return;
          }

          res.status(200).send("Person updated successfully!");
        });
      } else {
        res.status(404).send("Record not found.");
      }
    });
  });
});

router.delete("/deleteperson/:id", (req, res) => {
  const sql = require("mssql");

  sql.connect(config, (err) => {
    if (err) {
      res.status(400).send(`Error while connecting - ${err}`);
      return;
    }

    var request = new sql.Request();

    request.query(`DELETE FROM [dbo].[Persons] WHERE PersonID = ${req.params.id}`, (err, recordset) => {
      if (err) {
        res.status(400).send(`Error while querying - ${err}`);
        return;
      }

      res.status(200).send("Person deleted successfully!");
    });
  });
});

module.exports = router;
