require('dotenv').config({path: './.env'})
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;
const routes = require("./routes/index");
const { default: helmet } = require("helmet");
const bodyParser = require("body-parser");

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);
app.use(helmet());
app.use("/api", routes);
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
