/**
 * GiftController
 *
 * @description :: Server-side logic for managing gifts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var redis = require('redis');
var client = redis.createClient({ db: 10 })

module.exports = {
	show: function (req, res) {
		res.view();
	},
	create: function (req, res) {
		sails.log.debug('create');
		sails.log.debug(req.body);
		var body = req.body;
		if (body && body.name) {
			client.hmset(body.name, body, function(err) {
				if (err) {
					sails.log.error(err);
					client.quit();
					return res.serverError(err);
				} else {
					client.sadd("names", body.name, function(err) {
						if (err) {
							sails.log.error(err);
						}

						client.quit();
						return res.ok();
					});
				}
			});
		} else {
			client.quit();
			return res.badRequest('no body or no name');
		}
	},
	del: function (req, res) {
		sails.log.debug('del');
		var name = req.param('name');
		if (name) {
			sails.log.debug('name: ' + name);
			client.del(name, function(err) {
				if (err) {
					sails.log.error(err);
					client.quit();
					return res.serverError(err);
				} else {
					client.srem("names", name, function(err) {
						if (err) {
							sails.log.error(err);
							client.quit();
							return res.serverError(err);
						}

						client.quit();
						return res.ok();
					});
				}
			});
		}
		else {
			client.quit();
			return res.badrequest('no name specified');
		}
	}
};

