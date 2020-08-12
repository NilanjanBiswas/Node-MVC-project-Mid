var express = require('express');
var userModel = require.main.require('./models/user');
var router = express.Router();


router.get('/signup', function(req, res) {
    res.render('signup/index');
});


router.post('/signup', function(req, res) {

    var user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        type: req.body.type
    }

    userModel.insert(user, function(status) {
        if (status) {
            res.redirect('/login');
        } else {
            res.redirect('/signup');
        }
    });
});


router.get('/view_users', function(req, res) {

    userModel.getAll(function(results) {
        res.render('home/userlist', { userList: results, uname: req.session.username });
    });
});


router.get('/create', function(req, res) {
    res.render('home/add');
});


router.post('/create', function(req, res) {

    var user = {
        username: req.body.uname,
        password: req.body.password,
        email: req.body.email,
        type: req.body.type
    }

    userModel.insert(user, function(status) {
        if (status) {
            res.redirect('/home/view_users');
        } else {
            res.redirect('/home/create');
        }
    });
});

router.get('/update/:id', function(req, res) {

    userModel.get(req.params.id, function(result) {
        res.render('home/update', { user: result });
    });

});

router.post('/edit/:id', function(req, res) {

    var user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        type: req.params.type
    }

    userModel.update(user, function(status) {
        if (status) {
            res.redirect('/home/view_users');
        } else {
            res.redirect('/home');
        }
    });
});

router.get('/delete/:id', function(req, res) {

    userModel.get(req.params.id, function(result) {
        res.render('home/delete', { user: result });
    });

});

router.post('/delete/:id', function(req, res) {

    userModel.delete(req.body.id, function(status) {
        if (status) {
            res.redirect('/home/view_users');
        } else {
            res.redirect('/home');
        }
    });
});



module.exports = router;