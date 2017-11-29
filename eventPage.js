var menuItem = {
	"id": "stop-list",
	"title": "Open without playlist",
	"contexts": ["link"],
	"targetUrlPatterns": ["*://*.youtube.com/*&list=*", "*://*.youtube.com/*&video_ids=*"]
}
chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener(function(clickData) {
	var newUrl = getUrlParams(clickData.linkUrl, craftUrl);
	chrome.tabs.create({"url": newUrl});
});

function getUrlParams(url, callback) {
	var extra = url.split('?')[1],
		args = extra.split('&'),
		argsJSON = {};
	args.forEach(function(arg) {
		var key = arg.split('=')[0],
			value = (key == "video_ids") ? arg.split('=')[1].split('%2C') : arg.split('=')[1];
		argsJSON[key] = value;
	});
	return callback(argsJSON);
}

function craftUrl(paramsJson) {
	var finalURL = "https://www.youtube.com/watch?v=";
	if (paramsJson["video_ids"]) {
		var index = (paramsJson["index"]) ? paramsJson["index"] : 0;
		finalURL += paramsJson["video_ids"][index];
	} else if (paramsJson["list"]) {
		finalURL += paramsJson["v"];
	}
	return finalURL;
}