const uuid = require("uuid");
const router = require("express").Router();
const db = require("./database");

router.post('/rentalDelete/:id', (req, res)=>{
    if (!req.params.id) {
        req.session.msg = 'Missing ID!';
        req.session.severity = 'danger';
        res.redirect('/rentals');
        return;
    }

    db.query(`DELETE FROM rentals WHERE id = '${req.params.id}'`,(err, results)=>{
        if (err)
        {
            req.session.msg = 'Database error!';
            req.session.severity = 'danger';
            res.redirect('/users');
            return
        }
        
        req.session.msg = 'Rent deleted!';
        req.session.severity = 'success';
        res.redirect('/rentals');
        return;
    });
});

module.exports = router