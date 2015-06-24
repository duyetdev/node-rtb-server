'use strict';

var Model = require('../config/db').Model;
var tracker = require('pixel-tracker');
var ImpLog = require('../config/mongodb').ImpLog;
var BGateAgent = require('../helper/BgateAgent');

// ==================================
// DATABASE CONSTRUCT
// ==================================

var lastImp = {
	impId: '',
	PublisherAdZoneID: 0,
	AdCampaignBannerID: 0, 
	UserIP: '',
	Country: '',
};

// TODO: Fix duplicate impTracker
exports.tracker = function(req, res) {
	tracker.use(function (error, result) {
	    // console.log(JSON.stringify(result, null, 2));

	    var data = {
	    	impId: result.impId || '',
	    	PublisherAdZoneID : result.PublisherAdZoneID || 0,
	    	AdCampaignBannerID : result.AdCampaignBannerID || 0,
	    	UserIP : result.geo.ip || '',
	    	Country : JSON.stringify(result.language) || '',
	    	Price : result.Price || 0.0,
	    	created: new Date()
	    };

		if (lastImp) {
			if (
				lastImp.impId == data.impId 
				&& lastImp.PublisherAdZoneID == data.PublisherAdZoneID 
				&& lastImp.AdCampaignBannerID == data.AdCampaignBannerID 
				&& lastImp.UserIP == data.UserIP 
				&& lastImp.Country == data.Country
			)
				return false;
		}

		lastImp = data;

		// Update counter in Bgate Agent 
		updateBannerImpCounterInAgent(data.PublisherAdZoneID);

		// Update counter in DB
	    if (!data.PublisherAdZoneID || !data.AdCampaignBannerID) {
	    	console.error("ERROR: ImpTracker missing AdCampaignBannerID OR PublisherAdZoneID");
	    } else {
	    	new ImpLog(data).save(function(err, model) {
	    		if (err) console.error(err);
	    		else console.log('[' + new Date() + "] Saved ImpLog id " + model.id + ' {'+ data.PublisherAdZoneID +', '+ ', ' + data.AdCampaignBannerID + ', ' + data.UserIP +'}');
	    	})
	    }

	    // Finish
	});

	res.header('Content-Type', 'image/gif');
	return tracker.middleware(req, res);
};

var updateBannerImpCounterInAgent = function(bannerId) {
	if (!BGateAgent && !BGateAgent.agents) return false;

	BGateAgent.agents.forEach(function(agent) {
		if (!agent.banner) return false;
		for (var i = 0; i < agent.banner.length; i++) {
			if (agent.banner[i].AdCampaignBannerPreviewID == bannerId) {
				agent.banner[i].ImpressionsCounter++;
				return true;
			}
		}
	});

	return true;
}