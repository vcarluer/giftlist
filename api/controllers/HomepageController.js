/**
 * HomepageController
 *
 * @description :: Server-side logic for managing homepages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	do: function (req, res) {
  		if (!req.session.authenticated) {
			res.redirect('/login/do');
		} else {
			res.redirect('/list/do');
		}
	},
};

