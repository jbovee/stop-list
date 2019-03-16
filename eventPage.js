chrome.runtime.onInstalled.addListener(details => {
	if (details.reason === "install") {
		chrome.storage.local.set({
			startIndex: 0,
			tabFocus: true,
		});
	}
});

var menuItem = {
	"id": "stop-list",
	"title": "Open without playlist",
	"contexts": ["link"],
	"targetUrlPatterns": ["*://*.youtube.com/*list=*", "*://*.youtube.com/watch_videos*video_ids=*"]
}
chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener(function(clickData) {
	chrome.storage.local.get(['startIndex','tabFocus'], function(result) {
		var newUrl = getUrlParams(clickData.linkUrl, result.startIndex, craftUrl)
		chrome.tabs.create({"url": newUrl, "active": result.tabFocus});
	});
});

function getUrlParams(url, sIndex, callback) {
	var extra = url.split('?')[1],
		args = extra.split('&'),
		argsJSON = {};
	args.forEach(function(arg) {
		var key = arg.split('=')[0],
			value = (key == "video_ids") ? arg.split('=')[1].split('%2C') : arg.split('=')[1];
		argsJSON[key] = value;
	});
	return callback(argsJSON, sIndex);
}

function craftUrl(paramsJson, sIndex) {
	var finalURL = "https://www.youtube.com/watch?v=";
	if (paramsJson["video_ids"]) {
		var index = (paramsJson["index"]) ? paramsJson["index"] - sIndex : 0;
		finalURL += paramsJson["video_ids"][index];
	} else if (paramsJson["list"]) {
		finalURL += paramsJson["v"];
	}
	return finalURL;
}