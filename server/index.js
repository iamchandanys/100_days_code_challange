const express = require("express");
const app = express();

// middleware to convert req body to json
app.use(express.json());

// route config
const personRouter = require("./routes/persons");
app.use("/api/persons", personRouter);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port}. DB_USER_NAME - ${process.env.DB_USER_NAME}, DB_USER_PASSWORD - ${process.env.DB_USER_PASSWORD}, DB_SERVER_NAME - ${process.env.DB_SERVER_NAME}, DB_DATABASE_NAME - ${process.env.DB_DATABASE_NAME}`);
});
