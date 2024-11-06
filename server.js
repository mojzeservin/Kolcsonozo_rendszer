const express = require('express');
const ejs = require('ejs');
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

app.get("/", (req, res) => {
    ejs.renderFile('./views/index.ejs', {session: req.session}, (err, html) => {
        if (err)
        {
            console.log(err);
            return;
        }

        req.session.msg = "";
        res.send(html);
    });
})

app.listen(process.env.PORT, () => {
    console.log("Server listening on port " + process.env.PORT);
});