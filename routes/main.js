const express = require("express");
const ejs = require("ejs");
const db = require("./database")
const router = express.Router();

router.get("/", (req, res) => {
    ejs.renderFile("./views/index.ejs", {session: req.session}, (err, html) => {
        if (err)
        {
            console.log(err);
            return;
        }

        req.session.msg = "";
        res.send(html);
    });
});

router.get("/reg", (req, res) => {
    ejs.renderFile("./views/registration.ejs", {session: req.session}, (err, html) => {
        if (err)
        {
            console.log(err);
            return;
        }

        req.session.msg = "";
        res.send(html);
    });
});

router.get("/items", (req, res) => {

    db.query(`SELECT * FROM items`,(err, results) =>{
        if (err) {
            req.session.msg = 'Database error!';
            req.session.severity = 'danger';
            return
        }

        let total = 0
        results.forEach(item => {
            total++;
        });

        ejs.renderFile("./views/items.ejs", {session: req.session, results, total}, (err, html) => {
            if (err)
            {
                console.log(err);
                return;
            }
    
            req.session.msg = "";
            res.send(html);
    
        })
    });
})

router.get('/logout', (req, res)=>{
 
    req.session.isLoggedIn = false;
    req.session.userID = null;
    req.session.userName = null;
    req.session.userEmail = null;
    req.session.userRole = null;
    req.session.msg = 'You are logged out!';
    req.session.severity = 'info';
    res.redirect('/');
});

module.exports = router;