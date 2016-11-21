/**
 * LoginController
 *
 * @description :: Server-side logic for managing logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	do: function (req, res) {
		var loginpass = req.param('loginpass');
		if (loginpass && loginpass == 'neige') {
			req.session.authenticated = true;
			res.redirect('/list/do');
		} else {
			res.view();
		}
	},
	out: function (req, res) {
		req.session.authenticated = false;
		res.redirect('/');
	}
};

