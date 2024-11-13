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

router.get('/itemDelete/:id', (req, res) => {
    let id = req.params.id;

    ejs.renderFile('./views/itemDelete.ejs', {session: req.session, id}, (err, html)=>{
        if (err)
            {
                console.log(err);
                return;
            }
    
            req.session.msg = "";
            res.send(html);
    })
});

router.get('/itemUpdate/:id', (req, res) => {
    let id = req.params.id;

    ejs.renderFile('./views/itemUpdate.ejs', {session: req.session, id}, (err, html)=>{
        if (err)
            {
                console.log(err);
                return;
            }
    
            req.session.msg = "";
            res.send(html);
    })
});

router.get('/users', (req, res) => {
    db.query(`SELECT * FROM users`, (err, results)=>{
        if (err)
        {
            req.session.msg = 'Database error!';
            req.session.severity = 'danger';
            res.redirect('/');
            return;
        }

        let total = 0
        results.forEach(item => {
            total++;
        });
        ejs.renderFile('./views/users.ejs', {session: req.session, results, total}, (err, html)=>{
            if (err)
            {
                console.log(err);
                return;
            }
    
            req.session.msg = "";
            res.send(html);
        })
    });
});

router.get('/userDelete/:id', (req, res) => {
    let id = req.params.id;

    ejs.renderFile('./views/userDelete.ejs', {session: req.session, id}, (err, html)=>{
        if (err)
            {
                console.log(err);
                return;
            }
    
            req.session.msg = "";
            res.send(html);
    })
});

router.get('/userUpdate/:id', (req, res) => {
    let id = req.params.id;

    ejs.renderFile('./views/userUpdate.ejs', {session: req.session, id}, (err, html)=>{
        if (err)
            {
                console.log(err);
                return;
            }
    
            req.session.msg = "";
            res.send(html);
    })
});

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