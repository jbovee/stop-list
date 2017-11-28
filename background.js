var url = "https://www.youtube.com/watch?v=XznW8Ti6WWk&list=PL_WuwWI7f8eBZ5Cx1szt8Z9bZzJ_u2pDw",
	strippedURL;
console.log(getURLparams(craftURL));

function getURLparams(callback) {
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

function craftURL(paramsJSON) {
	var finalURL = "https://www.youtube.com/watch?v=";
	if (paramsJSON["video_ids"]) {
		finalURL += paramsJSON["video_ids"][paramsJSON["index"]];
	} else if (paramsJSON["list"]) {
		finalURL += paramsJSON["v"];
	}
	return finalURL;
}