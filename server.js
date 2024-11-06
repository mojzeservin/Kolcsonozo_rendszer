const express = require('express');
const app = express();
require('dotenv').config();
let session = require('express-session');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/assets', express.static('assets'));
app.use(session({ secret: process.env.SESSION_SECRET}));

app.use("/items", require("./routes/itemRoutes"));
app.use("/rentals", require("./routes/rentalRoutes"));
app.use("/users", require("./routes/userRoutes"));

app.listen(process.env.PORT, () => {
    console.log("Server listening on port " + process.env.PORT);
});