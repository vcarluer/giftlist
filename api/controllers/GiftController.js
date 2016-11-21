/**
 * GiftController
 *
 * @description :: Server-side logic for managing gifts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	show: function (req, res) {
		res.view();
	},
	create: function (req, res) {
		sails.log.debug(req.body);
	}
};

