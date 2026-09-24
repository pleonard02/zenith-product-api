const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();
require("./config/connection.js");

const express = require("express");
const path = require("path"); 
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const productsRouter = require("./routes/productRoutes.js");

app.use('/api/products', productsRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`)
});