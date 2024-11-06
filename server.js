const express = require('express');
const app = express();
require('dotenv').config();

app.use("/items", require("./routes/itemRoutes"));
app.use("/rentals", require("./routes/rentalRoutes"));
app.use("/users", require("./routes/userRoutes"));

app.listen(process.env.PORT, () => {
    console.log("Server listening on port " + process.env.PORT);
});