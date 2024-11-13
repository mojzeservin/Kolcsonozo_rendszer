const uuid = require("uuid");
const router = require("express").Router();
const db = require("./database");
const passwdRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const moment = require("moment");
const CryptoJS = require("crypto-js");

router.post('/reg', (req, res) => {
   
    let { name, email, passwd, confirm } = req.body;
 
    if (!name || !email || !passwd || !confirm) {
        req.session.msg = 'Missing data!';
        req.session.severity = 'danger';
        res.redirect('/reg');
        return
    }
 
    if (passwd != confirm){
        req.session.msg = 'Passwords dont match!';
        req.session.severity = 'danger';
        res.redirect('/reg');
        return
    }
 
    if (!passwd.match(passwdRegExp)){
        req.session.msg = 'Password is weak!';
        req.session.severity = 'danger';
        res.redirect('/reg');
        return
    }
 
    db.query(`SELECT * FROM users WHERE email = ?`, [email], (err, results)=>{
        if (err)
        {
            req.session.msg = 'This e-mail already registered!';
            req.session.severity = 'danger';
            res.redirect('/reg');
            return
        }
 
        db.query(`INSERT INTO users VALUES('${uuid.v4()}', ?, ?, SHA1(?), '${moment().format("YYYY-MM-DD")}', 'user')`, [name, email, passwd], (err, results) => {
            if (err){
                req.session.msg = 'Database error!';
                req.session.severity = 'danger';
                res.redirect('/reg');
                return
            }
            req.session.msg = 'User registered!';
            req.session.severity = 'success';
            res.redirect('/');
            return
        })
    });
});

router.post('/login', (req, res)=>{
    let { email, passwd } = req.body;
 
    if (!email || !passwd) {
        req.session.msg = 'Missing data!';
        req.session.severity = 'danger';
        res.redirect('/');
        return
    }

    db.query(`SELECT * FROM users WHERE email = ? AND passwd = ?`, [email, CryptoJS.SHA1(passwd).toString()], (err, results) => {
        if (err)
        {
            req.session.msg = 'Database error!';
            req.session.severity = 'danger';
            res.redirect('/');
            return
        }

        if (results == 0)
        {
            req.session.msg = 'Invalid credentials!';
            req.session.severity = 'danger';
            res.redirect('/');  
            return
        }

        req.session.msg = 'You are logged in!';
        req.session.severity = 'info';
 
        req.session.isLoggedIn = true;
        req.session.userID = results[0].id;
        req.session.userName = results[0].name;
        req.session.userEmail = results[0].email;
        req.session.userRole = results[0].role;
 
        res.redirect('/items');
        return
    });
});

router.post('/userDelete/:id', (req, res)=>{
    
    if (!req.params.id) {
        req.session.msg = 'Missing ID!';
        req.session.severity = 'danger';
        res.redirect('/users');
        return;
    }

    db.query(`DELETE FROM users WHERE id = '${req.params.id}'`,(err, results)=>{
        if (err)
        {
            req.session.msg = 'Database error!';
            req.session.severity = 'danger';
            res.redirect('/users');
            return
        }
        req.session.msg = 'User deleted!';
        req.session.severity = 'success';
        res.redirect('/users');
        return;
    });
});

router.post('/userUpdate/:id', (req, res)=>{

    let {name, role} = req.body;

    if(!name || !role)
    {
        req.session.msg = 'Missing data!';
        req.session.severity = 'danger';
        res.redirect('/users');
        return
    }    

    if (!req.params.id) {
        req.session.msg = 'Missing ID!';
        req.session.severity = 'danger';
        res.redirect('/users');
        return;
    }

    db.query(`UPDATE users SET name = ?, role = ? WHERE id = '${req.params.id}'`, [name, role], (err, results)=>{
        if (err)
        {
            req.session.msg = 'Database error!';
            req.session.severity = 'danger';
            res.redirect('/users');
            return
        }
        req.session.msg = 'User updated!';
        req.session.severity = 'success';
        res.redirect('/users');
        return;
    });
});

module.exports = router