/**
 * ListController
 *
 * @description :: Server-side logic for managing lists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var redis = require('redis');
var client = redis.createClient({ db: 10 })
var gifts = [];

module.exports = {
	do: function (req, res) {
		client.smembers("names", function(err, names) {
			if (err) {
				handleError(res, err);
			}
			
			if (names) {
				names.forEach(function(name) {
						sails.log.debug('Getting name: ' + name);
						client.hgetall(name, function(err, gift) {
							if (err) {
								return handleError(res, err);
							} else {
								sails.log.debug('Got gift: ' + name);
								gifts.push(gift);
								if (gifts.length == names.length) {
									return res.view({ gifts: gifts });
								}
							}
						});
				});
			} else {
				returnView();
			}
		});
	}
};

function returnView() {
	client.quit();
	res.view();
}

function handleError(res, err) {
	client.quit();
	sails.log.error(err);
	return res.serverError(err);
}
