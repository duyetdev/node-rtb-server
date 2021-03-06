'use stricts';

// exports.mongo = require('./mongodb.js');
exports.global = require('./global.js');

var config = {
    host     : 'sv5.lvduit.com',
    user     : 'root',
    password : '',
    database : 'bgate_demo',
    charset  : 'utf8'
};

module.exports = {
	domain: 'http://ptnhttt.uit.edu.vn',	
	port: process.env.PORT || 8899,

	db: config,
	
	debug: true,

	sessionSecret: 'LvDuit',
	sessionCollection: 'sessions',
	tmpDir: '/tmp',
	logDir: '/logs',

	trigger_token: '73a90acaae2b1ccc0e969709665bc62f',
	trigger_key: 'lvduit',
	
	routes : {
		// Manual for API REST
		man: '/man',

		bids: '/bids',
		rubicon_bids: '/rubicon_bids',
		
		imp_tracker: '/imp_tracker',
		click_tracker: '/click_tracker',
		banner_render: '/banner_render',
		banner_preview: '/banner_preview',
		banner_generate_preview_link: '/banner_generate_preview_link',
		ping: '/ping',
		bidrequest: '/bidrequest',
		win: '/win_notice',

		// Manager
		manager_agent: '/manager/agent',
		manager_banner: '/manager/banner',
		manager_publisher: '/manager/publisher',

		// Trigger refresh
		trigger_reset_agent: '/trigger/refresh/agent',
		trigger_reset_publisher: '/trigger/refresh/publisher',
		trigger_reset_all: '/trigger/refresh/all',

		// Sync
		sync_counter: '/sync/counter',
		sync_dailytracker: '/sync/dailytracker',
		sync_internaltransaction: '/sync/internaltransaction'
	}, 

	bgate_ad_icon: '//3.bp.blogspot.com/-7aQF3mBOWPU/VY67czg2QmI/AAAAAAAACkk/FCBfavh1iI0/s1600/adxlogo-2.png',
	bgate_ad_icon_hover: '//3.bp.blogspot.com/-r87fGsSXmWA/VYfab3YV-0I/AAAAAAAACjs/hn-ylyS1Kzk/s1600/adxlogo-2-hover.png',
	bgate_ad_link: 'http://ads.bda.com.vn',

	// Bid type 
	bid_type: {
		CPM: 1,
		CPC: 2
	},

	// CPM to CPC rate 
	cpm_to_cpc_rate: (10 / 1000),

	// Min balance to disable agent
	agentMinBalanceToDisable: 0.01,
}

