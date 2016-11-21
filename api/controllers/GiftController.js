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
		return res.view();
	},
	create: function (req, res) {
		sails.log.debug('create');
		sails.log.debug(req.body);
		var body = req.body;
		if (body && body.name) {
			client.hmset(body.name, body, function(err) {
				if (err) {
					sails.log.error(err);
					return res.serverError(err);
				} else {
					client.sadd("names", body.name, function(err) {
						if (err) {
							sails.log.error(err);
						}

						sails.log.debug('Create OK');
						return res.ok();
					});
				}
			});
		} else {
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
					return res.serverError(err);
				} else {
					client.srem("names", name, function(err) {
						if (err) {
							sails.log.error(err);
							return res.serverError(err);
						}

						sails.log.debug('Del OK');
						return res.ok();
					});
				}
			});
		}
		else {
			return res.badrequest('no name specified');
		}
	},
	take: function (req, res) {
		sails.log.debug('take');
		sails.log.debug(req.body);
		var name = req.param('name');
		var takeValue = req.param('take');
		if (!name) {
			return res.badRequest('name not set');
		} else {
			client.sismember('names', 'name', function(err, exist) {
				if (err) {
					sails.log.error(err);
					return res.serverError(err);
				}

				if (!exist) {
					return res.badRequest('name does not exist');
				}

				client.hset(name, 'taken', takeValue, function(err) {
					if (err) {
						sails.log.error(err);
						return res.serverError(err);
					}

					sails.log.debug(name + ' set taken to ' + takeValue);
					return res.ok();
				});
			});
		}
	}
};
