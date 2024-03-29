'use strict';

var router = require('express').Router(),
	_ = require('lodash');

var HttpError = require('../../utils/HttpError');
var User = require('./user.model');

router.param('id', function (req, res, next, id) {
	User.findById(id).exec()
	.then(function (user) {
		if (!user) throw HttpError(404);
		req.requestedUser = user;
		next();
	})
	.then(null, next);
});

router.get('/', function (req, res, next) {
	User.find({}).exec()
	.then(function (users) {
		res.json(users);
	})
	.then(null, next);
});

//Login
router.post('/login', function(req, res, next){
	User.findOne(req.body)
	.then(function(userInfo){
		if(!userInfo){
			res.sendStatus(401);
		} else{
			_.extend(req.session, {userId: userInfo._id});
			var timeOut = 3600000;
			req.session.cookie.maxAge = timeOut;
			res.sendStatus(200);
		}
	})
	.then(null, next);
});

//Logout
router.post('/logout', function(req, res, next){
	if(req.session){
		req.session.destroy(function(err){
			// TODO: err hand. every thing else if there is no sess.
			console.log('This is an error', err);
		});
	}
});

router.post('/', function (req, res, next) {
	User.create(req.body)
	.then(function (userInfo) {
		_.extend(req.session, {userId: userInfo._id});
		res.status(201).json(userInfo);
	})
	.then(null, next);
});


router.get('/:id', function (req, res, next) {
	req.requestedUser.getStories()
	.then(function (stories) {
		var obj = req.requestedUser.toObject();
		obj.stories = stories;
		res.json(obj);
	})
	.then(null, next);
});

router.put('/:id', function (req, res, next) {
	_.extend(req.requestedUser, req.body);
	req.requestedUser.save()
	.then(function (user) {
		res.json(user);
	})
	.then(null, next);
});

router.delete('/:id', function (req, res, next) {
	req.requestedUser.remove()
	.then(function () {
		res.status(204).end();
	})
	.then(null, next);
});

module.exports = router;
