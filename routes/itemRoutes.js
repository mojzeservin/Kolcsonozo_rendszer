const uuid = require("uuid");
const router = require("express").Router();
const db = require("./database");

router.post("/upload", (req, res) => {
    let {title, type} = req.body;
    
    if (!title || !type)
    {
        req.session.msg = 'Missing datas!';
        req.session.severity = 'danger';
        res.redirect('/items');
        return;
    }
    db.query(`INSERT INTO items VALUES('${uuid.v4()}', ?, ?, 1)`,[title, type], (err, results)=>{
        if (err)
        {
            req.session.msg = 'Database error!';
            req.session.severity = 'danger';
            res.redirect('/items');
            return
        }
    
        req.session.msg = 'Added new item!';
        req.session.severity = 'success';
        res.redirect('/items');
        return;
    });
});

router.post('/itemDelete/:id', (req, res)=>{
    if (!req.params.id) {
        req.session.msg = 'Missing ID!';
        req.session.severity = 'danger';
        res.redirect('/items');
        return;
    }

    db.query(`DELETE FROM items WHERE id = '${req.params.id}'`,(err, results)=>{
        if (err)
        {
            req.session.msg = 'Database error!';
            req.session.severity = 'danger';
            res.redirect('/items');
            return
        }
        req.session.msg = 'Item deleted!';
        req.session.severity = 'success';
        res.redirect('/items');
        return;
    });
});

router.post('/itemUpdate/:id', (req, res)=>{

    let {title, type} = req.body;

    if (!title || !type)
    {
        req.session.msg = 'Missing datas!';
        req.session.severity = 'danger';
        res.redirect('/items');
        return;
    }

    if (!req.params.id) {
        req.session.msg = 'Missing ID!';
        req.session.severity = 'danger';
        res.redirect('/items');
        return;
    }

    db.query(`UPDATE items SET title = ?, type = ? WHERE id = ${req.params.id}`,[title, type],(err, results)=>{
        if (err)
        {
            req.session.msg = 'Database error!';
            req.session.severity = 'danger';
            res.redirect('/items');
            return
        }
        req.session.msg = 'Item deleted!';
        req.session.severity = 'success';
        res.redirect('/items');
        return;
    });
});

module.exports = router;