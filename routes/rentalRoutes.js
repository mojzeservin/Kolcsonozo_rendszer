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

    
    db.query(`SELECT itemID FROM rentals WHERE id = '${req.params.id}'`, (err, results) => {
        if (err)
        {
            req.session.msg = 'Database error!';
            req.session.severity = 'danger';
            res.redirect('/rentals');
            return;
        }

        db.query(`UPDATE items SET available = '1' WHERE id = '${results[0].itemID}'`, (subErr1, subResults1) => {
            if (subErr1)
            {
                req.session.msg = 'Database error!';
                req.session.severity = 'danger';
                res.redirect('/rentals');
                return;
            }
        });

        db.query(`DELETE FROM rentals WHERE id = '${req.params.id}'`,(subErr2, subResults2) => {
            if (subErr2)
            {
                req.session.msg = 'Database error!';
                req.session.severity = 'danger';
                res.redirect('/rentals');
                return;
            }
            
            req.session.msg = 'Item returned!';
            req.session.severity = 'success';
            res.redirect('/rentals');
            return;
        });
    });
});

module.exports = router