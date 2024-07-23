(() => {
	function triggerCustomEvent(strData) {
		browser.runtime.sendMessage({
			type: 'customEvent',
			data: {someData: strData}
		});
	}

	(function(history) {
		console.log("[addon simple nostter] Event!!")
		var pushState = history.pushState;
		var replaceState = history.replaceState;

		history.pushState = function(state) {
			var result = pushState.apply(history, arguments);
			triggerCustomEvent("pushState");
			return result;
		};

		history.replaceState = function(state) {
			var result = replaceState.apply(history, arguments);
			triggerCustomEvent("replaceState");
			return result;
		};
	})(window.history);
})();
