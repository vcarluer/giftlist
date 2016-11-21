/**
 * LoginController
 *
 * @description :: Server-side logic for managing logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	do: function (req, res) {
		var loginpass = req.param('loginpass');
		if (loginpass && (loginpass == 'neige' || loginpass == 'flocon')) {
			req.session.authenticated = true;
			if (loginpass == 'neige') {
				res.redirect('/list/do');
			} else {
				req.session.admin = true;
				res.redirect('/gift/show');
			}
		} else {
			res.view();
		}
	},
	out: function (req, res) {
		req.session.authenticated = false;
		req.session.admin = false;
		res.redirect('/');
	}
};

