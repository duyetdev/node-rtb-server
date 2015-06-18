module.exports = function(app) {
	var bids = require('../system/bidsController.js');
	var bidrequest = require('../system/bidrequestController.js');

	app.route('/').get(function(req, res) { res.send("Hi, bye!"); });
	
	app.route('/bids')
		.get(bids.bids)
		.post(bids.bids);

	app.route('/bidrequest')
		.get(bidrequest.generate);
};